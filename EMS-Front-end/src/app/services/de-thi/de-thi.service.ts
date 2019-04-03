import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { LichThiInfoResponse } from '../lich-thi/lich-thi.service';

export interface DeThiInfosResponse {
  errorCode: number;
  data: DeThiInfo[];
  message: string;
}

export interface DeThiInfo {
  id: number;
  maLopHP: string;
  tenHocPhan: string;
  ngayGioThi: Date;
  donVi: string;
}

export interface DeThisRequest {
  ngayBatDau: Date;
  ngayKetThuc: Date;
  DonViId: number;
}

@Injectable({
  providedIn: 'root'
})
export class DeThiService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    }),
  };

  constructor(private http: HttpClient, private apiService: ApiService) { }

  getDeThisbyDonVi(request: DeThisRequest): Observable<DeThiInfosResponse> {
    return this.http.post<DeThiInfosResponse>(this.apiService.apiUrl.dethi + "/getdethisbydonvi", request);
  }

  getDeThis(request: DeThisRequest): Observable<LichThiInfoResponse> {
    return this.http.post<LichThiInfoResponse>(this.apiService.apiUrl.dethi + "/getdethis", request);
  }

  sendMail(request, giangvienId): Observable<DeThiInfosResponse> {
    return this.http.post<DeThiInfosResponse>(this.apiService.apiUrl.dethi + '/sendemail/' + giangvienId, request);
  }

  getFile(request): Observable<Blob> {
    return this.http.post(this.apiService.apiUrl.dethi + '/downloadfile', request, { responseType: 'blob' });
  }
}
