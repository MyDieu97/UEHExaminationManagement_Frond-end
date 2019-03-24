import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  baseUrl = 'https://localhost:44336/api/';
  apiUrl = {
    giangvien: this.baseUrl + 'giangviens',
    donvi: this.baseUrl + 'donvis',
    lichthi: this.baseUrl + 'lichthis',
    hocphan: this.baseUrl + 'hocphans',
    lophocphan: this.baseUrl + 'lophocphans',
    lopsinhvien: this.baseUrl + 'lopsinhviens',
    classroom: this.baseUrl + 'classroom',
    course: this.baseUrl + 'courses',
    learnresult: this.baseUrl + 'LearnResult'
  }
}
