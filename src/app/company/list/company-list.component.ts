import {BaseListComponent} from '../../base/base-list.component';
import {Messenger} from '../../essencial/messenger.service';
import {Company} from '../company';
import {CompanyService} from '../company.service';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {CompanyEditComponent} from '../create/company-edit.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {CompanyFilter} from '../company-filter';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css'],
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
export class CompanyListComponent extends BaseListComponent<Company, CompanyFilter , CompanyEditComponent, CompanyService>
  implements OnInit {

  constructor(private service: CompanyService,
              private router: Router,
    private messenger: Messenger,
    private formBuilder: FormBuilder) {
    super(service, messenger, formBuilder);
  }

  ngOnInit() {
    if (this.editComponent === undefined) {
      this.editComponent = new CompanyEditComponent(this.service, this.router, this.messenger, this.formBuilder);
    }

    this.resetListForm();
  }

  resetListForm(): void {
    this.listForm = this.initForm({
      id: this.formBuilder.control(''),
      name: this.formBuilder.control('')
    });
  }

}
