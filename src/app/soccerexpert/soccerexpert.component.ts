import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-soccerexpert',
  templateUrl: './soccerexpert.component.html',
  styleUrls: ['./soccerexpert.component.css']
})
export class SoccerexpertComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  goselect() {
    this.router.navigate(['home/selectmatch']);
  }
}

