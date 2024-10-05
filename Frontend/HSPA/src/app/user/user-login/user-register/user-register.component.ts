import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import * as alertyfy from 'alertifyjs'
import { AlertifyService } from 'src/app/services/alertify.service';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/services/user.service';
import { PasswardMatchingValidatorDirective } from 'src/shared/PasswardMatchingValidator.directive';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  registrationFormDetails!: FormGroup;
  user : any = {}

  ngOnInit() {
    this.registrationFormDetails = new FormGroup({
      userName : new FormControl(null,Validators.required),
      userEmail : new FormControl(null,[Validators.required, Validators.email]),
      userPWD : new FormControl(null,[Validators.required,Validators.minLength(4)]),
      userCPWD : new FormControl(null,[Validators.required]),
      userMobileNo : new FormControl(null,[Validators.required,Validators.maxLength(10)]),
    },{
      validators: PasswardMatchingValidatorDirective('userPWD','userCPWD')
    });
    //this.createRegistrationForm();
  }

  constructor(private fb : FormBuilder,
              private alertify: AlertifyService,
              private userService : UserService
  ){

  }

  // createRegistrationForm(){
  //   this.registrationFormDetails = this.fb.group({
  //     userName : ['',Validators.required],
  //     userEmail : ['',[Validators.required,Validators.email]],
  //     userPWD: ['',[Validators.required,Validators.minLength(4)]],
  //     userCPWD : ['',[Validators.required]],
  //     userMobileNo : ['',[Validators.required,Validators.maxLength(10)]]
  //   },{
  //     Validators : PasswardMatchingValidatorDirective('userPWD','userCPWD')
  //   })
  // }

  get userName(){
    return this.registrationFormDetails.controls['userName'] as FormControl
  }
  get userEmail(){
    return this.registrationFormDetails.controls['userEmail'] as FormControl
  }
  get userPWD(){
    return this.registrationFormDetails.controls['userPWD'] as FormControl
  }
  get userCPWD(){
    return this.registrationFormDetails.controls['userCPWD'] as FormControl
  }
  get userMobileNo(){
    return this.registrationFormDetails.controls['userMobileNo'] as FormControl
  }

  onSubmit(){
    console.log(this.registrationFormDetails);
    this.user = Object.assign(this.user, this.registrationFormDetails.value);
    if(this.registrationFormDetails.valid){
      //localStorage.setItem("Users", JSON.stringify(this.user));
      this.userService.addUser(this.user)      
      this.alertify.success("User Added Successfully");
      this.registrationFormDetails.reset();
    }
    else{
      this.alertify.error("User Not Valid");
    }    
  }  
}
