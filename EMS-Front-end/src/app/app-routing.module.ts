import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { GiangVienComponent } from './pages/giang-vien/giang-vien.component';
import { LichThiComponent } from './pages/lich-thi/lich-thi.component';

const routes: Routes = [
  { path: '', component: LayoutComponent, data: {title: 'Home'},
  children: [
    { path: 'giangvien', component: GiangVienComponent },
    { path: 'lichthi', component: LichThiComponent }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
