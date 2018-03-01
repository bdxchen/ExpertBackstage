import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Headers, Http } from '@angular/http';
import 'rxjs/Rx';
import { HttpService } from '../http.service';
import { Api } from '../../environments/environment';

@Component({
  selector: 'app-soccerexpert',
  templateUrl: './soccerexpert.component.html',
  styleUrls: ['./soccerexpert.component.css']
})
export class SoccerexpertComponent implements OnInit {
  dataSource: Observable<any>;
  params: any = {
    type: 1,
    pageIndex: 1,
    pageSize: 10
  };
  total: any;
  recommedslist: any = [];
  pageList: any = [];
  icur: any = 1;
  num: any;

  constructor(public httpService: HttpService, public http: Http, public router: Router, public routerIonfo: ActivatedRoute) { }

  ngOnInit() {
    this.routerIonfo.params.subscribe((params: Params) => {
      this.pageList = [];
      this.icur = 1;
      this.params.pageIndex = 1;
      this.params.type = params.type;
      this.getRecommends();
    });
  }

  goselect(data) {
    console.log(data)
    this.router.navigate(['home/expertdetail/' + data.RID]);
  }

  getRecommends() {
    this.dataSource = this.httpService.get('/ExpAdmin/GetRecommends', this.params, '').map(response => response.json());
    this.dataSource.subscribe(
      (data: any) => {
        console.log(data);
        this.total = data.Total;
        this.recommedslist = data.AdminExpertRecommends;
        this.getPageList();
      },
      (error: any) => {
        alert(JSON.parse(error._body).Message);
      }
    );
  }

  getPageList () {
    const total = this.total;
    const size  = this.params.pageSize;
    const icur = this.icur;
    this.num = Math.ceil( total / size );
    if (this.pageList == '') {
      for ( let i = 0 ; i <  this.num ; i++ ) {
        if (i < 5) {
            this.pageList.push({
                pageid  : i + 1
            });
        }
      }
    }
  }

  jump(index) {
    this.icur = index;
    if (this.icur === this.pageList[0].pageid) {
      const x = 1 - this.icur;
      for (let i = 0; i < this.pageList.length; i++ ) {
        if (x < -3) {
          this.pageList[i].pageid = this.pageList[i].pageid - 4;
        }else {
          this.pageList[i].pageid = this.pageList[i].pageid + x;
        }
      }
    }else if (this.icur === this.pageList[this.pageList.length - 1].pageid) {
      const y = this.num - this.icur;
      for (let i = 0; i < this.pageList.length; i++ ) {
        if (y > 5) {
          this.pageList[i].pageid = this.pageList[i].pageid + 4;
        }else {
          this.pageList[i].pageid = this.pageList[i].pageid + y;
        }
      }
    }
    this.params.pageIndex = this.icur;
    this.getRecommends();
  }

  next(index) {
    if (index === 1) {
      if (this.icur - 1 > 0) {
        this.icur = this.icur - 1;
      }
    }else {
      if (this.icur < this.num) {
        this.icur = this.icur + 1;
      }
    }
    this.jump(this.icur);
  }
}

