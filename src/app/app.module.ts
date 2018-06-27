import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

import {HeaderComponent} from './template/header/header.component';

import {HttpClientModule} from '@angular/common/http';
import {HttpHandler} from '@angular/common/http';

import {CompanyService} from './company/company.service';
import {CompanyListComponent} from './company/list/company-list.component';
import {CustomHttpClient} from './custom-httpclient.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CompanyListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [HttpClientModule, CustomHttpClient, CompanyService],
  bootstrap: [AppComponent]
})
export class AppModule {}
