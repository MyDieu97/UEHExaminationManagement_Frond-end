import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatetimeService {

  weekday: String[] = [];
  constructor() {    
  this.weekday[0] =  "Chủ nhật";
  this.weekday[1] = "Thứ hai";
  this.weekday[2] = "Thứ ba";
  this.weekday[3] = "Thứ tư";
  this.weekday[4] = "Thứ năm";
  this.weekday[5] = "Thứ sáu";
  this.weekday[6] = "Thứ bảy";

   }

  FormatDateString(dateString): any {
    const array = dateString.substring(0, 10).split('-');
    const newFormat = array[0] + '-' + array[1] + '-' + array[2];
    return newFormat;
  }

  FormatTimeString(dateString): any {
    const newFormat = dateString.substring(11);
    return newFormat;
  }

  FormatDatetimeString (dateValue: Date, timeValue: Date): any {
    const datetime = this.FormatDateString(dateValue) + 'T' + timeValue;
    return datetime;
  }

  getDayofWeek(date: Date): any {
    return this.weekday[date.getDay()];
  }
}
