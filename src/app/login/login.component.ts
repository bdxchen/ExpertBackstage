import { Component, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  dataSource: Observable<any>;
  imgcode: any;
  userinfo: any = {
    code: '',
    mobile: '',
    pwd: '',
    captcha: ''
  };

  constructor(public httpService: HttpService, private http: Http, public router: Router) { }

  ngOnInit() {
    this.newUser();
    this.getguid();
    localStorage.setItem('reloadnum', '0');
  }

  // 生成游客
  newUser() {
    if (localStorage.getItem('token')) {
      console.log(localStorage.getItem('token'));
    }else {
      const params: any = {};
      this.dataSource = this.http.post('http://apitest.duoniuapp.com/apihot/v1/Account/Register', params).map(response => response.json());
      this.dataSource.subscribe(
        data => {
          console.log(data);
          localStorage.setItem('token', 'Bearer ' + data.Token);
          localStorage.setItem('userInfo', JSON.stringify(data));
        }
      );
    }
  }

  // 获取验证码图片
  getguid() {
    function S4() {
      // tslint:disable-next-line:no-bitwise
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    const guid = (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4());
    this.userinfo.code = guid;
    this.imgcode = 'http://apitest.duoniuapp.com/apihot/v1/ExpAdmin/GetCaptchaImage?code=' + guid + '&type=1';
    console.log(this.imgcode);
  }

  // 登录
  login() {
    console.log(this.userinfo);
    if (this.userinfo.mobile === '') {
      alert('用户名不能为空');
    }else if (this.userinfo.pwd === '') {
      alert('请输入密码');
    }else {
      this.dataSource = this.httpService.get('/ExpAdmin/ExpLogin', this.userinfo, '').map(response => response.json());
      this.dataSource.subscribe(
        (data: any) => {
          localStorage.setItem('token', 'Bearer ' + data.Token);
          localStorage.setItem('userInfo', JSON.stringify(data));
          this.router.navigate(['home/userinfo']);
        },
        (error: any) => {
          alert(JSON.parse(error._body).Message);
        }
      );
    }
  }
}
