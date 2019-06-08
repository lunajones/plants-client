import {OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';


export class BaseComponent implements OnInit {

  editVisibility = false;

  formGroup: FormGroup;

  fieldWithErrors = '';

  constructor(private baseFormBuilder: FormBuilder) {
  }


  ngOnInit() {

  }

  initForm(formFields): FormGroup {
    this.formGroup = this.baseFormBuilder.group(formFields);
    this.formGroup.setErrors(null);
    return this.formGroup;
  }

  toggleEditVisibility(): void {
    this.editVisibility = this.editVisibility ? false : true;
  }

  isFormValid(): boolean {
    let isValidForm = true;

    Object.keys(this.formGroup.controls).forEach(key => {
      if (this.formGroup.get(key).errors !== null) {
        isValidForm = false;

        this.fieldWithErrors = this.fieldWithErrors + '\n' + key + ' is invalid';
        console.log('Element ' + this.formGroup.get(key) + ' wasn\'t filled correclty');
      }
    });

    return isValidForm;
  }

}
