import { Component, OnInit, ViewChild } from '@angular/core';
import { LopSinhVien, LopSinhVienService } from 'src/app/services/lop-sinh-vien/lop-sinh-vien.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { ModalDirective } from 'ngx-bootstrap';
import { debounceTime } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-lop-sinh-vien',
  templateUrl: './lop-sinh-vien.component.html',
  styleUrls: ['./lop-sinh-vien.component.css']
})
export class LopSinhVienComponent implements OnInit {

  lopsinhviens: LopSinhVien[] = [];
  lopsinhvien: LopSinhVien = {} as LopSinhVien;

  private alert = new Subject<string>();
  successMessage: string;

  public loading = false;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  @ViewChild('modal') modal: ModalDirective;
  @ViewChild('deleteModal') deleteModal: ModalDirective;

  constructor(public lopsinhvienService: LopSinhVienService) { }

  ngOnInit() {

    this.alert.subscribe((message) => this.successMessage = message);
    this.alert.pipe(
      debounceTime(3000)
    ).subscribe(() => this.successMessage = null);

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    
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
      this.lopsinhvienService.getLopSinhVien(id).subscribe(result => {
        this.lopsinhvien = result.data;        
        this.modal.show();
        this.loading = false;
      });
    } else {
      this.lopsinhvien = {} as LopSinhVien;
      this.modal.show();
      this.loading = false;
    }
  }

  showDeleteModal(event, id) {
    this.loading = true;
    this.lopsinhvien.id = id;
    event.preventDefault();
    this.deleteModal.show();
    this.loading = false;
  }

  loadData() {
    this.loading = true;
    this.lopsinhvienService.getLopSinhViens().subscribe(result => {
      this.lopsinhviens = result.data;
      console.log(this.lopsinhviens);
      this.rerender();
      this.loading = false;
    });
  }

  save() {
    this.loading = true;
    if (this.lopsinhvien.id === undefined || this.lopsinhvien.id === 0) {
      this.lopsinhvienService.addLopSinhVien(this.lopsinhvien).subscribe(aresult => {
        this.modal.hide();
        this.loadData();
        this.loading = false;
        this.alertMessage(aresult.message);
      });
    } else {
      this.lopsinhvienService.updateLopSinhVien(this.lopsinhvien).subscribe(aresult => {
        this.modal.hide();
        this.loadData();
        this.loading = false;
        this.alertMessage(aresult.message);
      });
    }
  }

  delete() {
    this.loading = true;
    this.lopsinhvienService.deleteLopSinhVien(this.lopsinhvien.id).subscribe(result => {
      if (result.errorCode === 0) {
        const deleteLopSinhVien = this.lopsinhviens.find( x => x.id === this.lopsinhvien.id);
        if (deleteLopSinhVien) {
          const index = this.lopsinhviens.indexOf(deleteLopSinhVien);
          this.lopsinhviens.splice(index, 1);
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
