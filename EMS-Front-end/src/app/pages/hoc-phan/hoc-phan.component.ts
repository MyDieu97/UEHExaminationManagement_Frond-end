import { Component, OnInit, ViewChild } from '@angular/core';
import { HocPhanInfo, HocPhan, HocPhanService } from 'src/app/services/hoc-phan/hoc-phan.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { ModalDirective } from 'ngx-bootstrap';
import { debounceTime } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { DonVi, DonViService } from 'src/app/services/don-vi/don-vi.service';

@Component({
  selector: 'app-hoc-phan',
  templateUrl: './hoc-phan.component.html',
  styleUrls: ['./hoc-phan.component.css']
})
export class HocPhanComponent implements OnInit {

  donvis: DonVi[] = [];
  hocphans: HocPhanInfo[] = [];
  hocphan: HocPhan = {} as HocPhan;

  private alert = new Subject<string>();
  successMessage: string;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  @ViewChild('modal') modal: ModalDirective;
  @ViewChild('deleteModal') deleteModal: ModalDirective;

  constructor(public hocphanService: HocPhanService, public donviService: DonViService) { }

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
      this.hocphanService.getHocPhan(id).subscribe(result => {
        this.hocphan = result.data;        
        this.modal.show();
      });
    } else {
      this.hocphan = {} as HocPhan;
      this.modal.show();
    }
  }

  showDeleteModal(event, id) {
    this.hocphan.id = id;
    event.preventDefault();
    this.deleteModal.show();
  }

  loadData() {
    this.hocphanService.getHocPhans().subscribe(result => {
      this.hocphans = result.data;
      console.log(this.hocphans);
      this.rerender();
    });
  }

  save() {
    if (this.hocphan.id === undefined || this.hocphan.id === 0) {
      this.hocphanService.addHocPhan(this.hocphan).subscribe(aresult => {
        this.modal.hide();
        this.loadData();
        this.alertMessage(aresult.message);
      });
    } else {
      this.hocphanService.updateHocPhan(this.hocphan).subscribe(aresult => {
        this.modal.hide();
        this.loadData();
        this.alertMessage(aresult.message);
      });
    }
  }

  delete() {
    this.hocphanService.deleteHocPhan(this.hocphan.id).subscribe(result => {
      if (result.errorCode === 0) {
        const deleteHocPhan = this.hocphans.find( x => x.id === this.hocphan.id);
        if (deleteHocPhan) {
          const index = this.hocphans.indexOf(deleteHocPhan);
          this.hocphans.splice(index, 1);
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
