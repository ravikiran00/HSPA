import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IpropertyBase } from '../model/IPropertyBase';
import { Property } from '../model/property';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private http:HttpClient) { }

  getAllPropertiesList(sellRent?:number):Observable<Property[]>{
    return this.http.get("data/properties.json").pipe(
      map((data)=>{
        const array = data as Array<any>;
        const PropertiesArray : Array<Property> = [];
        for(const id in array){
          if(sellRent){
            if(data.hasOwnProperty(id) && array[id].SellRent == sellRent){
              PropertiesArray.push(array[id]);
            }
          }
          else{
            PropertiesArray.push(array[id]);
          }
          
        }
        if(localStorage.getItem("newProp")){
          const propertylist = JSON.parse(localStorage.getItem("newProp")!);
          for(const id in propertylist){
            if(sellRent){
              if(parseInt(propertylist[id].SellRent) == sellRent){
                PropertiesArray.push(propertylist[id]);
              }
            }
            else{
              PropertiesArray.push(propertylist[id]);
            }
            
          }
        }
        return PropertiesArray;
      })
    )
  }

  addProperty(property: Property){
    let newProperty = [property];

    if(localStorage.getItem("newProp")){
      newProperty = [property, ...JSON.parse(localStorage.getItem("newProp")!)];
      localStorage.setItem("newProp",JSON.stringify(newProperty));
    }
    else{
      localStorage.setItem("newProp",JSON.stringify(newProperty));
    }
  }

  newPropId(){
    if(localStorage.getItem("PID")){
      localStorage.setItem("PID",String(+localStorage.getItem("PID")! + 1))
      return localStorage.getItem("PID");
    }
    else{
      localStorage.setItem("PID","101");
      return 101;
    }
  }

  getPropertyDetails(propertyId: string){
    
    return this.getAllPropertiesList().pipe(map(propertiesArray => {
      return propertiesArray.find(data=>data.Id === parseInt(propertyId))
      })
    );
  }

}
