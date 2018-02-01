import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { ContentComponent } from './content/content.component';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { Routes,RouterModule } from '@angular/router';
import { SoccerexpertComponent } from './soccerexpert/soccerexpert.component';
import { PaymentsComponent } from './payments/payments.component';
import { SettingComponent } from './setting/setting.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

const routeConfig: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent,
    children:[
      {path: '', component: UserinfoComponent},
      {path: 'userinfo', component: UserinfoComponent},
      {path: 'soccerexpert', component: SoccerexpertComponent},
      {path: 'payments', component: PaymentsComponent},
      {path: 'setting', component: SettingComponent}
    ]
  },
  {path: 'login', component: LoginComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    SidebarComponent,
    FooterComponent,
    ContentComponent,
    UserinfoComponent,
    SoccerexpertComponent,
    PaymentsComponent,
    SettingComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routeConfig, { useHash: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
