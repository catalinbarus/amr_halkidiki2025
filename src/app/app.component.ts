import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'amr_halkidiki2025';

  countdown: { days: number; hours: number; minutes: number; seconds: number } = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  private intervalId: any;

  ngOnInit(): void {
    this.startCountdown();
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId); // Clear interval when component is destroyed
  }

  startCountdown() {
    const calculateTime = () => {
      const currentDate = new Date();
      const romaniaTime = new Date(currentDate.toLocaleString("en-US", { timeZone: "Europe/Bucharest" }));
      const targetDate = new Date(romaniaTime.getFullYear(), 6, 10); // July 10 of the current year in Romania's local time

      if (romaniaTime > targetDate) {
        targetDate.setFullYear(targetDate.getFullYear() + 1); // Adjust to next year if the date has passed
      }

      const timeDifference = targetDate.getTime() - currentDate.getTime();
      const seconds = Math.floor((timeDifference / 1000) % 60);
      const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
      const hours = 1 + Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

      this.countdown = { days, hours, minutes, seconds };
    };

    // Calculate immediately
    calculateTime();

    // Update every second
    this.intervalId = setInterval(calculateTime, 1000);
  }

  calculateDaysToJuly10(): number {
    const today = new Date(); // Current date
    const year = today.getMonth() > 6 || (today.getMonth() === 6 && today.getDate() > 10)
      ? today.getFullYear() + 1 // Next year's July 10 if today is past July 10
      : today.getFullYear();

    const targetDate = new Date(year, 6, 10); // July 10th (Month is 0-based)
    const diffInTime = targetDate.getTime() - today.getTime();
    const diffInDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

    return diffInDays;
  }

}
