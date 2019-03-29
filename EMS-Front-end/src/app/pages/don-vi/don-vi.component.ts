import { Component, OnInit, ViewChild } from '@angular/core';
import { DonVi, DonViService } from 'src/app/services/don-vi/don-vi.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { ModalDirective } from 'ngx-bootstrap';
import { debounceTime } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-don-vi',
  templateUrl: './don-vi.component.html',
  styleUrls: ['./don-vi.component.css']
})
export class DonViComponent implements OnInit {
  
  donvis: DonVi[] = [];
  donvi: DonVi = {} as DonVi;

  private alert = new Subject<string>();
  successMessage: string;

  public loading = false;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  @ViewChild('modal') modal: ModalDirective;
  @ViewChild('deleteModal') deleteModal: ModalDirective;

  constructor(public donviService: DonViService) { }

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
      this.donviService.getDonVi(id).subscribe(result => {
        this.donvi = result.data;        
        this.modal.show();
        this.loading = false;
      });
    } else {
      this.donvi = {} as DonVi;
      this.modal.show();
      this.loading = false;
    }
  }

  showDeleteModal(event, id) {
    this.loading = true;
    this.donvi.id = id;
    event.preventDefault();
    this.deleteModal.show();
    this.loading = false;
  }

  loadData() {
    this.loading = true;
    this.donviService.getDonVis().subscribe(result => {
      this.donvis = result.data;
      this.rerender();
      this.loading = false;
    });
  }

  save() {
    this.loading = true;
    if (this.donvi.id === undefined || this.donvi.id === 0) {
      this.donviService.addDonVi(this.donvi).subscribe(aresult => {
        this.modal.hide();
        this.loading = false;
        this.loadData();
        this.alertMessage(aresult.message);
      });
    } else {
      this.donviService.updateDonVi(this.donvi).subscribe(aresult => {
        this.modal.hide();
        this.loading = false;
        this.loadData();
        this.alertMessage(aresult.message);
      });
    }
  }

  delete() {
    this.loading = true;
    this.donviService.deleteDonVi(this.donvi.id).subscribe(result => {
      if (result.errorCode === 0) {
        const deleteDonVi = this.donvis.find( x => x.id === this.donvi.id);
        if (deleteDonVi) {
          const index = this.donvis.indexOf(deleteDonVi);
          this.donvis.splice(index, 1);
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
