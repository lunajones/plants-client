import {Directive, Input, HostBinding} from '@angular/core';


@Directive({selector: '[appEditCollapseDirective]'})
export class AppEditCollapseDirective {
  // style
  @HostBinding('style.height')
  private height: string;
  @HostBinding('style.width')
  private width: string;
  // shown
  @HostBinding('class.in')
  @HostBinding('attr.aria-expanded')
  private isExpanded = true;
  // hidden
  @HostBinding('attr.aria-hidden')
  private isCollapsed = false;
  // stale state
  @HostBinding('class.collapse-edit')
  private isCollapse = true;
  // animation state
  @HostBinding('class.collapsing-edit')
  private isCollapsing;


  @Input()
  private set collapse(value: boolean) {
    this.isExpanded = value;
    this.toggle();
  }

  private get collapse(): boolean {
    return this.isExpanded;
  }

  constructor() {
  }

  toggle() {
    if (this.isExpanded) {
      this.hide();
    } else {
      this.show();
    }
  }

  hide() {
    this.isCollapse = false;
    this.isCollapsing = true;
    this.isExpanded = false;
    this.isCollapsed = true;
    setTimeout(() => {
      this.height = '100vh';
      this.width = '30rem';
      this.isCollapse = true;
      this.isCollapsing = false;
    }, 4);
  }

  show() {
    this.isCollapse = false;
    this.isCollapsing = true;
    this.isExpanded = true;
    this.isCollapsed = false;
    setTimeout(() => {
      this.height = '100vh;';
      this.width = '30rem;';
      this.isCollapse = true;
      this.isCollapsing = false;
    }, 4);
  }
}
