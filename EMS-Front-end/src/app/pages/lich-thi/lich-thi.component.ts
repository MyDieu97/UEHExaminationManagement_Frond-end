import { Component, OnInit, ViewChild } from '@angular/core';
import { LichThiService, LichThiInfo, LichThi } from 'src/app/services/lich-thi/lich-thi.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { DatetimeService } from 'src/app/services/datetime.service';
import { debounceTime } from 'rxjs/operators';
import { ModalDirective } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
import { HocPhan } from 'src/app/services/hoc-phan/hoc-phan.service';

@Component({
  selector: 'app-lich-thi',
  templateUrl: './lich-thi.component.html',
  styleUrls: ['./lich-thi.component.css']
})
export class LichThiComponent implements OnInit {

  lichthis: LichThiInfo[] = [];
  lichthi: LichThi = {} as LichThi;
  hocPhan: HocPhan = {} as HocPhan;  
  
  Data: FormData = {} as FormData;
  file: File = {} as File;

  private alert = new Subject<string>();
  successMessage: string;

  public loading = false;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  @ViewChild('importFileModal') importFileModal: ModalDirective;
  @ViewChild('deleteModal') deleteModal: ModalDirective;

  constructor(public datetimeService: DatetimeService, public lichthiService: LichThiService) { }

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

    this.loadData();
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngAfterViewInit(): void {this.dtTrigger.next(); }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
       dtInstance.destroy();
       this.dtTrigger.next();
   });
  }

  loadData() {
    this.loading = true;
    this.lichthiService.getLichThis().subscribe(result => {
      this.lichthis = result.data;
      console.log(this.lichthis);
      this.rerender();
      this.loading = false;
    });
  }

  showFileModal(form: NgForm) {
    this.loading = true;
    if (event) {
      event.preventDefault();
    }
    form.reset();    
    this.file = {} as File;
    this.importFileModal.show();
    this.loading = false;
  }

  showDeleteModal(event, id) {
    this.loading = true;
    this.lichthi.id = id;
    event.preventDefault();
    this.deleteModal.show();
    this.loading = false;
  }

  alertMessage(message) {
    this.alert.next(message);
  }

  importFile() {
    this.loading = true;
    this.Data = new FormData();
    this.Data.append('File', this.file);
    this.lichthiService.addLichThi(this.Data).subscribe(result => {
      this.importFileModal.hide();
      this.alertMessage(result.message);
      this.loadData();
      this.loading = false;
    });
  }

  handleFileInput(files: FileList) {
    this.file = files.item(0);
  }
}
