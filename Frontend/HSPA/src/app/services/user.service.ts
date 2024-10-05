import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

constructor() { }

addUser(user : any){
  let users: any[] = [];
    if(localStorage.getItem("Users")){
      users = JSON.parse(localStorage.getItem("Users")!);
      users = [user, ...users]
    }
    else{
      users.push(user);
    }
    localStorage.setItem("Users", JSON.stringify(users));
}

}
