import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private theme = new BehaviorSubject<string>('light');
  currentTheme = this.theme.asObservable();

  setTheme(theme: string) {
    this.theme.next(theme);
  }
}