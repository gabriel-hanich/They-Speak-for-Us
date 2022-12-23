
import { MatDateFormats, NativeDateAdapter } from "@angular/material/core";

export class AppDateAdapter extends NativeDateAdapter {
  override format(date: Date, displayFormat: Object): string {
    let day: string = date.getDate().toString();
    day = +day < 10 ? "0" + day : day;
    let month: string = (date.getMonth() + 1).toString();
    month = +month < 10 ? "0" + month : month;
    let year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
export const APP_DATE_FORMATS: MatDateFormats = {
    parse: {
      dateInput: 'LL',
    },
    display: {
      dateInput: 'LL',
      monthYearLabel: 'MMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY',
    },
};