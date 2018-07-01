import {HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {Params} from '@angular/router';
import {map, catchError} from 'rxjs/operators';

@Injectable()
export class CustomHttpClient {

  constructor(private http: HttpClient) {}

  get(url) {
    return this.http.get(url, {
      headers: this.getDefaultHeader(),
      withCredentials: true
    });
  }

  post(url, data) {
    return this.http.post(url, data, {
      headers: this.getDefaultHeader(),
      withCredentials: true
    });
  }

  delete(url) {
    return this.http.delete(url, {
      headers: this.getDefaultHeader(),
      withCredentials: true
    });
  }

  put(url, data) {
    return this.http.put(url, data, {
      headers: this.getDefaultHeader(),
      withCredentials: true,
    });
  }

  getDefaultHeader() {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'});
    headers.append('Authorization', 'Basic ' + btoa('user1:secret1'));
    headers.append('Content-Type', 'application/ json');
    return headers;
  }

}
