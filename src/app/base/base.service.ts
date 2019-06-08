import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {CustomHttpClient} from '../essencial/custom-httpclient.service';
import {Http, RequestOptions} from '@angular/http';
import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';

import {HttpHeaders} from '@angular/common/http';


@Injectable()
export class BaseService<E> {

  constructor(private className: String, public baseHttp: CustomHttpClient) {
  }

  searchById(id): Observable<any> {

    let result: Observable<Object>;

    result = this.baseHttp.get('http://localhost:8080/plants/'
      + this.className + '/' + id);

    return result;
  }

  searchAll(filter): Observable<any> {

    let result: Observable<Object>;

    result = this.baseHttp.post('http://localhost:8080/plants/'
      + this.className + '/find', filter);

    return result;
  }

  save(mergeable): Observable<any> {


    let result: Observable<Object>;
    try {
      result = this.baseHttp.post('http://localhost:8080/plants/'
        + this.className + '/', mergeable);
    } catch (error) {
      throw error;
    }
    return result;


  }

  update(mergeable): Observable<any> {
    let result: Observable<Object>;
    try {
      result = this.baseHttp.put('http://localhost:8080/plants/'
        + this.className + '/' + mergeable.id, mergeable);
    } catch (error) {
      throw error;
    }
    return result;
  }

  remove(id: number, callback?: any): Observable<any> {
    let result: Observable<Object>;
    try {
      result = this.baseHttp.delete('http://localhost:8080/plants/'
        + this.className + '/' + id);
    } catch (error) {
      throw error;
    }
    return result;
  }

  getAllSpecies(): Observable<any> {

    let result: Observable<Object>;

    result = this.baseHttp.get('http://localhost:8080/plants/enum/specie');

    return result;
  }

  getAllRequiredExpertizes(): Observable<any> {

    let result: Observable<Object>;

    result = this.baseHttp.get('http://localhost:8080/plants/enum/requiredexpertize');

    return result;
  }

  getAllFlowerings(): Observable<any> {

    let result: Observable<Object>;

    result = this.baseHttp.get('http://localhost:8080/plants/enum/flowering');

    return result;
  }


}
