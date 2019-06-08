import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

import {HeaderComponent} from './template/header/header.component';
import {FooterComponent} from './template/footer/footer.component';

import {HttpClientModule} from '@angular/common/http';

import {CompanyService} from './company/company.service';
import {CompanyListComponent} from './company/list/company-list.component';
import {CompanyEditComponent} from './company/create/company-edit.component';
import {StrainService} from './strain/strain.service';
import {StrainListComponent} from './strain/list/strain-list.component';
import {StrainEditComponent} from './strain/create/strain-edit.component';
import {Messenger} from './essencial/messenger.service';
import {CustomHttpClient} from './essencial/custom-httpclient.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {NgxPaginationModule} from 'ngx-pagination';
import {AppBreadcrumbComponent} from './app-breadcrumb.component';
import {MenuComponent} from './template/menu/menu.component';
import {AppEditCollapseDirective} from './directive/app-edit-collapse.directive';
import { InputContainerComponent } from './essencial/input-container/input-container.component';
import { GridContainerComponent } from './essencial/grid-container/grid-container.component';
import {ComboContainerComponent} from './essencial/combo-container/combo-container.component';
import {BetweenContainerComponent} from './essencial/fromto-container/between-container.component';




@NgModule({
  declarations: [
    AppComponent,
    AppEditCollapseDirective,
    HeaderComponent,
    MenuComponent,
    AppBreadcrumbComponent,
    FooterComponent,
    CompanyListComponent,
    CompanyEditComponent,
    StrainListComponent,
    StrainEditComponent,
    InputContainerComponent,
    ComboContainerComponent,
    BetweenContainerComponent,
    GridContainerComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    NgxPaginationModule
  ],
  providers: [HttpClientModule, CustomHttpClient, CompanyService, StrainService, Messenger],
  bootstrap: [AppComponent]
})
export class AppModule {}
