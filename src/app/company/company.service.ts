import {Injectable} from '@angular/core';
import {Company} from './company';
import {CompanyRequest} from './company-request';
import {HttpParams} from '@angular/common/http';
import {CustomHttpClient} from '../essencial/custom-httpclient.service';
import {Http, RequestOptions} from '@angular/http';
import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';

import {HttpHeaders} from '@angular/common/http';






@Injectable()
export class CompanyService {

  constructor(public http: CustomHttpClient) {}

  searchById(id): Observable<any> {

    let result: Observable<Object>;

    result = this.http.get('http://localhost:8080/plants/company/' + id);

    return result;
  }

  searchAll(filter): Observable<any> {

    let result: Observable<Object>;

    result = this.http.post('http://localhost:8080/plants/company/find', filter);

    return result;
  }

  save(mergeable): Observable<any> {


    let result: Observable<Object>;
    try {
      result = this.http.post('http://localhost:8080/plants/company/', mergeable);
    } catch (error) {
      throw error;
    }
    return result;


  }

  update(mergeable): Observable<any> {
    let result: Observable<Object>;
    try {
      result = this.http.put('http://localhost:8080/plants/company/' + mergeable.id, mergeable);
    } catch (error) {
      throw error;
    }
    return result;
  }

  remove(id: number, callback?: any): Observable<any> {
    let result: Observable<Object>;
    try {
      result = this.http.delete('http://localhost:8080/plants/company/' + id);
    } catch (error) {
      throw error;
    }
    return result;
  }


}
