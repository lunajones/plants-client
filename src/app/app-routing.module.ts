import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CompanyListComponent} from './company/list/company-list.component';
import {CompanyCreateComponent} from './company/create/company-create.component';

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
        component: CompanyCreateComponent,
        data: {
          breadcrumb: 'New'
        }
      },
      {
        path: 'edit/:id',
        component: CompanyCreateComponent,
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
