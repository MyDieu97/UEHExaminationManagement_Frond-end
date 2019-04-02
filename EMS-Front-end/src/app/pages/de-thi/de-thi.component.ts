import { Component, OnInit, ViewChild } from '@angular/core';
import { DeThiService, DeThiInfo, DeThisRequest } from 'src/app/services/de-thi/de-thi.service';
import { DonVi, DonViService } from 'src/app/services/don-vi/don-vi.service';
import { GiangVienInfo, GiangVienService } from 'src/app/services/giang-vien/giang-vien.service';
import { DatetimeService } from 'src/app/services/datetime.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { ModalDirective } from 'ngx-bootstrap';
import { debounceTime } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-de-thi',
  templateUrl: './de-thi.component.html',
  styleUrls: ['./de-thi.component.css']
})
export class DeThiComponent implements OnInit {

  donvis: DonVi[] = [];
  giangviens: GiangVienInfo[] = [];
  dethis: DeThiInfo[] = [];
  giangvienId: number = 0;
  request: DeThisRequest = {} as DeThisRequest;

  private alert = new Subject<string>();
  successMessage: string;

  public loading = false;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  @ViewChild('modal') modal: ModalDirective;

  constructor(public datetimeService: DatetimeService, public giangvienService: GiangVienService, public donviService: DonViService, private dethiService: DeThiService) { }

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

    this.giangvienService.getGiangViens().subscribe(result => {
      this.giangviens = result.data;
      console.log(result.data);
    });
    
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
      this.giangvienId = 0;
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
  
  sendMail() {
    this.loading = true;
    this.dethiService.sendMail(this.request, this.giangvienId).subscribe(result => {
      this.loading = false;
      this.alertMessage(result.message);
    });
  }

  download() {

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

  downloadExcelFile(data: Blob) { 
    const contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'; 
    const blob = new Blob([data], { type: contentType });  
    const url = window.URL.createObjectURL(blob);
    window.open(url);
    // saveAs(blob, "Data.xlsx");
    // console.log(blob);
  }

  // downloadFile (file_name, content) {
  // var csvData = new Blob([content], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  // if (window.navigator && window.navigator.msSaveOrOpenBlob) { // for IE
  //     window.navigator.msSaveOrOpenBlob(csvData, file_name);
  // } else { // for Non-IE (chrome, firefox etc.)
  //     var a = document.createElement("a");
  //     document.body.appendChild(a);
  //     // a.style = "display: none";
  //     var csvUrl = URL.createObjectURL(csvData);
  //     a.href =  csvUrl;
  //     a.download = file_name;
  //     a.click();
  //     URL.revokeObjectURL(a.href)
  //     a.remove();
  //   }
  // };
}
