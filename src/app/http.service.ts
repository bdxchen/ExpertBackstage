import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Api } from '../environments/environment';


@Injectable()
export class HttpService extends Api {

  constructor(private http: Http) {
    super();
  };
  http_builder_url(url, params) {
    url += (url.indexOf('?') !== -1) ? '' : '?';
    for (const k in params) {
      if (k) {
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
      header.append('Authorization', '');
    }
    return this.http.get(this.http_builder_url(this.ApiUrl + version + url, params), {headers: header});
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
    return this.http.post(this.ApiUrl + version + url, params, {headers: header});
  }

}
