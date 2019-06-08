import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {StrainListComponent} from './list/strain-list.component';


const routes: Routes = [
  {path: 'strain', component: StrainListComponent}
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StrainRoutingModule {}
