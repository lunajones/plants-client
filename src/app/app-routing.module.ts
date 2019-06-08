import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CompanyListComponent} from './company/list/company-list.component';
import {CompanyEditComponent} from './company/create/company-edit.component';
import {StrainListComponent} from './strain/list/strain-list.component';
import {StrainEditComponent} from './strain/create/strain-edit.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/company/list',
    pathMatch: 'full'
  },
  {
    path: 'company',
    data: {
      breadcrumb: 'Company'
    },
    children: [
      {
        path: 'list',
        component: CompanyListComponent,
        data: {
          breadcrumb: 'List'
        }

      },
      {
        path: 'create',
        component: CompanyEditComponent,
        data: {
          breadcrumb: 'New'
        }
      },
      {
        path: 'edit/:id',
        component: CompanyEditComponent,
        data: {
          breadcrumb: 'Edit'
        }
      }
    ]
  },
  {
    path: 'strain',
    data: {
      breadcrumb: 'Strain'
    },
    children: [
      {
        path: 'list',
        component: StrainListComponent,
        data: {
          breadcrumb: 'List'
        }

      },
      {
        path: 'create',
        component: StrainEditComponent,
        data: {
          breadcrumb: 'New'
        }
      },
      {
        path: 'edit/:id',
        component: StrainEditComponent,
        data: {
          breadcrumb: 'Edit'
        }
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
