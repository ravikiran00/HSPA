import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(private auth : AuthService,
              private alertify: AlertifyService,
              private router: Router
  ) { }

  ngOnInit() {
  }

  onLogin(loginForm:NgForm){
    debugger;
    var token = this.auth.authUser(loginForm.value);
    if(token){
      localStorage.setItem("token",token.userName);
      this.alertify.success("Login Successful");
      this.router.navigateByUrl("/");

    }
    else{
      this.alertify.error("Login UnSccuessful");
    }
  }

}
