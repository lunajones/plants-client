import {CompanyRequest} from '../company-request';
import {CompanyResponse} from '../company-response';
import {CompanyService} from '../company.service';
import {Component, OnInit, NgZone, AfterViewInit} from '@angular/core';
import {ViewChild} from '@angular/core';
import {} from '@types/googlemaps';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html'
})
export class CompanyListComponent implements OnInit {
  //  lat;
  //  lng;
  //
  //  endereco = '';
  //  listaUbs: Ary<any>;


  mainFilter = <CompanyRequest>{};
  mainGridList = [];

  constructor(private companyService: CompanyService) {}
  
  ngOnInit() {

    //    if (navigator) {
    //      navigator.geolocation.getCurrentPosition(pos => {
    //        this.lng = +pos.coords.longitude;
    //        this.lat = +pos.coords.latitude;
    //      });
    //    } else {
    //      this.lat = -23.532787;
    //      this.lng = -46.6602066;
    //    }
  }

  searchAll() {
    this.companyService.searchAll(this.mainFilter)
      .subscribe(result => this.mainGridList = result);



  }








}
