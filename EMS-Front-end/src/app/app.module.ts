import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxLoadingModule } from 'ngx-loading';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { GiangVienComponent } from './pages/giang-vien/giang-vien.component';
import { LichThiComponent } from './pages/lich-thi/lich-thi.component';
import { HocPhanComponent } from './pages/hoc-phan/hoc-phan.component';
import { LopHocPhanComponent } from './pages/lop-hoc-phan/lop-hoc-phan.component';
import { LopSinhVienComponent } from './pages/lop-sinh-vien/lop-sinh-vien.component';
import { DonViComponent } from './pages/don-vi/don-vi.component';
import { DeThiComponent } from './pages/de-thi/de-thi.component';
import { DuyetDeThiComponent } from './pages/duyet-de-thi/duyet-de-thi.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    GiangVienComponent,
    LichThiComponent,
    HocPhanComponent,
    LopHocPhanComponent,
    LopSinhVienComponent,
    DonViComponent,
    DeThiComponent,
    DuyetDeThiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ModalModule.forRoot(),
    HttpClientModule,
    NgbModule,
    DataTablesModule,
    NgxLoadingModule.forRoot({})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
