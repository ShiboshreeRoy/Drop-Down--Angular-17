import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
interface FormField {
  type: string;
  label: string;
  control: any;
  options?: string[];
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  formFields: any[] = [];
  availableFields = [
    { type: 'input', label: 'Number Input', control: new FormControl('') },
    { type: 'select', label: 'Dropdown', control: new FormControl(''), options: [] },
    { type: 'radio', label: 'Radio Button', control: new FormControl(''), options: [] },
    { type: 'checkbox', label: 'Checkbox', control: new FormControl([]), options: [] }
  ];
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
  }

  ngOnInit() {
    //this.loadForm(); // Load the form when the component initializes
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const newField = { ...event.previousContainer.data[event.previousIndex] };
      this.formFields.push(newField);
      this.form.addControl(`control-${this.formFields.length}`, newField.control);
    }
  }

  updateLabel(fieldIndex: number, newLabel: string) {
    this.formFields[fieldIndex].label = newLabel;
  }

  addOption(fieldIndex: number, newOption: string) {
    this.formFields[fieldIndex].options.push(newOption);
  }

  removeOption(fieldIndex: number, optionIndex: number) {
    this.formFields[fieldIndex].options.splice(optionIndex, 1);
  }

  onSubmit() {
    console.log(this.form.value);
  }

  saveForm() {
    const formData = this.formFields.map(field => ({
      type: field.type,
      label: field.label,
      options: field.options || []
    }));
    localStorage.setItem('savedForm', JSON.stringify(formData));
  }

  loadForm() {
    const savedForm = localStorage.getItem('savedForm');
    if (savedForm) {
      this.formFields = JSON.parse(savedForm).map((field: any) => ({
        ...field,
        control: this.createControl(field)
      }));
      this.formFields.forEach((field, index) => {
        this.form.addControl(`control-${index}`, field.control);
      });
    }
  }

  createControl(field: any): FormControl | FormGroup {
    switch (field.type) {
      case 'input':
        return new FormControl('');
      case 'select':
        return new FormControl('');
      case 'radio':
        return new FormControl('');
      case 'checkbox':
        return new FormControl([]);
      default:
        return new FormControl('');
    }
  }
}
