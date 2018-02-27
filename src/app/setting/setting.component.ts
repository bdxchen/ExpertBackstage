import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Headers, Http } from '@angular/http';
import 'rxjs/Rx';
import { HttpService } from '../http.service';
import { Api } from '../../environments/environment';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent extends Api implements OnInit {

  dataSource: Observable<any>;
  userinfo = [];
  pwd: any = {
    oldPwd: '',
    newPwd: '',
    two: ''
  };

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
        console.log(data);
        this.userinfo = data;
      },
      (error: any) => {
        alert(JSON.parse(error._body).Message);
      }
    );
  }

  EditPassword() {
    console.log(this.pwd);
    if (this.pwd.newPwd === this.pwd.two) {
      this.dataSource = this.httpService.get('/ExpAdmin/EditPassword', this.pwd, '').map(response => response.json());
      this.dataSource.subscribe(
        (data: any) => {
          if (data === true) {
            alert('修改成功！');
          }
        },
        (error: any) => {
          alert(JSON.parse(error._body).Message);
        }
      );
    }else {
      alert('两次密码输入不相同!')
    }
  }
}
