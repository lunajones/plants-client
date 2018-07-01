import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CompanyListComponent} from './company/list/company-list.component';
import {CompanyCreateComponent} from './company/create/company-create.component';

const routes: Routes = [
  //O primeiro eh alteravel para facilitar inicializacao de testes
  {
    path: '',
    redirectTo: '/company/list',
    pathMatch: 'full'
  },
  {
    path: 'company',
    children: [
      {
        path: 'list',
        component: CompanyListComponent
      },
      {
        path: 'create',
        component: CompanyCreateComponent
      },
      {
        path: 'edit/:id',
        component: CompanyCreateComponent
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
