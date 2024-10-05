import { Component, Input } from "@angular/core";
import { IpropertyBase } from "src/app/model/IPropertyBase";

@Component({
    selector:"app-property-card",
    templateUrl:"property-card.component.html",
    styleUrls:['property-card.component.css']
})

export class PropertyCardComponent {
   @Input() property:IpropertyBase | undefined;
   @Input() hideIcons: boolean = false;
}