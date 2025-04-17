import { Component, OnInit } from '@angular/core';
import { JsonFormsControl } from '@jsonforms/angular';
import { ControlProps } from '@jsonforms/core';

@Component({
  selector: 'app-custom-text-renderer',
  template: `
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" [for]="id">
        {{ label }}
      </label>
      <input
        [id]="id"
        [type]="type"
        [value]="value"
        (input)="onChange($event)"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        [class.border-red-500]="shouldShowUnfocusedDescription()"
        [placeholder]="placeholder"
      />
      <div *ngIf="shouldShowUnfocusedDescription()" class="text-red-500 text-xs italic mt-1">
        {{ description }}
      </div>
    </div>
  `
})
export class CustomTextRenderer extends JsonFormsControl implements OnInit {
  id: string;
  label: string;
  type: string;
  value: string;
  placeholder: string;
  description: string;

  constructor() {
    super();
  }

  ngOnInit() {
    this.id = this.uischema.scope;
    this.label = this.uischema.label || '';
    this.type = this.uischema.options?.type || 'text';
    this.value = this.data || '';
    this.placeholder = this.uischema.options?.placeholder || '';
    this.description = this.uischema.options?.description || '';
  }

  onChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.onChange(this.props.path, target.value);
  }

  mapToProps(props: ControlProps): ControlProps {
    return props;
  }
} 