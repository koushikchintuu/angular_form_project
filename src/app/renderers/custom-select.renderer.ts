import { Component, OnInit } from '@angular/core';
import { JsonFormsControl } from '@jsonforms/angular';
import { ControlProps } from '@jsonforms/core';

@Component({
  selector: 'app-custom-select-renderer',
  template: `
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" [for]="id">
        {{ label }}
      </label>
      <select
        [id]="id"
        [value]="value"
        (change)="onChange($event)"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value="">Select an option</option>
        <option *ngFor="let option of options" [value]="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>
  `
})
export class CustomSelectRenderer extends JsonFormsControl implements OnInit {
  id: string;
  label: string;
  value: string;
  options: Array<{value: string, label: string}>;

  constructor() {
    super();
  }

  ngOnInit() {
    this.id = this.uischema.scope;
    this.label = this.uischema.label || '';
    this.value = this.data || '';
    this.options = this.uischema.options?.enum || [];
  }

  onChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.onChange(this.props.path, target.value);
  }

  mapToProps(props: ControlProps): ControlProps {
    return props;
  }
} 