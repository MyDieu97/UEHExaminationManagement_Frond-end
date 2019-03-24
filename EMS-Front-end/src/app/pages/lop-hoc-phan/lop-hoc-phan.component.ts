import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lop-hoc-phan',
  templateUrl: './lop-hoc-phan.component.html',
  styleUrls: ['./lop-hoc-phan.component.css']
})
export class LopHocPhanComponent implements OnInit {

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
        this.giangvien.ngaySinh = this.datetimeService.formatDatetimeData(this.giangvien.ngaySinh);
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
