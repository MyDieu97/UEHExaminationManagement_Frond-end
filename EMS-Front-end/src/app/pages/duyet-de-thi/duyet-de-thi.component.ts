import { Component, OnInit, ViewChild } from '@angular/core';
import { DatetimeService } from 'src/app/services/datetime.service';
import { DonVi, DonViService } from 'src/app/services/don-vi/don-vi.service';
import { GiangVienInfo, GiangVienService } from 'src/app/services/giang-vien/giang-vien.service';
import { DeThiInfo, DeThisRequest, DeThiService } from 'src/app/services/de-thi/de-thi.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { ModalDirective } from 'ngx-bootstrap';
import { debounceTime } from 'rxjs/operators';
import { NgForm } from '@angular/forms';import { saveAs } from 'file-saver';
import { LichThiInfo } from 'src/app/services/lich-thi/lich-thi.service';

@Component({
  selector: 'app-duyet-de-thi',
  templateUrl: './duyet-de-thi.component.html',
  styleUrls: ['./duyet-de-thi.component.css']
})
export class DuyetDeThiComponent implements OnInit {

  donvis: DonVi[] = [];
  dethis: LichThiInfo[] = [];
  request: DeThisRequest = {} as DeThisRequest;

  private alert = new Subject<string>();
  successMessage: string;

  public loading = false;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  @ViewChild('modal') modal: ModalDirective;

  constructor(public giangvienService: GiangVienService, public donviService: DonViService, private dethiService: DeThiService, public datetimeService: DatetimeService) { }

  ngOnInit() {
    this.alert.subscribe((message) => this.successMessage = message);
    this.alert.pipe(
      debounceTime(3000)
    ).subscribe(() => this.successMessage = null);

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };
    
    this.donviService.getDonVis().subscribe(result => {
      this.donvis = result.data;
      console.log(result.data);
    });

    // this.getDeThis();

    this.rerender();
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngAfterViewInit(): void {this.dtTrigger.next(); }

  showModal(form: NgForm, event = null, id: number = 0) {
    this.loading = true;
    if (event) {
      event.preventDefault();
    }
    form.reset();
      this.request = {} as DeThisRequest;
      this.modal.show();
      this.loading = false;
  }

  getDeThis() {
    this.loading = true;
    this.dethiService.getDeThis(this.request).subscribe(result => {
      this.modal.hide();
      this.dethis = result.data;
      this.rerender();
      this.loading = false;
      this.alertMessage(result.message);
    });
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
       dtInstance.destroy();
       this.dtTrigger.next();
   });
  }

  alertMessage(message) {
    this.alert.next(message);
  }

  downloadFile() {
    this.loading = true;
    this.dethiService.getFile(this.request).subscribe(result => {
      this.downloadExcelFile(result);
      this.loading = false;
    });
  }

  downloadExcelFile(data: Blob) { 
    const contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'; 
    const fileName = "BienBanDuyetDeThi" + this.datetimeService.FormatDateString(this.request.ngayBatDau) + "_" + this.datetimeService.FormatDateString(this.request.ngayKetThuc);
    saveAs(data, fileName, { type: contentType });
  }
}
