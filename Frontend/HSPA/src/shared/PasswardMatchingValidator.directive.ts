import { AbstractControl, ValidationErrors } from '@angular/forms';

export function PasswardMatchingValidatorDirective(controlName : string , matchingControlName : string) {
  return (group:AbstractControl) =>{
    const control = group.get(controlName);
    const matchingControl = group.get(matchingControlName);

    if(!control ||! matchingControl){
      return null;
    }

    // return if another validator has already found an error on the matchingControl
    if(matchingControl.errors && !matchingControl.errors['mustmatch']){
      return null;
    }

    // set error on matchingControl if validation fails
    if(control.value !== matchingControl.value){
      matchingControl.setErrors({mustmatch:true})
    }else{
      matchingControl.setErrors(null)
    }
    return null;
  }
}
