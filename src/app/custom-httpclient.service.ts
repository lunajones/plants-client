import {Injectable} from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';

@Injectable()
export class CustomHttpClient {

  constructor(private http: HttpClient) {}


  getDefaultHeader() {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'});
    headers.append('Authorization', 'Basic ' + btoa('user1:secret1'));
    headers.append('Content-Type', 'application/ json');
    return headers;
  }

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
}