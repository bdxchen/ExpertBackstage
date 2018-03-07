import { HttpService } from './../http.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';

let ImgBase64: any = [[],[]];
@Component({
  selector: 'app-release',
  templateUrl: './release.component.html',
  styleUrls: ['./release.component.css']
})
export class ReleaseComponent {
  OutcomeName: any = localStorage.getItem('ExpOutcomeName');
  PublishRecommendEvents: any = JSON.parse(localStorage.getItem('ExpPublishRecommendEvents'))
  ExpList: any = JSON.parse(localStorage.getItem('ExpList'))
  Plen: number = this.PublishRecommendEvents.length;
  Parameters: any = {
    Title: '',
    Content: '',
    RType: 1,
    ExpType: 1,
    Money: 0,
    CanBettingBean: 0,
    Imgs: [],
    PublishRecommendEvents: []

  }
  GetInputCoin: any = {};
  GetInputCoinBoolean: boolean = false;
  ImgArr: any = [[],[]];
  constructor(public httpService: HttpService, public http: Http, public router: Router, activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe((res) => {
      if(this.Parameters.RType==1){
        this.Parameters.Money = 0;
      }else{
        this.Parameters.Money = '';
      }
      this.Parameters.ExpType = parseInt(res.ExpType);
      this.httpService.get('/ExpertRecommend/GetInputCoin',{expType:this.Parameters.ExpType}, '').map(response => response.json()).subscribe((res: any) => {
        this.GetInputCoin = res;
        this.Parameters.CanBettingBean = res.InputCoin;
        this.GetInputCoinBoolean = true;
      }),((error:any) => {
        alert(error.Message)
      })
    })
  }
  updateImg(event) {
    var Http = this.httpService;
    var reader = new FileReader();
    var Width = 500;
    if(event.currentTarget.files.length>0){
      reader.readAsDataURL(event.currentTarget.files[0])
      reader.onload = function () {
        var ImgUrl = this.result;
        var img = new Image();
        img.src = ImgUrl;
        img.onload = function(){
          var width = img.width,height = img.height;
          if(img.width>Width){
            width = Width;
            height = (Width/img.width)*img.height;
          }
          var canvas = document.createElement('canvas');
          var ctx = canvas.getContext('2d');
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img,0,0,width,height);
          var base64 = canvas.toDataURL('image/jpeg',0.8);
          Http.post('/ExpertRecommend/UploadFile', {FileBase64:base64}, '').map(response => response.json()).subscribe((res: any) => {
            ImgBase64[0].push(base64);
            ImgBase64[1].push(res);
          }),((error:any) => {
            alert(error.Message)
          })
        }
      }
      this.ImgArr = ImgBase64;
    }
    
  }
  del(index){
    this.ImgArr[0].splice(index,1);
    this.ImgArr[1].splice(index,1);
  }
  select(val) {
    this.Parameters.RType = val.srcElement.value;
    if(this.Parameters.RType==1){
      this.Parameters.Money = 0;
    }else{
      this.Parameters.Money = this.GetInputCoin.ExpertTypeInfo.BwinMax;
    }
    
  }
  countNum(str){
    var cNum = 0;//汉字个数
    var vNum = 0;
    for( var i in str){
      //判断是否为汉字
      if(/^[\u4e00-\u9fa5]$/.test(str[i])){
        cNum++;
      }else{
        vNum++;
      }
    }
    return 2*cNum + vNum;
  }
  sub() {
    this.Parameters.Imgs = this.ImgArr[1].join(',');
    this.Parameters.PublishRecommendEvents = this.PublishRecommendEvents;
    // Parameters: any = {
    //   Title: '',
    //   Content: '',
    //   RType: 1,
    //   ExpType: '',
    //   Money: '',
    //   CanBettingBean: 0,
    //   Imgs: '',
    //   PublishRecommendEvents: []
  
    // }
    console.log(this.countNum(this.Parameters.Title))
    if(this.countNum(this.Parameters.Title)>=20&&this.countNum(this.Parameters.Title)<=44){
      if(this.Parameters.ExpType==3){
        if(this.countNum(this.Parameters.Content)<=100&&this.countNum(this.Parameters.Content)>=20000){
          alert('推荐理由长度为50-10000个字之间')
        }else{
          this.httpService.post('/ExpertRecommend/PublishRecommend', this.Parameters, '').map(response => response.json()).subscribe((res: any) => {
            console.log(res)
          }),((error:any) => {
            alert(error.Message)
          })
        }
      }else{
        if(this.countNum(this.Parameters.Content)>=20000){
          alert('推荐理由长度为小于10000个字之间')
        }else{
          this.httpService.post('/ExpertRecommend/PublishRecommend', this.Parameters, '').map(response => response.json()).subscribe((res: any) => {
            console.log(res)
          }),((error:any) => {
            alert(error.Message)
          })
        }
      }
    }else{
      alert('标题长度为10-22个字之间')
    }
  }
  backGo() {
    //this.router.navigate(['home/release/' + this.Parameters.ExpType]);
  }
}
