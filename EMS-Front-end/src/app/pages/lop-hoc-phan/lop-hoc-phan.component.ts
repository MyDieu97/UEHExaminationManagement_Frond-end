import { Component, OnInit, ViewChild } from '@angular/core';
import { HocPhanService, HocPhanInfo } from 'src/app/services/hoc-phan/hoc-phan.service';
import { LopHocPhanInfo, LopHocPhan, LopHocPhanService } from 'src/app/services/lop-hoc-phan/lop-hoc-phan.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { ModalDirective } from 'ngx-bootstrap';
import { DatetimeService } from 'src/app/services/datetime.service';
import { debounceTime } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { LopSinhVienService, LopSinhVien } from 'src/app/services/lop-sinh-vien/lop-sinh-vien.service';

@Component({
  selector: 'app-lop-hoc-phan',
  templateUrl: './lop-hoc-phan.component.html',
  styleUrls: ['./lop-hoc-phan.component.css']
})
export class LopHocPhanComponent implements OnInit {

  date: Date = {} as Date;
  time: Date = {} as Date;
  hocphans: HocPhanInfo[] = [];
  lopsinhviens: LopSinhVien[] = [];
  lophocphans: LopHocPhanInfo[] = [];
  lophocphan: LopHocPhan = {} as LopHocPhan;

  private alert = new Subject<string>();
  successMessage: string;

  public loading = false;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  @ViewChild('modal') modal: ModalDirective;
  @ViewChild('deleteModal') deleteModal: ModalDirective;


  constructor(public datetimeService: DatetimeService, public lophocphanService: LopHocPhanService, public hocphanService: HocPhanService, public lopsinhvienService: LopSinhVienService) { }

  ngOnInit() {

    this.alert.subscribe((message) => this.successMessage = message);
    this.alert.pipe(
      debounceTime(3000)
    ).subscribe(() => this.successMessage = null);

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      scrollX: true,
      autoWidth: true
    };

    this.lopsinhvienService.getLopSinhViens().subscribe(result => {
      this.lopsinhviens = result.data;
      console.log(result.data);
    });
    
    this.hocphanService.getHocPhans().subscribe(result => {
      this.hocphans = result.data;
      console.log(result.data);
    });
    
    this.loadData();
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  showModal(form: NgForm, event = null, id: number = 0) {
    this.loading = true;
    if (event) {
      event.preventDefault();
    }
    form.reset();

    if (id > 0) {
      this.lophocphanService.getLopHocPhan(id).subscribe(result => {
        this.lophocphan = result.data;
        console.log(this.lophocphan);
        this.date = this.datetimeService.FormatDateString(this.lophocphan.ngayGioBDThi);
        this.time = this.datetimeService.FormatTimeString(this.lophocphan.ngayGioBDThi);
        this.modal.show();
        this.loading = false;
      });
    } else {
      this.lophocphan = {} as LopHocPhan;
      this.modal.show();
      this.loading = false;
    }
  }

  showDeleteModal(event, id) {
    this.loading = true;
    this.lophocphan.id = id;
    event.preventDefault();
    this.deleteModal.show();
    this.loading = false;
  }

  loadData() {
    this.loading = true;
    this.lophocphanService.getLopHocPhans().subscribe(result => {
      this.lophocphans = result.data;
      console.log(this.lophocphans);
      this.rerender();
      this.loading = false;
    });
  }

  save() {
    this.loading = true;
    this.lophocphan.ngayGioBDThi = this.datetimeService.FormatDatetimeString(this.date, this.time);
    this.lophocphan.thu = this.datetimeService.getDayofWeek(this.date);
    if (this.lophocphan.id === undefined || this.lophocphan.id === 0) {
      this.lophocphanService.addLopHocPhan(this.lophocphan).subscribe(aresult => {
        this.modal.hide();
        this.loadData();
        this.loading = false;
        this.alertMessage(aresult.message);
      });
    } else {
      this.lophocphanService.updateLopHocPhan(this.lophocphan).subscribe(aresult => {
        this.modal.hide();
        this.loadData();
        this.loading = false;
        this.alertMessage(aresult.message);
      });
    }
  }

  delete() {
    this.loading = true;
    this.lophocphanService.deleteLopHocPhan(this.lophocphan.id).subscribe(result => {
      if (result.errorCode === 0) {
        const deleteLopHocPhan = this.lophocphans.find( x => x.id === this.lophocphan.id);
        if (deleteLopHocPhan) {
          const index = this.lophocphans.indexOf(deleteLopHocPhan);
          this.lophocphans.splice(index, 1);
        }
        this.deleteModal.hide();
        this.loading = false;
        this.alertMessage(result.message);
      }
      this.loading = false;
      this.alertMessage(result.message);
    });
  }

// tslint:disable-next-line: use-life-cycle-interface
  ngAfterViewInit(): void {this.dtTrigger.next(); }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
       dtInstance.destroy();
       this.dtTrigger.next();
   });
  }

  alertMessage(message) {
    this.alert.next(message);
  }
}
