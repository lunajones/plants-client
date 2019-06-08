import {BaseEditComponent} from '../../base/base-edit.component';
import {Strain} from '../strain';
import {StrainService} from '../strain.service';
import {Component, OnChanges, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Messenger} from '../../essencial/messenger.service';
import {FormBuilder, Validators} from '@angular/forms';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {StrainFilter} from '../strain-filter';


@Component({
  selector: 'app-strain-create',
  templateUrl: './strain-edit.component.html',
  styleUrls: ['./strain-edit.component.css'],
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
export class StrainEditComponent extends BaseEditComponent<Strain, StrainFilter, StrainService> implements OnInit, OnChanges {
  messages = [];

  constructor(private service: StrainService, private router: Router
    , private messenger: Messenger, private formBuilder: FormBuilder) {
    super(service, messenger, formBuilder);
  }

  ngOnChanges() {
    this.resetEditForm();
  }

  ngOnInit() {
    this.resetEditForm();
  }

  resetEditForm(): void {
    if (this.entity === undefined || this.entity.id === undefined) {
      if (this.editForm !== undefined) {
        this.editForm.reset();
        return;
      }
      this.editForm = this.initForm({
        id: this.formBuilder.control(''),
        name: this.formBuilder.control('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)])
      });
    } else {
      this.editForm = this.initForm({
        id: this.formBuilder.control(this.entity.id),
        name: this.formBuilder.control(this.entity.name, [Validators.required, Validators.minLength(2), Validators.maxLength(50)])
      });
    }
  }

}
