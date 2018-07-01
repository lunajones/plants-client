import {Company} from '../company';
import {CompanyService} from '../company.service';
import {Component, OnInit, NgZone, AfterViewInit} from '@angular/core';
import {ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Messenger} from '../../essencial/messenger.service';


@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html'
})
export class CompanyCreateComponent implements OnInit {
  mergeable = <Company>{name: ''};
  messages = [];
  id: number;

  constructor(private companyService: CompanyService, private router: Router, private route: ActivatedRoute
    , private messenger: Messenger) {}

  ngOnInit() {
    this.loadMergeableById();
  }

  loadMergeableById() {
    this.route.params.subscribe(data => {
      if (data['id'] !== undefined) {
        this.mergeable.id = +data['id'];
        this.searchById();
      }
    });
  }

  searchById() {
    this.companyService.searchById(this.mergeable.id)
      .subscribe(data => {
        this.mergeable = data;
      });
  }


  save() {
    this.companyService.save(this.mergeable)
      .subscribe(data => {
        this.messenger.showSuccessMessage('Created');
        this.goToSearchPage();
      },
      error => {
        this.messenger.showErrorMessage(error.message);
      });

  }

  update(mergeable: Company) {
    this.companyService.update(mergeable).subscribe(data => {
      this.messenger.showSuccessMessage('Updated');
      this.goToSearchPage();
    },
      error => {
        this.messenger.showErrorMessage(error.message);
      });
  }

  goToSearchPage() {
    if (this.mergeable.id !== undefined) {
      this.router.navigate(['../../../company/list']);
    }
    this.router.navigate(['../../company/list']);
  }


}