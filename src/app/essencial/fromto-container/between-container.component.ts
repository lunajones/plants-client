import {
  AfterContentInit,
  Component,
  Input,
  OnInit,
  ViewChild,
  forwardRef, ElementRef,
} from '@angular/core';
import {FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import {EMPTY_STRING} from '../constants/constants';

@Component({
  selector: 'app-between-container',
  templateUrl: './between-container.component.html',
  styleUrls: ['./between-container.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => BetweenContainerComponent),
    multi: true
  }]
})
export class BetweenContainerComponent implements OnInit, AfterContentInit {

  @Input() form: FormGroup;

  @Input() placeHolderFrom: string;
  @Input() placeHolderTo: string;

  @Input() id: string;
  @Input() name: string;
  @Input() type: string;

  @Input() formControlNameFrom: string;
  @Input() formControlNameTo: string;

  @Input() errorMessage: string;

  inputFrom: any;

  inputTo: any;

  bluredFirstField = false;

  bluredSecondField = false;

  @Input() minFirstFieldLength: number;
  @Input() maxFirstFieldLength: number;
  @Input() minSecondFieldLength: number;
  @Input() maxSecondFieldLength: number;


  @Input() minFirstField: number;
  @Input() maxFirstField: number;
  @Input() minSecondField: number;
  @Input() maxSecondField: number;


  @ViewChild('from') elementFrom: ElementRef;

  @ViewChild('to') elementTo: ElementRef;

  constructor() {
  }

  ngOnInit() {
    this.onInitFirstField();
    this.onInitSecondField();
  }

  ngAfterContentInit() {
    this.inputFrom = this.form.controls[this.formControlNameFrom];
    this.inputTo = this.form.controls[this.formControlNameTo];

    if (this.inputFrom === undefined) {
      throw new Error('This component requires the Reactive Forms Directive. Shame on you! This is just bad programming.');
    }

    if (this.inputTo === undefined) {
      throw new Error('This component requires the Reactive Forms Directive. Shame on you! This is just bad programming.');
    }

  }

  onInitFirstField() {
    if (this.type === 'number') {
      this.elementFrom.nativeElement.setAttribute('min', 0);
    }

    if (this.type === 'number' && this.minFirstField !== undefined) {
      this.elementFrom.nativeElement.setAttribute('min', this.minFirstField);
    }

    if (this.type === 'number' && this.maxFirstField !== undefined) {
      this.elementFrom.nativeElement.setAttribute('max', this.maxFirstField);
    }

    if (this.minFirstFieldLength !== undefined) {
      this.elementFrom.nativeElement.setAttribute('minLength', this.minFirstFieldLength);
    }

    if (this.maxFirstFieldLength !== undefined) {
      this.elementFrom.nativeElement.setAttribute('maxLength', this.maxFirstFieldLength);
    }
  }

  onInitSecondField() {
    if (this.type === 'number') {
      this.elementTo.nativeElement.setAttribute('min', 0);
    }

    if (this.type === 'number' && this.minSecondField !== undefined) {
      this.elementTo.nativeElement.setAttribute('min', this.minSecondField);
    }

    if (this.type === 'number' && this.maxSecondField !== undefined) {
      this.elementTo.nativeElement.setAttribute('max', this.maxSecondField);
    }

    if (this.minSecondFieldLength !== undefined) {
      this.elementTo.nativeElement.setAttribute('minLength', this.minSecondFieldLength);
    }

    if (this.maxSecondFieldLength !== undefined) {
      this.elementTo.nativeElement.setAttribute('maxLength', this.maxSecondFieldLength);
    }
  }

  onBlurFirstField() {
    if (this.elementFrom.nativeElement.value === '' && this.inputTo.touched) {
      this.errorMessage = 'Fill initial interval';
      this.inputFrom.setErrors({'invalid': true});
    } else if (this.type === 'number' &&
      parseFloat(this.elementFrom.nativeElement.value) > parseFloat(this.elementTo.nativeElement.value)) {
      this.errorMessage = 'Initial interval should be less than final';
      this.inputFrom.setErrors({'invalid': true});
    } else if (this.type === 'number' && parseFloat(this.elementFrom.nativeElement.value) < 0) {
      this.errorMessage = 'Initial interval should positive';
      this.inputFrom.setErrors({'invalid': true});
    } else {
      this.errorMessage = EMPTY_STRING;
      this.inputFrom.setErrors(null);
    }
    this.bluredFirstField = true;

  }

  onBlurSecondField() {
    if (this.elementTo.nativeElement.value === '' && this.inputFrom.touched) {
      this.errorMessage = 'Fill final interval';
      this.inputTo.setErrors({'invalid': true});
    } else if (this.type === 'number' &&
      parseFloat(this.elementFrom.nativeElement.value) > parseFloat(this.elementTo.nativeElement.value)) {
      this.errorMessage = 'Final interval should be greater than initial';
      this.inputTo.setErrors({'invalid': true});
    } else if (this.type === 'number' && parseFloat(this.elementTo.nativeElement.value) < 0) {
      this.errorMessage = 'Final interval should positive';
      this.inputFrom.setErrors({ 'invalid': true });
    } else {
      this.errorMessage = EMPTY_STRING;
      this.inputTo.setErrors(null);
    }

    this.bluredSecondField = true;

  }

  hasError() {
    if ((this.inputFrom.errors !== null && this.errorMessage !== '' && (this.inputFrom.dirty || this.inputFrom.touched)) ||
      (this.inputTo.errors !== null && this.errorMessage !== '' && (this.inputTo.dirty || this.inputTo.touched))) {
      return true;
    }

    return false;
  }

  showErrorMessageFirstField(): boolean {
    if (this.hasError() && this.bluredFirstField) {
      return true;
    }

    return false;
  }

  showErrorMessageSecondField(): boolean {
    if (this.hasError() && this.bluredSecondField) {
      return true;
    }

    return false;
  }


}
