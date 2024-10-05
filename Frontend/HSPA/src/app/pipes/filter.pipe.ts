import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], filterString : string, propName : string): any[] {
    var resultArray = [];
    if(value.length === 0 || filterString == '' || propName == ''){
      return value;
    }
    debugger;
    for(const item of value){
      if(propName === 'Price'){
        if(item[propName] === parseInt(filterString)){
          resultArray.push(item);
        }
      }
      else{
        if(item[propName].toLowerCase().includes(filterString.toLowerCase())){
          resultArray.push(item);
        }
      }
      
    }

    return resultArray;
  }

}
