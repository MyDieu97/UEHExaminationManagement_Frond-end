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
    companies: this.baseUrl + 'companies',
    degree: this.baseUrl + 'degrees',
    examinationsubject: this.baseUrl + 'examinationsubjects',
    entrancetest: this.baseUrl + 'entrancetests',
    classroom: this.baseUrl + 'classroom',
    course: this.baseUrl + 'courses',
    learnresult: this.baseUrl + 'LearnResult'
  }
}
