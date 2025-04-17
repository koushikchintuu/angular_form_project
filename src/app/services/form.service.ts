import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private apiUrl = 'https://api.example.com/forms'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) { }

  submitForm(formData: any): Observable<any> {
    // In a real application, you would send the data to a server
    // For now, we'll just log it and return a mock response
    console.log('Submitting form data:', formData);
    
    // Simulate API call
    return of({ success: true, message: 'Form submitted successfully' }).pipe(
      tap(response => console.log('Form submission response:', response)),
      catchError(error => {
        console.error('Error submitting form:', error);
        return of({ success: false, message: 'Error submitting form' });
      })
    );
  }

  validateForm(formData: any): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    // Basic validation
    if (!formData.firstName || formData.firstName.length < 2) {
      errors.push('First name is required and must be at least 2 characters');
    }
    
    if (!formData.lastName || formData.lastName.length < 2) {
      errors.push('Last name is required and must be at least 2 characters');
    }
    
    if (!formData.email || !this.isValidEmail(formData.email)) {
      errors.push('Valid email is required');
    }
    
    if (formData.userType === 'business' || formData.userType === 'organization') {
      if (!formData.companyName || formData.companyName.length < 2) {
        errors.push('Company name is required for business/organization users');
      }
    }
    
    if (formData.phoneNumber && !this.isValidPhoneNumber(formData.phoneNumber)) {
      errors.push('Phone number must be 10-15 digits');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private isValidPhoneNumber(phone: string): boolean {
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    return phoneRegex.test(phone);
  }
} 