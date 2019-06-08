import {Component, OnInit, Inject, HostListener} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public fixed = false;

  constructor( @Inject(DOCUMENT) private doc: Document) {}

  ngOnInit() {
  }


  @HostListener('window:scroll', [])
  onWindowScroll() {
    const num = this.doc.body.scrollTop;
    if (num > 50) {
      this.fixed = true;
    } else if (this.fixed && num < 5) {
      this.fixed = false;
    }
  }
}
