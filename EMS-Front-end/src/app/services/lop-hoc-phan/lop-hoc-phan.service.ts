import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

export interface LopHocPhanInfoResponse {
  errorCode: number;
  data: LopHocPhanInfo[];
  message: string;
}

export interface LopHocPhansResponse {
  errorCode: number;
  data: LopHocPhan[];
  message: string;
}
export interface LopHocPhanResponse {
  errorCode: number;
  data: LopHocPhan;
  message: string;
}

export interface LopHocPhanInfo {
  id: number;
  maLopHP: string;
  thoiKB: string;
  ngaygioBDThi: Date;
  thu: string;
  csThi: string;
  hinhThucThi: string;
  bacDaoTao: number;
  heDaoTao: string;  
  maHP: string;
  tenHP: string;
  soTinChi: number;
  lopSV: string;
  nganhHoc: string;
  khoa: string;
}

// export interface LopHocPhanInfo {
//   id: number;
//   maLopHP: string;
//   thoiKB: string;
//   ngaygioBDThi: Date;
//   thu: string;
//   csThi: string;
//   bacDaoTao: number;
//   heDaoTao: string;  
//   maHP: string;
//   tenHP: string;
//   soTinChi: number;
//   donViRaDe: string;
//   donviQuanLy: string;
//   lopSV: string;
//   nganhHoc: string;
//   khoa: string;
// }

export interface LopHocPhan {
  id: number;  
  maLopHP: string;
  thoiKB: string;
  ngaygioBDThi: Date;
  thu: string;
  csThi: string;
  bacDaoTao: number;
  heDaoTao: string;  
  lopSVId: number;
  hocPhanId: number;
  phieuDiemId: number;
  phieuBaiThiId: number;
}

@Injectable({
  providedIn: 'root'
})
export class LopHocPhanService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    }),
  };

  constructor(private http: HttpClient, private apiService: ApiService) { }

  getLopHocPhans(): Observable<LopHocPhanInfoResponse> {
    return this.http.get<LopHocPhanInfoResponse>(this.apiService.apiUrl.lophocphan);
  }

  getLopHocPhan(id): Observable<LopHocPhanResponse> {
    const url = `${this.apiService.apiUrl.lophocphan}/${id}`;
    return this.http.get<LopHocPhanResponse>(url);
  }

  addLopHocPhan(lopHocPhan: LopHocPhan): Observable<LopHocPhanResponse> {
    return this.http.post<LopHocPhanResponse>(this.apiService.apiUrl.lophocphan, lopHocPhan);
  }

  updateLopHocPhan(lopHocPhan: LopHocPhan): Observable<LopHocPhanResponse> {
    const url = `${this.apiService.apiUrl.lophocphan}/${lopHocPhan.id}`;
    return this.http.put<LopHocPhanResponse>(url, lopHocPhan);
  }

  deleteLopHocPhan(id): Observable<LopHocPhanResponse> {
    const url = `${this.apiService.apiUrl.lophocphan}/${id}`;
    return this.http.delete<LopHocPhanResponse>(url);
  }
}
