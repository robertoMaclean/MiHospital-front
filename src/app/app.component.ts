import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'miHospital';
  view: string;
  role: string;

  constructor(private location: Location,private router: Router ){
    router.events.subscribe((val) => {
      this.view = this.router.url.split("?")[0];
      let user = JSON.parse(localStorage.getItem("currentUser"));
      if(user){
        this.role = user['role'];
      }
    });
  }
}


