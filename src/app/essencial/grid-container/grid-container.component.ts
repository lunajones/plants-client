import {AfterContentInit, Component, ContentChild, Input, Output, OnInit} from '@angular/core';
import {FormControlName} from '@angular/forms';

@Component({
  selector: 'app-grid-container',
  templateUrl: './grid-container.component.html',
  styleUrls: ['./grid-container.component.css']
})
export class GridContainerComponent implements OnInit, AfterContentInit {

  @Input() mainGridListSize: number;

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {
  }

  isEmptyResultList(): boolean {
    if (this.mainGridListSize === undefined) {
      throw new Error('This component requires a main result list. Shame on you! This is just bad programming.');
    }
    if (this.mainGridListSize === 0) {
      return true;
    }
    return false;
  }


}
