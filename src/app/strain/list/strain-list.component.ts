import {BaseListComponent} from '../../base/base-list.component';
import {Messenger} from '../../essencial/messenger.service';
import {Strain} from '../strain';
import {StrainService} from '../strain.service';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {StrainEditComponent} from '../create/strain-edit.component';
import {StrainFilter} from '../strain-filter';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-strain-list',
  templateUrl: './strain-list.component.html',
  styleUrls: ['./strain-list.component.css'],
  animations: [trigger('filter-position', [
    state('hidden', style({
      opacity: 0,

    })),
    state('visible', style({
      opacity: 1
    })),
    transition('hidden => visible', animate('300ms ease-in')),
    transition('visible => hidden', animate('300ms ease-out'))

  ]), trigger('filter-visibility', [
    state('hidden', style({
      display: 'none'
    })),
    state('visible', style({
      display: 'block'
    })),
    transition('hidden => visible', animate('300ms 300ms ease-in')),
    transition('visible => hidden', animate('300ms 300ms ease-out'))

  ]), trigger('arrow-position', [
    state('up', style({
      opacity: 1
    })),
    state('centered', style({
      opacity: 0
    })),
    transition('up => centered', animate('300ms 300ms ease-in')),
    transition('centered => up', animate('300ms 300ms ease-out'))

  ]), trigger('arrow-visibility', [
    state('up', style({
      display: 'flex'
    })),
    state('centered', style({
      display: 'none'
    })),
    transition('up => centered', animate('300ms 150ms ease-in')),
    transition('centered => up', animate('300ms 150ms ease-out'))

  ]), trigger('buttons-visibility', [
    state('up', style({
      padding: '20px',

    })),
    state('centered', style({
      padding: '40px',
    })),
    transition('up => centered', animate('300ms 300ms ease-in')),
    transition('centered => up', animate('300ms 300ms ease-out'))

  ]), trigger('grid-visibility', [
    state('hidden', style({
      opacity: 0,
      height: '0rem',

    })),
    state('visible', style({
      opacity: 1,
      height: 'auto',
    })),
    transition('hidden => visible', animate('800ms ease-in')),
    transition('visible => hidden', animate('800ms ease-out'))

  ])
  ]
})
export class StrainListComponent extends BaseListComponent<Strain, StrainFilter, StrainEditComponent, StrainService> implements OnInit {

  species: any[];
  requiredExpertizes: any[];
  flowerings: any[];

  constructor(private service: StrainService,
    private router: Router,
    private messenger: Messenger,
    private formBuilder: FormBuilder) {
    super(service, messenger, formBuilder);
  }

  ngOnInit() {
    if (this.editComponent === undefined) {
      this.editComponent = new StrainEditComponent(this.service, this.router, this.messenger, this.formBuilder);
    }

    this.resetListForm();

    this.service.getAllSpecies()
      .subscribe(data => {
        this.species = data;
      }, err => this.messenger.showErrorMessage('Search failed. Bad programming. Report this bug to admin.' + err.error));

    this.service.getAllRequiredExpertizes()
      .subscribe(data => {
        this.requiredExpertizes = data;
      }, err => this.messenger.showErrorMessage('Search failed. Bad programming. Report this bug to admin.' + err.error));

    this.service.getAllFlowerings()
      .subscribe(data => {
        this.flowerings = data;
      }, err => this.messenger.showErrorMessage('Search failed. Bad programming. Report this bug to admin.' + err.error));
  }

  clear(): void {
    super.clear();
    this.resetListForm();
  }

  resetListForm(): void {
    this.listForm = this.initForm({
      name: this.formBuilder.control('', [Validators.maxLength(50)]),
      specie: this.formBuilder.control(''),
      requiredExpertize: this.formBuilder.control(''),
      flowering: this.formBuilder.control(''),
      minHeight: this.formBuilder.control(''),
      maxHeight: this.formBuilder.control('')
    });
  }



}
