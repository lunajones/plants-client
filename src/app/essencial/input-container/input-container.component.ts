import {AfterContentInit, Component, ElementRef, forwardRef, Input, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import { EMPTY_STRING } from '../constants/constants';

@Component({
  selector: 'app-input-container',
  templateUrl: './input-container.component.html',
  styleUrls: ['./input-container.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputContainerComponent),
    multi: true
  }]
})
export class InputContainerComponent implements OnInit, AfterContentInit {


  @Input() form: FormGroup;

  @Input() placeHolderInput: string;

  @Input() errorMessage: string;

  @Input() id: string;
  @Input() name: string;
  @Input() type: string;

  @Input() minLength: number;
  @Input() maxLength: number;

  @Input() min: number;
  @Input() max: number;

  @Input() formControlNameInput: string;

  input: any;

  @ViewChild('input') elementInput: ElementRef;

  blured = false;

  constructor() {
  }

  ngOnInit() {
    this.onInitInputField();
  }

  onBlurInput() {
    if (this.input === undefined) {
      this.input = this.form.controls[this.formControlNameInput] as AbstractControl;
    }

    if (this.minLength !== undefined && this.elementInput.nativeElement.value.length === 0) {
      this.errorMessage = 'Must be filled';
      this.input.setErrors({ 'invalid': true });

      setTimeout(() => this.elementInput.nativeElement.focus());

    } else if (this.minLength !== undefined && this.elementInput.nativeElement.value.length < this.minLength) {
      this.errorMessage = 'Minimum size is ' + this.minLength + '. You filled only '
        + this.elementInput.nativeElement.value.length + ' character(s)';
      this.input.setErrors({ 'invalid': true });

      setTimeout(() => this.elementInput.nativeElement.focus());

    } else if (this.maxLength !== undefined && this.elementInput.nativeElement.value.length > this.maxLength) {
      this.errorMessage = 'Maximum size is ' + this.maxLength + '. You filled '
        + this.elementInput.nativeElement.value.length + ' characters';
      this.input.setErrors({ 'invalid': true });

      setTimeout(() => this.elementInput.nativeElement.focus());

    } else {
      this.errorMessage = EMPTY_STRING;
      this.input.setErrors(null);
    }

    this.blured = true;

  }

  onFocusInput() {
    this.elementInput.nativeElement.classList.add('animated', 'bounceOutLeft');
  }

  ngAfterContentInit() {
    if (this.input === undefined) {
      this.input = this.form.controls[this.formControlNameInput] as AbstractControl;
    }


    this.errorMessage = EMPTY_STRING;

    if (this.input === undefined) {
      throw new Error('This component requires the Reactive Forms Directive. Shame on you! This is just bad programming.');
    }

  }

  onInitInputField() {
    this.errorMessage = EMPTY_STRING;
    if (this.type === 'number' && this.min === undefined) {
      this.elementInput.nativeElement.setAttribute('min', 0);
    }

    if (this.type === 'number' && this.min !== undefined) {
      this.elementInput.nativeElement.setAttribute('min', this.min);
    }

    if (this.type === 'number' && this.max !== undefined) {
      this.elementInput.nativeElement.setAttribute('max', this.max);
    }

    if (this.minLength !== undefined) {
      this.elementInput.nativeElement.setAttribute('minLength', this.minLength);
    }

    if (this.maxLength !== undefined) {
      this.elementInput.nativeElement.setAttribute('maxLength', this.maxLength);
    }
  }

  hasError(): boolean {
    if (this.input.errors !== null && this.errorMessage !== '' && (this.input.dirty || this.input.touched)) {
      return true;
    }

    return false;
  }

  showErrorMessage(): boolean {
    if (this.hasError() && this.blured) {
      return true;
    }

    return false;
  }

}
