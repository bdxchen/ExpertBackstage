import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Headers, Http } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/Rx';
import { HttpService } from '../http.service';
import { Api } from '../../environments/environment';

@Component({
  selector: 'app-expertdetail',
  templateUrl: './expertdetail.component.html',
  styleUrls: ['./expertdetail.component.css']
})
export class ExpertdetailComponent extends Api implements OnInit {

  rId: any;
  dataSource: Observable<any>;
  expertdetail: any = [];
  matchdetail: any = [];
  expertimg: any = [];

  constructor(public httpService: HttpService, public http: Http, public router: Router, public routerIonfo: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.routerIonfo.params.subscribe((params: Params) => {
      this.rId = params.rid;
      this.getuserInfo();
    });
  }

  getuserInfo() {
    const params: any = {
      rId: this.rId
    };
    this.dataSource = this.httpService.get('/ExpAdmin/GetExpertRecommendDetail', params, '').map(response => response.json());
    this.dataSource.subscribe(
      (data: any) => {
        console.log(data);
        this.expertdetail = data;
        this.expertdetail.rId = this.rId;
        this.matchdetail = data.EventRecommends;

        this.expertimg = data.Imgs.split(',');
      },
      (error: any) => {
        alert(JSON.parse(error._body).Message);
      }
    );
  }

}
