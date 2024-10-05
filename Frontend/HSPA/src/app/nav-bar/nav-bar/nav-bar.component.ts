import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
userName : string = "" ;

  constructor(private router : Router) { }

  ngOnInit() {
  }

  loggedIn(){
    this.userName = localStorage.getItem("token")!;
    return localStorage.getItem("token");

  }

  userlogOut(){
    debugger;
    localStorage.removeItem("token");
    this.router.navigateByUrl("user/login");
  }

}
