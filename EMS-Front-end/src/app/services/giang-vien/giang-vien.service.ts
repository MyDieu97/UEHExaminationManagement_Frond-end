import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

export interface GiangVienInfoResponse {
  errorCode: number;
  data: GiangVienInfo[];
  message: string;
}

export interface GiangViensResponse {
  errorCode: number;
  data: GiangVien[];
  message: string;
}
export interface GiangVienResponse {
  errorCode: number;
  data: GiangVien;
  message: string;
}

export interface GiangVienInfo {
  id: number;
  maGV: string;
  hoGV: string;
  tenGV: string;
  ngaySinh: Date;
  gioiTinh: boolean;
  soDT: string;
  email: string;
  huuTri: boolean;
  ghiChu: string;
  donViTrucThuoc: object;
}

export interface GiangVien {
  id: number;
  maGV: string;
  hoGV: string;
  tenGV: string;
  ngaySinh: Date;
  gioiTinh: boolean;
  soDT: string;
  email: string;
  huuTri: boolean;
  ghiChu: string;
  donViId: number;
}

@Injectable({
  providedIn: 'root'
})
export class GiangVienService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    }),
  };
  
  constructor(private http: HttpClient, private apiService: ApiService) { }

  getGiangViens(): Observable<GiangVienInfoResponse> {
    return this.http.get<GiangVienInfoResponse>(this.apiService.apiUrl.giangvien);
  }

  getGiangVien(id): Observable<GiangVienResponse> {
    const url = `${this.apiService.apiUrl.giangvien}/${id}`;
    return this.http.get<GiangVienResponse>(url);
  }

  addGiangVien(giangvien: GiangVien): Observable<GiangVienResponse> {
    console.log(giangvien);
    return this.http.post<GiangVienResponse>(this.apiService.apiUrl.giangvien, giangvien);
  }

  updateGiangVien(giangvien: GiangVien): Observable<GiangVienResponse> {
    const url = `${this.apiService.apiUrl.giangvien}/${giangvien.id}`;
    return this.http.put<GiangVienResponse>(url, giangvien);
  }

  deleteGiangVien(id): Observable<GiangVienResponse> {
    const url = `${this.apiService.apiUrl.giangvien}/${id}`;
    return this.http.delete<GiangVienResponse>(url);
  }
}
