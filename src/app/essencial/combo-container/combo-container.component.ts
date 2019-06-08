import {AfterContentInit, Component, ContentChild, Input, OnInit} from '@angular/core';
import {FormControlName} from '@angular/forms';

@Component({
  selector: 'app-combo-container',
  templateUrl: './combo-container.component.html',
  styleUrls: ['./combo-container.component.css']
})
export class ComboContainerComponent implements OnInit, AfterContentInit {

  @Input() label: string;
  @Input() errorMessage: string;

  combo: any;

  @ContentChild(FormControlName) control: FormControlName;

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.combo = this.control;
    if  (this.control === undefined) {
      throw new Error('This component requires the Reactive Forms Directive. Shame on you! This is just bad programming.');
    }
  }

  hasSuccess(): boolean {
    return this.combo.valid && (this.combo.dirty || this.combo.touched);
  }

  hasError(): boolean {
    return this.combo.invalid && (this.combo.dirty || this.combo.touched);
  }

}
