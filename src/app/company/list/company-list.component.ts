import {Messenger} from '../../essencial/messenger.service';
import {CompanyRequest} from '../company-request';
import {Company} from '../company';
import {CompanyService} from '../company.service';
import {Component, OnInit, NgZone, AfterViewInit} from '@angular/core';
import {ViewChild} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html'
})
export class CompanyListComponent implements OnInit {
  mainFilter = <CompanyRequest>{};
  mainGridList = [];
  messages = [];

  constructor(private companyService: CompanyService, private router: Router, private messenger: Messenger) {}

  ngOnInit() {

  }

  searchAll() {
    this.companyService.searchAll(this.mainFilter)
      .subscribe(data => {
        this.mainGridList = data['content'];
      });
  }

  remove(item: Company) {

    this.companyService.remove(item.id)
      .subscribe(data => {
        this.messenger.showSuccessMessage('Removed');
        this.searchAll();
      },
      error => {
        this.messenger.showErrorMessage(error.message);
      });
  }




}
