import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';

const ApiUrl = 'https://api.duoniuapp.com/';

@Injectable()
export class HttpService {

  constructor(private http: Http) {};

  http_builder_url(url, params) {
    url += (url.indexOf('?') !== -1) ? '' : '?';
    for (const k in params) {
      if (params(k)) {
        url += ((url.indexOf('=') !== -1) ? '&' : '') + k + '=' + encodeURI(params[k]);
      }
    }
    return url;
  }

  get(url: string, params: any, version: string) {
    if (version === '') {
      version = 'v1';
    }
    const header: any = new Headers();
    if (localStorage.getItem('token')) {
      header.append('Authorization', localStorage.getItem('token'));
    }else {
      header.append('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiNTEzNjIzIiwicm9sZSI6IlVzZXIiLCJleHAiOjE1NDgxMjc4NzEsInZlciI6MH0=.ewByvyaVymmuhSsbW7Ns/6DZ+Zr6Cs71ouGtAaauBRU=');
    }
    return this.http.get(this.http_builder_url(ApiUrl + version + url, params), {headers: header});
  }

  post(url: string, params: any, version: string) {
    if (version === undefined) {
      version = 'v1';
    }
    const header: any = new Headers();
    if (localStorage.getItem('token')) {
      header.append('Authorization', localStorage.getItem('token'));
    }else {
      header.append('Authorization', '');
    }
    return this.http.post(ApiUrl + version + url, params, {headers: header});
  }

  sdf(){
    console.log(213)
  }

}
