import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;
  isLoading = false;
  selectedFile: File | null = null;
  filePreview: string | null = null;
  maxFileSize = 5 * 1024 * 1024; // 5MB
  allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private router: Router
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
      file: [null]
    });
  }

  ngOnInit(): void {
    // No need for manual focus handling as we're using CSS
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      
      // Validate file size
      if (file.size > this.maxFileSize) {
        alert('File size exceeds 5MB limit');
        input.value = '';
        return;
      }

      // Validate file type
      if (!this.allowedFileTypes.includes(file.type)) {
        alert('Only JPEG, PNG and PDF files are allowed');
        input.value = '';
        return;
      }

      this.selectedFile = file;
      
      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.filePreview = e.target?.result as string;
        };
        reader.readAsDataURL(file);
      } else {
        this.filePreview = null;
      }
    }
  }

  removeFile(): void {
    this.selectedFile = null;
    this.filePreview = null;
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isLoading = true;
      
      // Create FormData to handle file upload
      const formData = new FormData();
      formData.append('name', this.contactForm.get('name')?.value);
      formData.append('email', this.contactForm.get('email')?.value);
      formData.append('message', this.contactForm.get('message')?.value);
      
      if (this.selectedFile) {
        formData.append('file', this.selectedFile);
      }

      this.contactService.submitForm(formData).subscribe({
        next: (response) => {
          this.isLoading = false;
          // Navigate to success page with the user's name
          this.router.navigate(['/success'], {
            queryParams: { name: this.contactForm.get('name')?.value }
          });
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Error submitting form:', error);
          // You could add error handling UI here
        }
      });
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.contactForm.controls).forEach(key => {
        const control = this.contactForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  // Helper methods for form validation
  get name() { return this.contactForm.get('name'); }
  get email() { return this.contactForm.get('email'); }
  get message() { return this.contactForm.get('message'); }
}
