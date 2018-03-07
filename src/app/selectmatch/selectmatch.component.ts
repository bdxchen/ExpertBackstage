import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-selectmatch',
  templateUrl: './selectmatch.component.html',
  styleUrls: ['./selectmatch.component.css']
})
export class SelectmatchComponent {
  data: any = {
    currentDay: '',
    teamName: '',
    type: 2,
    pageIndex: 1,
    pageSize: 15
  };
  total: number;
  listArr: any = [];
  dataLen: number;
  tabIndex: number = 0;
  selectArr: any = [];
  selectObj: any = {};
  playArr: any;
  playOutcomeType: number = 1;
  OutcomeType: number;
  typeNum: number = 0;
  selectOk: boolean = false;
  PublishRecommendEvents: any = [[]];
  PublishRecommendEvents1: any = [[]];
  PublishRecommendEvents2: any = [[]];
  OutcomeName: string;
  ExpList: any = [];
  arr1: any = [[]];
  arr2: any = [];
  dan: number = 0;
  constructor(public httpService: HttpService, public http: Http, public router: Router) {
    if (this.data.type == 1) {
      this.arr1 = [[]];
      this.PublishRecommendEvents = [[]];
      this.PublishRecommendEvents2 = [[]];
    } else if (this.data.type == 2) {
      this.arr1 = [[], []]
      this.PublishRecommendEvents = [[], []];
      this.PublishRecommendEvents2 = [[], []];
    } else if (this.data.type == 3) {
      this.arr1 = [[], [], [], []]
      this.PublishRecommendEvents = [[], [], [], []]
      this.PublishRecommendEvents2 = [[], [], [], []]
    }
    this.init()
  }

  init() {
    this.httpService.get('/ExpAdmin/GetRecommendEvents', this.data, '').map(response => response.json()).subscribe((data: any) => {
      if (data.AdminExpertEvents == null) {
      } else {
        let total: any = data.Total / 15;
        this.total = parseInt(total);
        this.listArr = data.AdminExpertEvents;
      }
    }, (error: any) => {
      console.log(error)
    })

  }
  previous() {
    if (this.data.pageIndex > 1) {
      this.data.pageIndex--;
    }
    this.init();
  }
  next() {
    if (this.data.pageIndex <= this.total) {
      this.data.pageIndex++;
      this.init();
    }
  }
  tabs(index) {
    this.data.pageIndex = 1;
    this.listArr = [];
    let date: any = new Date();
    let n = date.getFullYear();
    let m = date.getMonth();
    let y = date.getMonth() + 1;
    let r = date.getDate();
    let t = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    t[1] = n % 4 == 0 ? 29 : 28;
    this.tabIndex = index;
    if (index == 0) {
      this.data.currentDay = '';
    } else if (index == 1) {
      this.data.currentDay = n + '-' + y + '-' + r;
    } else if (index == 2) {
      r += 1;
      if (r > t[m]) {
        r -= t[m];
        y++;
        if (y > 12) {
          y = 1;
          n++;
        }
      } else if (r > t[m]) {
        r -= t[m];
        y++;
        if (y > 12) {
          y = 1;
          n++;
        }
      }
      this.data.currentDay = n + '-' + y + '-' + r;
    } else if (index == 3) {
      r += 2;
      if (r > t[m]) {
        r -= t[m];
        y++;
        if (y > 12) {
          y = 1;
          n++;
        }
      } else if (r > t[m]) {
        r -= t[m];
        y++;
        if (y > 12) {
          y = 1;
          n++;
        }
      }
      this.data.currentDay = n + '-' + y + '-' + r;
    }

    this.init();
  }
  selectItem(data) {
    if (!data.IsCheck) {
      if (this.data.type == 1) {
        if (this.typeNum < 1) {
          this.typeNum++;
          this.selectItemClick(data)
        } else {
          alert('单关只能选择一场比赛！')
        }
      } else if (this.data.type == 2) {
        if (this.typeNum < 2) {
          if (this.selectArr.length > 0) {
            for (var i = 0; i < this.selectArr.length; i++) {
              if (data.EventString == this.selectArr[i].list.EventString) {
                alert('该比赛已选择！')
              } else {
                this.typeNum++;
                this.selectItemClick(data)
              }
            }
          } else {
            this.typeNum++;
            this.selectItemClick(data)
          }
        } else {
          alert('串关只能选择两场比赛！')
        }
      } else if (this.data.type == 3) {
        let equal = 0;
        if (this.typeNum < 4) {
          if (this.selectArr.length > 0) {
            for (var i = 0; i < this.selectArr.length; i++) {
              if (data.EventString == this.selectArr[i].list.EventString) {
                alert('该比赛已选择！')
                equal = 1;
              }
            }
            if (equal != 1) {
              this.typeNum++;
              this.selectItemClick(data)
            }
          } else {
            this.typeNum++;
            this.selectItemClick(data)
          }
        } else {
          alert('情报只能选择四场比赛！')
        }
      }
    }
  }
  selectItemClick(data) {
    if (!data.IsCheck) {
      this.ExpList.push(data);
      this.arr2 = [];
      this.httpService.get('/ExpAdmin/GetExpertEventOutcome', { eventId: data.EventString }, '').map(response => response.json()).subscribe((res: any) => {
        this.selectObj.list = data;
        this.selectObj.play = res;
        let Obj = {
          list: data,
          play: res
        }
        this.selectArr.push(Obj);
        for (var a = 0; a < this.selectArr[this.typeNum - 1].play.length; a++) {
          if (this.selectArr[this.typeNum - 1].play[a].OutcomeType == 2 || this.selectArr[this.typeNum - 1].play[a].OutcomeType == 3) {
            for (var b = 0; b < this.selectArr[this.typeNum - 1].play[a].BettingOffers.length; b++) {
              if (b < this.selectArr[this.typeNum - 1].play[a].BettingOffers.length - 1) {
                if (this.selectArr[this.typeNum - 1].play[a].BettingOffers[b].SubTypeParam == this.selectArr[this.typeNum - 1].play[a].BettingOffers[b + 1].SubTypeParam) {
                  let pan = this.selectArr[this.typeNum - 1].play[a].BettingOffers[b].SubTypeParam;
                  let _obj = {
                    da: this.selectArr[this.typeNum - 1].play[a].BettingOffers[b],
                    xiao: this.selectArr[this.typeNum - 1].play[a].BettingOffers[b + 1],
                    pan: pan
                  }
                  this.arr2.push(_obj);
                }
              }
            }
            this.selectArr[this.typeNum - 1].play[a].BettingOffers = this.arr2;
            this.arr2 = [];
          } else if (this.selectArr[this.typeNum - 1].play[a].OutcomeType == 6) {
            this.OutcomeType = 6;
            let _arr = [];
            for (var b = 0; b < this.selectArr[this.typeNum - 1].play[a].BettingOffers.length; b++) {
              _arr = this.selectArr[this.typeNum - 1].play[a].BettingOffers[b];
              this.selectArr[this.typeNum - 1].play[0].BettingOffers.push(_arr);
            }
          }
        }
      }, (error: any) => {
        console.log(error);
        this.typeNum--;
      })
    }
  }
  wan(data, a, i, c, x, o) {
    let Odds1: number;
    if (o == 1 || o == 5 || o == 4 || o == 7) {
      if (this.dan == 1) {
        this.dan = 0;
        if (this.data.type == 1) {
          this.PublishRecommendEvents = [[]]
        }
      }
      if (data.Odds <= 1.39) {
        alert('单选最低赔率请超过1.39');
      } else {
        let Plen: number = this.PublishRecommendEvents[a].length - 1;
        let Pboolean: boolean;
        let arr = [a, i, c]
        if (this.selectArr[a].play[i].BettingOffers[c].IsCheck == true) {
          this.selectArr[a].play[i].BettingOffers[c].IsCheck = false;
          for (var e = 0; e < this.arr1.length; e++) {
            for (var f = 0; f < this.arr1[e].length; f++) {
              if (JSON.stringify(arr) == JSON.stringify(this.arr1[e][f])) {
                this.arr1[e].splice(f, 1);
              }
            }
          }
          for (var d = 0; d < this.PublishRecommendEvents.length; d++) {
            for (var g = 0; g < this.PublishRecommendEvents[d].length; g++) {
              if (data.BettingOfferID == this.PublishRecommendEvents[d][g].BettingOfferID) {
                this.PublishRecommendEvents[d].splice(g, 1);
              }
            }
          }
        } else {
          if (this.PublishRecommendEvents[a].length > 0) {
            if(data.Odds>2.19&&this.PublishRecommendEvents[a][Plen].Odds>2.19){
              Pboolean = data.Odds + this.PublishRecommendEvents[a][Plen].Odds < 5.4;
            }else{
              alert('双选最低赔率请超过2.19');
              return;
            }
          } else {
            Pboolean = false;
          }
          if (Pboolean) {
            if(this.PublishRecommendEvents[a].length==2){
              this.selectArr[this.arr1[a][0][0]].play[this.arr1[a][0][1]].BettingOffers[this.arr1[a][0][2]].IsCheck = false;
              this.arr1[a].splice(0, 1);
              this.PublishRecommendEvents[a].splice(0, 1);
            }
            setTimeout(() => {
              alert('双选赔率和值请超过5.4');
            }, 100);
          } else {
            this.arr1[a].push(arr);
            if (this.arr1[a].length < 3) {
              if (this.arr1[a].length == 1) {
                this.wanDel(a)
              }
              this.selectArr[a].play[i].BettingOffers[c].IsCheck = true;
              this.PublishRecommendEvents[a].push(data);
            } else {
              this.selectArr[this.arr1[a][0][0]].play[this.arr1[a][0][1]].BettingOffers[this.arr1[a][0][2]].IsCheck = false;
              this.arr1[a].splice(0, 1);
              this.selectArr[a].play[i].BettingOffers[c].IsCheck = true;
              this.PublishRecommendEvents[a].push(data);
              this.PublishRecommendEvents[a].splice(0, 1);
            }
          }

        }
      }
    } else if (o == 2 || o == 3) {
      this.dan = 1;
      if (data.Odds <= 1.5) {
        if (o == 2) {
          alert('大小球最低赔率请超过1.5');
        } else {
          alert('亚盘最低赔率请超过1.5');
        }
      } else {
        this.wanDel(a);
        this.arr1 = [[]];
        this.PublishRecommendEvents = [[]];
        if (x == 'd') {
          this.selectArr[a].play[i].BettingOffers[c].da.IsCheck = true;
        } else {
          this.selectArr[a].play[i].BettingOffers[c].xiao.IsCheck = true;
        }
        this.PublishRecommendEvents[a].push(data)
      }
    }
    var Parr = [];
    for (var n = 0; n < this.PublishRecommendEvents.length; n++) {
      for (var m = 0; m < this.PublishRecommendEvents[n].length; m++) {
        Parr.push(this.PublishRecommendEvents[n][m]);
      }
    }
    if (Parr.length > 0) {
      this.selectOk = true;
    } else {
      this.selectOk = false;
    }
    console.log(this.PublishRecommendEvents)
  }
  wanDuo(data, a, i, c, x, o) {

  }
  wanDel(a) {
    if (this.selectArr.length > 0) {
      for (var i = 0; i < this.selectArr[a].play.length; i++) {
        for (var b = 0; b < this.selectArr[a].play[i].BettingOffers.length; b++) {
          if (this.selectArr[a].play[i].OutcomeType == 1 || this.selectArr[a].play[i].OutcomeType == 5 || this.selectArr[a].play[i].OutcomeType == 4 || this.selectArr[a].play[i].OutcomeType == 6 || this.selectArr[a].play[i].OutcomeType == 7) {
            this.selectArr[a].play[i].BettingOffers[b].IsCheck = false;
          } else {
            this.selectArr[a].play[i].BettingOffers[b].da.IsCheck = false;
            this.selectArr[a].play[i].BettingOffers[b].xiao.IsCheck = false;
          }
        }
      }
    }

  }
  del() {
    if (this.data.type == 1) {
      this.arr1 = [[]];
      this.PublishRecommendEvents = [[]];
      this.PublishRecommendEvents2 = [[]];
    } else if (this.data.type == 2) {
      this.arr1 = [[], []];
      this.PublishRecommendEvents = [[], []];
      this.PublishRecommendEvents2 = [[], []];
    } else if (this.data.type == 3) {
      this.arr1 = [[], [], []];
      this.PublishRecommendEvents = [[], [], [], []];
      this.PublishRecommendEvents2 = [[], [], [], []];
    }
    this.ExpList = [];
    this.selectArr = [];
    this.typeNum = 0;
  }
  sub() {
    if (this.selectOk) {
      this.PublishRecommendEvents1 = [];
      for (var i = 0; i < this.PublishRecommendEvents.length; i++) {
        for (var a = 0; a < this.PublishRecommendEvents[i].length; a++) {
          this.PublishRecommendEvents1.push(this.PublishRecommendEvents[i][a])
        }
      }
      localStorage.setItem('ExpPublishRecommendEvents', JSON.stringify(this.PublishRecommendEvents1))
      localStorage.setItem('ExpList', JSON.stringify(this.ExpList))
      this.router.navigate(['home/release/' + this.data.type]);
    }
  }
  ionViewDidLoad() {
  }
}
