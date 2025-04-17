import { Component, OnInit } from '@angular/core';
import { JsonFormsAngularService } from '@jsonforms/angular';
import { JsonFormsState } from '@jsonforms/core';
import { FormService } from '../services/form.service';

@Component({
  selector: 'app-form',
  template: `
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Dynamic Form</h1>
      <div *ngIf="errors.length > 0" class="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        <h3 class="font-bold mb-2">Please fix the following errors:</h3>
        <ul class="list-disc list-inside">
          <li *ngFor="let error of errors">{{ error }}</li>
        </ul>
      </div>
      <json-forms
        [data]="data"
        [schema]="schema"
        [uischema]="uischema"
        (dataChange)="onDataChange($event)"
        class="json-forms">
      </json-forms>
      <div class="mt-4">
        <button 
          (click)="submitForm()" 
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          [disabled]="!isValid">
          Submit
        </button>
      </div>
      <div *ngIf="formData" class="mt-4 p-4 bg-gray-100 rounded">
        <h2 class="text-lg font-semibold mb-2">Form Data:</h2>
        <pre class="whitespace-pre-wrap">{{ formData | json }}</pre>
      </div>
    </div>
  `,
  styles: [`
    .json-forms {
      @apply bg-white p-6 rounded-lg shadow-md;
    }
  `]
})
export class FormComponent implements OnInit {
  data: any = {};
  formData: any = null;
  isValid: boolean = false;
  errors: string[] = [];

  schema: any = {
    type: 'object',
    required: ['firstName', 'lastName', 'email', 'userType'],
    properties: {
      firstName: {
        type: 'string',
        title: 'First Name',
        minLength: 2,
        maxLength: 50
      },
      lastName: {
        type: 'string',
        title: 'Last Name',
        minLength: 2,
        maxLength: 50
      },
      email: {
        type: 'string',
        format: 'email',
        title: 'Email'
      },
      userType: {
        type: 'string',
        title: 'User Type',
        enum: ['individual', 'business', 'organization'],
        default: 'individual'
      },
      companyName: {
        type: 'string',
        title: 'Company Name',
        minLength: 2,
        maxLength: 100
      },
      phoneNumber: {
        type: 'string',
        title: 'Phone Number',
        pattern: '^\\+?[0-9]{10,15}$'
      },
      address: {
        type: 'object',
        title: 'Address',
        properties: {
          street: {
            type: 'string',
            title: 'Street'
          },
          city: {
            type: 'string',
            title: 'City'
          },
          state: {
            type: 'string',
            title: 'State'
          },
          zipCode: {
            type: 'string',
            title: 'ZIP Code',
            pattern: '^[0-9]{5}(-[0-9]{4})?$'
          }
        }
      }
    },
    dependencies: {
      userType: {
        oneOf: [
          {
            properties: {
              userType: { enum: ['individual'] }
            }
          },
          {
            properties: {
              userType: { enum: ['business', 'organization'] },
              companyName: { type: 'string' }
            },
            required: ['companyName']
          }
        ]
      }
    }
  };

  uischema: any = {
    type: 'VerticalLayout',
    elements: [
      {
        type: 'Control',
        scope: '#/properties/firstName',
        options: {
          trim: true
        }
      },
      {
        type: 'Control',
        scope: '#/properties/lastName',
        options: {
          trim: true
        }
      },
      {
        type: 'Control',
        scope: '#/properties/email'
      },
      {
        type: 'Control',
        scope: '#/properties/userType'
      },
      {
        type: 'Control',
        scope: '#/properties/companyName',
        rule: {
          effect: 'SHOW',
          condition: {
            scope: '#/properties/userType',
            schema: {
              enum: ['business', 'organization']
            }
          }
        }
      },
      {
        type: 'Control',
        scope: '#/properties/phoneNumber'
      },
      {
        type: 'Control',
        scope: '#/properties/address'
      }
    ]
  };

  constructor(
    private jsonFormsService: JsonFormsAngularService,
    private formService: FormService
  ) {}

  ngOnInit(): void {}

  onDataChange(event: JsonFormsState): void {
    this.data = event.data;
    const validation = this.formService.validateForm(this.data);
    this.isValid = validation.isValid;
    this.errors = validation.errors;
    this.formData = this.data;
    console.log('Form data changed:', this.data);
    console.log('Validation errors:', this.errors);
  }

  submitForm(): void {
    if (this.isValid) {
      this.formService.submitForm(this.data).subscribe(
        response => {
          if (response.success) {
            alert('Form submitted successfully!');
          } else {
            alert('Error submitting form: ' + response.message);
          }
        },
        error => {
          console.error('Error submitting form:', error);
          alert('An error occurred while submitting the form.');
        }
      );
    } else {
      alert('Please fix the validation errors before submitting.');
    }
  }
} 