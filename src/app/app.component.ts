import { Component } from '@angular/core';

type AmrPositionPreset = 'top-left' | 'top-center' | 'top-right' | 'middle-left' | 'middle-center' | 'middle-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

interface AmrPosition {
  x: number;
  y: number;
}

const AMR_POSITION_STORAGE_KEY = 'amr-position';
const DEFAULT_AMR_POSITION: AmrPosition = { x: 50, y: 50 };
const POSITION_PRESETS: Record<AmrPositionPreset, AmrPosition> = {
  'top-left': { x: 18, y: 18 },
  'top-center': { x: 50, y: 18 },
  'top-right': { x: 82, y: 18 },
  'middle-left': { x: 18, y: 50 },
  'middle-center': DEFAULT_AMR_POSITION,
  'middle-right': { x: 82, y: 50 },
  'bottom-left': { x: 18, y: 82 },
  'bottom-center': { x: 50, y: 82 },
  'bottom-right': { x: 82, y: 82 }
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'amr_halkidiki2025';

  currentDate = Date.now();

  isPositionEditorOpen = false;

  amrPosition: AmrPosition = this.loadAmrPosition();

  positionPresets: { label: string; value: AmrPositionPreset }[] = [
    { label: 'Top left', value: 'top-left' },
    { label: 'Top center', value: 'top-center' },
    { label: 'Top right', value: 'top-right' },
    { label: 'Middle left', value: 'middle-left' },
    { label: 'Center', value: 'middle-center' },
    { label: 'Middle right', value: 'middle-right' },
    { label: 'Bottom left', value: 'bottom-left' },
    { label: 'Bottom center', value: 'bottom-center' },
    { label: 'Bottom right', value: 'bottom-right' }
  ];

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

  togglePositionEditor(): void {
    this.isPositionEditorOpen = !this.isPositionEditorOpen;
  }

  setAmrPosition(preset: AmrPositionPreset): void {
    this.saveAmrPosition(POSITION_PRESETS[preset]);
  }

  moveAmrPosition(deltaX: number, deltaY: number): void {
    this.saveAmrPosition({
      x: this.clampPosition(this.amrPosition.x + deltaX),
      y: this.clampPosition(this.amrPosition.y + deltaY)
    });
  }

  resetAmrPosition(): void {
    this.saveAmrPosition(DEFAULT_AMR_POSITION);
  }

  get amrPositionStyle(): Record<string, string> {
    return {
      left: `${this.amrPosition.x}%`,
      top: `${this.amrPosition.y}%`
    };
  }

  private loadAmrPosition(): AmrPosition {
    try {
      const savedPosition = localStorage.getItem(AMR_POSITION_STORAGE_KEY);

      if (!savedPosition) {
        return DEFAULT_AMR_POSITION;
      }

      const parsedPosition = JSON.parse(savedPosition) as Partial<AmrPosition>;

      return {
        x: this.clampPosition(Number(parsedPosition.x)),
        y: this.clampPosition(Number(parsedPosition.y))
      };
    } catch {
      return DEFAULT_AMR_POSITION;
    }
  }

  private saveAmrPosition(position: AmrPosition): void {
    this.amrPosition = {
      x: this.clampPosition(position.x),
      y: this.clampPosition(position.y)
    };

    localStorage.setItem(AMR_POSITION_STORAGE_KEY, JSON.stringify(this.amrPosition));
  }

  private clampPosition(value: number): number {
    if (!Number.isFinite(value)) {
      return 50;
    }

    return Math.min(92, Math.max(8, value));
  }

}
