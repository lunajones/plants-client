import {Component, OnInit, NgZone, AfterViewInit} from '@angular/core';
import {ViewChild} from '@angular/core';


@Component({
  selector: 'app-base'
})
export class BaseListComponent implements OnInit {

  searched;

  constructor() {}
  hasSearched;

  ngOnInit() {
  }

}
