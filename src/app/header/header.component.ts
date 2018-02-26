import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Headers, Http } from '@angular/http';
import 'rxjs/Rx';
import { HttpService } from '../http.service';
import { Api } from '../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends Api implements OnInit {

  dataSource: Observable<any>;
  userinfo = [];

  constructor(public httpService: HttpService, public http: Http) {
    super();
  }

  ngOnInit() {
    this.getuserInfo();
  }

  getuserInfo() {
      this.dataSource = this.httpService.get('/ExpAdmin/GetExpInfoDto', '', '').map(response => response.json());
      this.dataSource.subscribe(
        (data: any) => {
          this.userinfo = data;
        },
        (error: any) => {
          alert(JSON.parse(error._body).Message);
        }
      );
  }
}
