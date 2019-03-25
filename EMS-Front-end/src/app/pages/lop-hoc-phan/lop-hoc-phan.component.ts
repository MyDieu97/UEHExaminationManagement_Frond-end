import { Component, OnInit, ViewChild } from '@angular/core';
import { DonVi, DonViService } from 'src/app/services/don-vi/don-vi.service';
import { LopHocPhanInfo, LopHocPhan, LopHocPhanService } from 'src/app/services/lop-hoc-phan/lop-hoc-phan.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { ModalDirective } from 'ngx-bootstrap';
import { DatetimeService } from 'src/app/services/datetime.service';
import { debounceTime } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-lop-hoc-phan',
  templateUrl: './lop-hoc-phan.component.html',
  styleUrls: ['./lop-hoc-phan.component.css']
})
export class LopHocPhanComponent implements OnInit {

  donvis: DonVi[] = [];
  lopsinhviens: LopHocPhanInfo[] = [];
  lopsinhvien: LopHocPhan = {} as LopHocPhan;

  private alert = new Subject<string>();
  successMessage: string;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  @ViewChild('modal') modal: ModalDirective;
  @ViewChild('deleteModal') deleteModal: ModalDirective;


  constructor(public datetimeService: DatetimeService, public lopsinhvienService: LopHocPhanService, public donviService: DonViService) { }

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
    
    this.donviService.getDonVis().subscribe(result => {
      this.donvis = result.data;
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
    if (event) {
      event.preventDefault();
    }
    form.reset();

    if (id > 0) {
      this.lopsinhvienService.getLopHocPhan(id).subscribe(result => {
        this.lopsinhvien = result.data;
        this.lopsinhvien.ngaygioBDThi = this.datetimeService.formatDatetimeData(this.lopsinhvien.ngaygioBDThi);
        this.modal.show();
      });
    } else {
      this.lopsinhvien = {} as LopHocPhan;
      this.modal.show();
    }
  }

  showDeleteModal(event, id) {
    this.lopsinhvien.id = id;
    event.preventDefault();
    this.deleteModal.show();
  }

  loadData() {
    this.lopsinhvienService.getLopHocPhans().subscribe(result => {
      this.lopsinhviens = result.data;
      console.log(this.lopsinhviens);
      this.rerender();
    });
  }

  save() {
    if (this.lopsinhvien.id === undefined || this.lopsinhvien.id === 0) {
      this.lopsinhvienService.addLopHocPhan(this.lopsinhvien).subscribe(aresult => {
        this.modal.hide();
        this.loadData();
        this.alertMessage(aresult.message);
      });
    } else {
      this.lopsinhvienService.updateLopHocPhan(this.lopsinhvien).subscribe(aresult => {
        this.modal.hide();
        this.loadData();
        this.alertMessage(aresult.message);
      });
    }
  }

  delete() {
    this.lopsinhvienService.deleteLopHocPhan(this.lopsinhvien.id).subscribe(result => {
      if (result.errorCode === 0) {
        const deleteLopHocPhan = this.lopsinhviens.find( x => x.id === this.lopsinhvien.id);
        if (deleteLopHocPhan) {
          const index = this.lopsinhviens.indexOf(deleteLopHocPhan);
          this.lopsinhviens.splice(index, 1);
        }
        this.deleteModal.hide();
        this.alertMessage(result.message);
      }
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
