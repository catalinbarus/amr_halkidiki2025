import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'amr_halkidiki2025';

  currentDate = Date.now();

  calculateDaysToJuly10(): number {
    const today = new Date(); // Current date
    const year = today.getMonth() > 6 || (today.getMonth() === 6 && today.getDate() > 10)
      ? today.getFullYear() + 1 // Next year's July 10 if today is past July 10
      : today.getFullYear();

    const targetDate = new Date(year, 6, 9); // July 9th (Month is 0-based)
    const diffInTime = targetDate.getTime() - today.getTime();
    const diffInDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

    return diffInDays;
  }

}
