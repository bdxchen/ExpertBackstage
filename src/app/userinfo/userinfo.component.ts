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
  BasicInfo = [];
  SinglePlanData = [];
  BothPlanData = [];
  InfoExpertData = [];


  constructor(public httpService: HttpService, public http: Http) {

  }

  ngOnInit() {
    this.GetExpBasicInfo();

  }

  GetExpBasicInfo() {
    const params: any = {};
    this.dataSource = this.httpService.get('/ExpAdmin/GetExpBasicInfo', params, '').map(response => response.json());
    this.dataSource.subscribe(
      (data: any) => {
        console.log(data);
        this.BasicInfo = data;
        this.SinglePlanData = data.SinglePlanData;
        this.BothPlanData = data.BothPlanData;
        this.InfoExpertData = data.InfoExpertData;
      }
    );
  }

}
