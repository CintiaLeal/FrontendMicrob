import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private snackBar: MatSnackBar) {}
  showSuccess(message: string): void {
    this.snackBar.open(message, 'OK', {
      duration: 3000, // 3 seconds
      panelClass: ['success-snackbar'],
    });
  }
  
  showError(message: string): void {
    this.snackBar.open(message, 'OK', {
    
      duration: 5000, // 5 seconds
      panelClass: ['error-snackbar'],
    });
  }
  
}
