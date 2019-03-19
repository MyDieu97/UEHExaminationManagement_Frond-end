import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

export interface DonVisResponse {
  errorCode: number;
  data: DonVi[];
  message: string;
}
export interface DonViResponse {
  errorCode: number;
  data: DonVi;
  message: string;
}

export interface DonVi {
  id: number;
  maDonVi: string;
  tenDonVi: string;
  soDT: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class DonViService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    }),
  };
  
  constructor(private http: HttpClient, private apiService: ApiService) { }

  getDonVis(): Observable<DonVisResponse> {
    return this.http.get<DonVisResponse>(this.apiService.apiUrl.donvi);
  }

  getDonVi(id): Observable<DonViResponse> {
    const url = `${this.apiService.apiUrl.donvi}/${id}`;
    return this.http.get<DonViResponse>(url);
  }

  addDonVi(donvi: DonVi): Observable<DonViResponse> {
    console.log(donvi);
    return this.http.post<DonViResponse>(this.apiService.apiUrl.donvi, donvi);
  }

  updateDonVi(donvi: DonVi): Observable<DonViResponse> {
    const url = `${this.apiService.apiUrl.donvi}/${donvi.id}`;
    return this.http.put<DonViResponse>(url, donvi);
  }

  deleteDonVi(id): Observable<DonViResponse> {
    const url = `${this.apiService.apiUrl.donvi}/${id}`;
    return this.http.delete<DonViResponse>(url);
  }
}
