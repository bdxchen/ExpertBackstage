import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Headers, Http } from '@angular/http';
import "rxjs/Rx";

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {

  dataSource:Observable<any>;

  stocks = []


  constructor(public http: Http) {
    let myHeaders:Headers = new Headers();
    myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiNTEzNjIzIiwicm9sZSI6IlVzZXIiLCJleHAiOjE1NDgxMjc4NzEsInZlciI6MH0=.ewByvyaVymmuhSsbW7Ns/6DZ+Zr6Cs71ouGtAaauBRU=")
    this.dataSource = this.http.get('https://api.duoniuapp.com/v1/User/GetUserInfo', {headers: myHeaders}).map(response => response.json());
  }

  ngOnInit() {
    this.dataSource.subscribe(
      data => console.log(data)
    )
    console.log(this.dataSource)
  }

}
