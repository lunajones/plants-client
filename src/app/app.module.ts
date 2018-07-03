import {NgModule, Component} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

import {HeaderComponent} from './template/header/header.component';
import {FooterComponent} from './template/footer/footer.component';

import {HttpHandler, HttpClientModule} from '@angular/common/http';

import {CompanyService} from './company/company.service';
import {CompanyListComponent} from './company/list/company-list.component';
import {CompanyCreateComponent} from './company/create/company-create.component';
import {Messenger} from './essencial/messenger.service';
import {CustomHttpClient} from './essencial/custom-httpclient.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {NgxPaginationModule} from 'ngx-pagination';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CompanyListComponent,
    CompanyCreateComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    NgxPaginationModule
  ],
  providers: [HttpClientModule, CustomHttpClient, CompanyService, Messenger],
  bootstrap: [AppComponent]
})
export class AppModule {}
