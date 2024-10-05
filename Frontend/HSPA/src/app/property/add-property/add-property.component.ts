import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { IpropertyBase } from 'src/app/model/IPropertyBase';
import { Property } from 'src/app/model/property';
import { HousingService } from 'src/app/services/housing.service';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
  @ViewChild('Form') addPropertyFormDetails! : NgForm;
  @ViewChild('formTabs') formTabs!: TabsetComponent;
  addPropertyCardForm! : FormGroup;
  propertyObj = new Property();

  propertyTypes : Array<string> = ['House', 'Apartment', 'Duplex'];
  furnishType : Array<string> = ['Fully', 'Semi', 'Unfurnished'];
  NextBtnClicked = false;

  property : IpropertyBase = {
    Id : 0,
    SellRent : 0,
    Name : "",
    PType : "",
    Price : 0,
    FType:"",
    BHK: 0,
    BuiltArea : 0,
    City : "",
    RTM : 0,
    RadyToMove:true,
    estPossessionOn:new Date()
  }

  constructor(private fb: FormBuilder, 
    private router:Router,
    private housingService:  HousingService,
    private alertify : AlertifyService
  ) { }

  ngOnInit() {
    this.CreateAddPropertyForm();
  }

  CreateAddPropertyForm(){
    this.addPropertyCardForm = this.fb.group({
      BasicInfo: this.fb.group({
        SellRent : ['1', Validators.required],
        PType : [null,Validators.required],
        BSPName : [null, [Validators.required,Validators.minLength(5)]],
        BHK : [null,Validators.required],
        FType: [null,Validators.required],
        City:[null,Validators.required]
      }),
      PriceInfo: this.fb.group({
        Price: [null, Validators.required],
        Security:[null],
        Maintenance: [null],
        BuiltArea : [null, Validators.required],
        CarpetArea:[null]
      }),
      AddressInfo: this.fb.group({
        FloorNo: [null,Validators.required],
        TotalFloor: [null],
        Address: [null, Validators.required],
        Address2:[null],
        Landmark: [null]
      }),
      OtherInfo: this.fb.group({
        RTM: ['1',Validators.required],
        POAFrom: [null],
        AgeOfProperty: [null,Validators.required],
        Gated: [null],
        MainEntrance: [null],
        Description: [null]
      })  
    });
  }

  goBack(){
    this.router.navigate(['/']);
  }

  //#region <Getter Setter Methods>

      //#region <All Form-Groups>      
      get BasicInfo(){
        return this.addPropertyCardForm.controls["BasicInfo"] as FormGroup;
      }
    
      get PriceInfo(){
        return this.addPropertyCardForm.controls["PriceInfo"] as FormGroup;
      }
    
      get AddressInfo(){
        return this.addPropertyCardForm.controls["AddressInfo"] as FormGroup;
      }
    
      get OtherInfo(){
        return this.addPropertyCardForm.controls["OtherInfo"] as FormGroup;
      }
      //#endregion
  
      //#region <All Form-Controls>

       get BSPName(){
         return this.BasicInfo.controls["BSPName"] as FormControl;
       }
     
       get SellRent(){
         return this.BasicInfo.controls["SellRent"] as FormControl;
       }
       get BHK(){
        return this.BasicInfo.controls["BHK"] as FormControl;
       }
       get PType(){
        return this.BasicInfo.controls["PType"] as FormControl;
       }
       get FType(){
        return this.BasicInfo.controls["FType"] as FormControl;
       }
       get City(){
        return this.BasicInfo.controls["City"] as FormControl;
       }
     
       get Price(){
         return this.PriceInfo.controls["Price"] as FormControl;
       }
       get Security(){
        return this.PriceInfo.controls["Security"] as FormControl;
       }
       get Maintenance(){
        return this.PriceInfo.controls["Maintenance"] as FormControl;
       }
       get BuiltArea(){
        return this.PriceInfo.controls["BuiltArea"] as FormControl;
       }
       get CarpetArea(){
        return this.PriceInfo.controls["CarpetArea"] as FormControl;
       }     
       
       
       get Address(){
        return this.AddressInfo.controls["Address"] as FormControl;
       }
       get Address2(){
        return this.AddressInfo.controls["Address2"] as FormControl;
       }
       get FloorNo(){
        return this.AddressInfo.controls["FloorNo"] as FormControl;
       }
       get TotalFloor(){
        return this.AddressInfo.controls["TotalFloor"] as FormControl;
       }

       get ReadyToMove(){
        return this.OtherInfo.controls["RTM"] as FormControl;
      }
       get POAFrom(){
        return this.OtherInfo.controls["POAFrom"] as FormControl;
       }
       get AgeOfProperty(){
        return this.OtherInfo.controls["AgeOfProperty"] as FormControl;
       }
       get Gated(){
        return this.OtherInfo.controls["Gated"] as FormControl;
       }
       get MainEntrance(){
        return this.OtherInfo.controls["MainEntrance"] as FormControl;
       }
       get Description(){
        return this.OtherInfo.controls["Description"] as FormControl;
       }
       

       //#endregion
  //#endregion

  onSubmit(){
    this.NextBtnClicked = true;     
    if(this.allTabsValid()){
      this.mapProperty();
      this.housingService.addProperty(this.propertyObj);
      this.alertify.success("Congrats, your property listed successfully on our website")

      if(this.SellRent.value === '2'){
        this.router.navigate(["/rent-property"]);
      }
      else{
        this.router.navigate(['/']);
      }
    }
    else{
      this.alertify.error("Please review the form and provide all valid entries")
    }
    
  }

  mapProperty():void{
    this.propertyObj.Id = +this.housingService.newPropId()!;
    this.propertyObj.SellRent = parseInt(this.SellRent.value);
    this.propertyObj.BHK = this.BHK.value;
    this.propertyObj.PType = this.PType.value;
    this.propertyObj.Name = this.BSPName.value;
    this.propertyObj.City = this.City.value;
    this.propertyObj.FType = this.FType.value;
    this.propertyObj.Price = this.Price.value;
    this.propertyObj.Security = this.Security.value;
    this.propertyObj.Maintenance = this.Maintenance.value;
    this.propertyObj.BuiltArea = this.BuiltArea.value;
    this.propertyObj.CarpetArea = this.CarpetArea.value;
    this.propertyObj.FloorNo = this.FloorNo.value;
    this.propertyObj.TotalFloors = this.TotalFloor.value;
    this.propertyObj.Address = this.Address.value;
    this.propertyObj.Address2 = this.Address2.value;
    this.propertyObj.RTM = this.ReadyToMove.value;
    this.propertyObj.Age = this.AgeOfProperty.value;
    this.propertyObj.Gated = this.Gated.value;
    this.propertyObj.MainEntrance = this.MainEntrance.value;
    this.propertyObj.Description = this.Description.value;
    this.propertyObj.PostedOn = new Date().toString(); 
    this.propertyObj.Image = "";
  }

  allTabsValid(): boolean{
    if(!this.BasicInfo.valid){
      this.formTabs.tabs[0].active = true;
      return false;
    }
    if(!this.PriceInfo.valid){
      this.formTabs.tabs[1].active = true;
      return false;
    }
    if(!this.AddressInfo.valid){
      this.formTabs.tabs[2].active = true;
      return false;
    }
    if(!this.OtherInfo.valid){
      this.formTabs.tabs[3].active = true;
      return false;
    }  
    return true;
  }

  selectTab(tabId: number, formGroup : FormGroup) {
    this.NextBtnClicked = true;
    if (this.formTabs?.tabs[tabId] && formGroup.valid) {
      this.formTabs.tabs[tabId].active = true;
    }
  }

  GetNumber(val: string){
    if(val != ""){
      return parseInt(val);
    }
    else{
      return 0;
    }
    
  }
  getDate(val:string){
    return new Date(val);
  }

}
