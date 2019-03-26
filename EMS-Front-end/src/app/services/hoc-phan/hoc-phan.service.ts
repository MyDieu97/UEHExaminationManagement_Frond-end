import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

export interface HocPhanInfoResponse {
  errorCode: number;
  data: HocPhanInfo[];
  message: string;
}

export interface HocPhansResponse {
  errorCode: number;
  data: HocPhan[];
  message: string;
}
export interface HocPhanResponse {
  errorCode: number;
  data: HocPhan;
  message: string;
}

export interface HocPhanInfo {
  id: number;  
  maHP: string;
  tenHP: string;
  soTinChi: number;
  donViRaDe: string;
  donViQuanLy: string;
}

export interface HocPhan {
  id: number;  
  maHP: string;
  tenHP: string;
  soTinChi: number;
  donViRaDeId: number;
  donViQuanLyId: number;
}

@Injectable({
  providedIn: 'root'
})
export class HocPhanService {
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    }),
  };

  constructor(private http: HttpClient, private apiService: ApiService) { }

  getHocPhans(): Observable<HocPhanInfoResponse> {
    return this.http.get<HocPhanInfoResponse>(this.apiService.apiUrl.hocphan);
  }

  getHocPhan(id): Observable<HocPhanResponse> {
    const url = `${this.apiService.apiUrl.hocphan}/${id}`;
    return this.http.get<HocPhanResponse>(url);
  }

  addHocPhan(hocPhan: HocPhan): Observable<HocPhanResponse> {
    return this.http.post<HocPhanResponse>(this.apiService.apiUrl.hocphan, hocPhan);
  }

  updateHocPhan(hocphan: HocPhan): Observable<HocPhanResponse> {
    const url = `${this.apiService.apiUrl.hocphan}/${hocphan.id}`;
    return this.http.put<HocPhanResponse>(url, hocphan);
  }

  deleteHocPhan(id): Observable<HocPhanResponse> {
    const url = `${this.apiService.apiUrl.hocphan}/${id}`;
    return this.http.delete<HocPhanResponse>(url);
  }
}
