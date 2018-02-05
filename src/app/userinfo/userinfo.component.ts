import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Headers, Http } from '@angular/http';
import 'rxjs/Rx';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {

  dataSource: Observable<any>;

  stocks = [];


  constructor(public httpService: HttpService, public http: Http) {

  }

  ngOnInit() {
    const params: any = {};
    this.dataSource = this.httpService.get('/User/GetUserInfo', params, '').map(response => response.json());
    this.dataSource.subscribe(
      data => console.log(data)
    );

  }

}
