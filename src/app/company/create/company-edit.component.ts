import {BaseEditComponent} from '../../base/base-edit.component';
import {Company} from '../company';
import {CompanyService} from '../company.service';
import {Component, OnChanges, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Messenger} from '../../essencial/messenger.service';
import {FormBuilder, Validators} from '@angular/forms';
import {CompanyFilter} from '../company-filter';
import {animate, state, style, transition, trigger} from '@angular/animations';


@Component({
  selector: 'app-company-create',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css'],
  animations: [trigger('edit-visibility', [
    state('hidden', style({
      display: 'none',
      opacity: 0,
      height: '100vh',
      width: '0rem'

    })),
    state('visible', style({
      opacity: 1,
      height: '100vh',
      width: '30rem'
    })),
    transition('hidden => visible', animate('800ms 0ms ease-in')),
    transition('visible => hidden', animate('800ms 0ms ease-out'))

  ])
  ]
})
export class CompanyEditComponent extends BaseEditComponent<Company, CompanyFilter, CompanyService> implements OnInit, OnChanges {
  messages = [];

  constructor(private service: CompanyService, private router: Router
    , private messenger: Messenger, private formBuilder: FormBuilder) {
    super(service, messenger, formBuilder);
  }

  ngOnChanges() {
    if (this.entity === undefined || this.entity.id === undefined) {
      if (this.editForm !== undefined) {
        this.editForm.reset();
        return;
      }
      this.editForm = this.initForm({
        id: this.formBuilder.control(''),
        name: this.formBuilder.control('', [Validators.required])
      });
    } else {
      this.editForm = this.initForm({
        id: this.formBuilder.control(this.entity.id),
        name: this.formBuilder.control(this.entity.name, [Validators.required])
      });
    }
    console.log(this.editForm.controls.id.value);
  }

  ngOnInit() {

  }

}
