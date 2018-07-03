import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET} from '@angular/router';
import 'rxjs/operators/filter';

interface Breadcrumb {
  label: string;
  params: Params;
  url: string;
}


@Component({
  selector: 'app-breadcrumb',
  templateUrl: './app-breadcrumb.component.html'
})
export class AppBreadcrumbComponent implements OnInit {

  public breadcrumbs: Breadcrumb[];

  public lastBreadCrumb: Breadcrumb;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.breadcrumbs = [];
  }

  ngOnInit() {
    const ROUTE_DATA_BREADCRUMB = 'breadcrumb';

    this.router.events.subscribe(event => {
      const root: ActivatedRoute = this.activatedRoute.root;
      this.breadcrumbs = this.getBreadcrumbs(root);
    });
  }

  private getBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    const ROUTE_DATA_BREADCRUMB = 'breadcrumb';

    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      if (child.outlet !== PRIMARY_OUTLET) {
        continue;
      }

      if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
        return this.getBreadcrumbs(child, url, breadcrumbs);
      }

      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');

      url += `/${routeURL}`;

      const breadcrumb: Breadcrumb = {
        label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
        params: child.snapshot.params,
        url: url
      };
      breadcrumbs.push(breadcrumb);

      return this.getBreadcrumbs(child, url, breadcrumbs);
    }
  }


  public isLastBreadcrumb(breadcrumb): boolean {
    return (breadcrumb === this.breadcrumbs[this.breadcrumbs.length - 1]);
  }
}
