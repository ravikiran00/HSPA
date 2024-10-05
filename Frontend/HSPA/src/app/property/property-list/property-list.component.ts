import { Component, OnInit } from '@angular/core';
import { HousingService } from 'src/app/services/housing.service';
import { ActivatedRoute } from '@angular/router';
import { IpropertyBase } from 'src/app/model/IPropertyBase';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {  

   Propertys : Array<IpropertyBase> = [];
   SellRent : number = 1;
   sortingField: string = 'City';
   sortValue : string = '';
  //  filterField = '';
  //  filterValue = '';
   sortDirection = 'asc';

   constructor( private route: ActivatedRoute, private housingService: HousingService){

   }

   ngOnInit(): void {
    if(this.route.snapshot.url.toString()){
      this.SellRent = 2;
    }
    this.housingService.getAllPropertiesList(this.SellRent).subscribe(data=>{
      this.Propertys = data;
      const newProperty = JSON.parse(localStorage.getItem("newProp")!);
      if(parseInt(newProperty.SellRent) === this.SellRent){
        this.Propertys = [newProperty, ...this.Propertys];
      }
    }, error=>{
      console.log(error);
    });    
     
   }

  //  searchBtnClick(){
  //   this.filterField = this.sortingField;
  //   this.filterValue = this.sortValue;
  //  }

   changeDirection(){
    if(this.sortDirection === "desc"){
      this.sortDirection = "asc";
    }
    else{
      this.sortDirection = "desc";
    }
   }

}
