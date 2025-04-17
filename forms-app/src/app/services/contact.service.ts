import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  file?: File;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor() { }

  submitForm(formData: FormData): Observable<{ success: boolean; message: string }> {
    // Convert FormData to a regular object for logging
    const formDataObj: { [key: string]: any } = {};
    formData.forEach((value, key) => {
      formDataObj[key] = value;
    });
    
    // In a real application, this would make an HTTP request to a backend API
    console.log('Submitting form data:', formDataObj);
    
    // Simulate API call with a delay
    return of({
      success: true,
      message: 'Form submitted successfully'
    }).pipe(delay(1500)); // 1.5 second delay to simulate network request
  }
} 