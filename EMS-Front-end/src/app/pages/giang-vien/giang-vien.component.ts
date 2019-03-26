import { Component, OnInit, ViewChild } from '@angular/core';
import { GiangVienService, GiangVienInfo, GiangVien } from 'src/app/services/giang-vien/giang-vien.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { ModalDirective } from 'ngx-bootstrap';
import { DatetimeService } from 'src/app/services/datetime.service';
import { DonViService, DonVi } from 'src/app/services/don-vi/don-vi.service';
import { NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-giang-vien',
  templateUrl: './giang-vien.component.html',
  styleUrls: ['./giang-vien.component.css']
})
export class GiangVienComponent implements OnInit {
  
  donvis: DonVi[] = [];
  giangviens: GiangVienInfo[] = [];
  giangvien: GiangVien = {} as GiangVien;

  private alert = new Subject<string>();
  successMessage: string;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  @ViewChild('modal') modal: ModalDirective;
  @ViewChild('deleteModal') deleteModal: ModalDirective;


  constructor(public datetimeService: DatetimeService, public giangvienService: GiangVienService, public donviService: DonViService) { }

  ngOnInit() {

    this.alert.subscribe((message) => this.successMessage = message);
    this.alert.pipe(
      debounceTime(3000)
    ).subscribe(() => this.successMessage = null);

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
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
      this.giangvienService.getGiangVien(id).subscribe(result => {
        this.giangvien = result.data;
        this.giangvien.ngaySinh = this.datetimeService.FormatDateString(this.giangvien.ngaySinh);
        this.modal.show();
      });
    } else {
      this.giangvien = {} as GiangVien;
      this.modal.show();
    }
  }

  showDeleteModal(event, id) {
    this.giangvien.id = id;
    event.preventDefault();
    this.deleteModal.show();
  }

  loadData() {
    this.giangvienService.getGiangViens().subscribe(result => {
      this.giangviens = result.data;
      console.log(this.giangviens);
      this.rerender();
    });
  }

  save() {
    if (this.giangvien.id === undefined || this.giangvien.id === 0) {
      this.giangvienService.addGiangVien(this.giangvien).subscribe(aresult => {
        this.modal.hide();
        this.loadData();
        this.alertMessage(aresult.message);
      });
    } else {
      this.giangvienService.updateGiangVien(this.giangvien).subscribe(aresult => {
        this.modal.hide();
        this.loadData();
        this.alertMessage(aresult.message);
      });
    }
  }

  delete() {
    this.giangvienService.deleteGiangVien(this.giangvien.id).subscribe(result => {
      if (result.errorCode === 0) {
        const deleteGiangVien = this.giangviens.find( x => x.id === this.giangvien.id);
        if (deleteGiangVien) {
          const index = this.giangviens.indexOf(deleteGiangVien);
          this.giangviens.splice(index, 1);
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
