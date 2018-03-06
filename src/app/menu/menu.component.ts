import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  type: any;

  constructor(public router: Router) { }

  ngOnInit() {
    const reloadnum = parseInt(localStorage.getItem('reloadnum'), 10);
    if (reloadnum < 1) {
      localStorage.setItem('reloadnum', JSON.stringify(reloadnum + 1));
      location.reload();
    }
  }
  nav(url: string) {
    this.router.navigateByUrl(url);
  }

  choose(type) {
    this.type = type;
  }

}
