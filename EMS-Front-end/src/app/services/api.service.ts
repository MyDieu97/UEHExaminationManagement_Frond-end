import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  baseUrl = 'https://ems-back.azurewebsites.net/api/';
  apiUrl = {
    giangvien: this.baseUrl + 'giangviens',
    donvi: this.baseUrl + 'donvis',
    lichthi: this.baseUrl + 'lichthis',
    hocphan: this.baseUrl + 'hocphans',
    lophocphan: this.baseUrl + 'lophocphans',
    lopsinhvien: this.baseUrl + 'lopsinhviens',
    dethi: this.baseUrl + 'dethis'
  }
}
