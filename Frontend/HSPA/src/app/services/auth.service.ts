import { Injectable } from '@angular/core';
import { AlertifyService } from './alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private alertify: AlertifyService) { }

authUser(user: any){
  let userList : any[] = [];

  if(localStorage.getItem("Users")){
    userList = JSON.parse(localStorage.getItem("Users")!);
  }

  return userList.find(x=>x.userName == user.userName && x.userPWD == user.userPassword)
}

}
