import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../api.service';

export interface LichThiInfoResponse {
  errorCode: number;
  data: LichThiInfo[];
  message: string;
}

export interface LichThisResponse {
  errorCode: number;
  data: LichThi[];
  message: string;
}
export interface LichThiResponse {
  errorCode: number;
  data: LichThi;
  message: string;
}

export interface LichThiInfo {
  id: number;
  phongThi: string;
  soSV: number;
  maLopHP: string;
  thoiKB: string;
  ngaygioBDThi: Date;
  thu: string;
  csThi: string;
  maHP: string;
  tenHP: string;
  soTinChi: number;
  bacDaoTao: number;
  heDaoTao: string;
  maLopSV: string;
  nganhHoc: string;
  khoa: string;
}

export interface LichThi {
  id: number;
  phongThi: string;
  soSV: number;
  lopHPId: number;
}

@Injectable({
  providedIn: 'root'
})
export class LichThiService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    }),
  };

  constructor(private http: HttpClient, private apiService: ApiService) { }

  getLichThis(): Observable<LichThiInfoResponse> {
    return this.http.get<LichThiInfoResponse>(this.apiService.apiUrl.lichthi);
  }

  getLichThi(id): Observable<LichThiResponse> {
    const url = `${this.apiService.apiUrl.lichthi}/${id}`;
    return this.http.get<LichThiResponse>(url);
  }

  addLichThi(file): Observable<LichThiResponse> {
    return this.http.post<LichThiResponse>(this.apiService.apiUrl.lichthi + '/ImportFile', file);
  }

  updateLichThi(lichthi: LichThi): Observable<LichThiResponse> {
    const url = `${this.apiService.apiUrl.lichthi}/${lichthi.id}`;
    return this.http.put<LichThiResponse>(url, lichthi);
  }

  deleteLichThi(id): Observable<LichThiResponse> {
    const url = `${this.apiService.apiUrl.lichthi}/${id}`;
    return this.http.delete<LichThiResponse>(url);
  }

}
