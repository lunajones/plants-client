import {Injectable} from '@angular/core';
import {CompanyResponse} from './company-response';
import {CompanyRequest} from './company-request';
import {HttpParams} from '@angular/common/http';
import {CustomHttpClient} from '../custom-httpclient.service';
import {Http, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import {map, catchError} from 'rxjs/operators';

import {HttpHeaders} from '@angular/common/http';






@Injectable()
export class CompanyService {

  constructor(public http: CustomHttpClient) {}

  searchAll(filter: CompanyRequest): Observable<any> {


    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'});
    headers.append('Authorization', 'Basic ' + btoa('user1:secret1'));
    headers.append('Content-Type', 'application/ json');
    let result: Observable<Object>;

    result = this.http.post('http://localhost:8080/plants/company/find', filter);

    return result;


  }

}