import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

export interface LopSinhViensResponse {
  errorCode: number;
  data: LopSinhVien[];
  message: string;
}
export interface LopSinhVienResponse {
  errorCode: number;
  data: LopSinhVien;
  message: string;
}

export interface LopSinhVien {
  id: number;  
  lopSV: string;
  nganhHoc: string;
  khoa: string;
}

@Injectable({
  providedIn: 'root'
})
export class LopSinhVienService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    }),
  };

  constructor(private http: HttpClient, private apiService: ApiService) { }

  getLopSinhViens(): Observable<LopSinhVienResponse> {
    return this.http.get<LopSinhVienResponse>(this.apiService.apiUrl.lopsinhvien);
  }

  getLopSinhVien(id): Observable<LopSinhVienResponse> {
    const url = `${this.apiService.apiUrl.lopsinhvien}/${id}`;
    return this.http.get<LopSinhVienResponse>(url);
  }

  addLopSinhVien(hocPhan: LopSinhVien): Observable<LopSinhVienResponse> {
    return this.http.post<LopSinhVienResponse>(this.apiService.apiUrl.lopsinhvien, hocPhan);
  }

  updateLopSinhVien(lopsinhvien: LopSinhVien): Observable<LopSinhVienResponse> {
    const url = `${this.apiService.apiUrl.lopsinhvien}/${lopsinhvien.id}`;
    return this.http.put<LopSinhVienResponse>(url, lopsinhvien);
  }

  deleteLopSinhVien(id): Observable<LopSinhVienResponse> {
    const url = `${this.apiService.apiUrl.lopsinhvien}/${id}`;
    return this.http.delete<LopSinhVienResponse>(url);
  }
}
