import { IpropertyBase } from "./IPropertyBase";

export class Property implements IpropertyBase{
    Id!: number;
    PropertyTypeId?: number;
    PropertyType?: string;
    FurnishingTypeId?: number;
    FurnishingType?: string;
    CarpetArea?: number;
    Address?: string;
    Address2?: string;
    CityId?: number;
    FloorNo?: string;
    TotalFloors?: string;
    ReadyToMove?: boolean;
    Age?: string;
    MainEntrance?: string;
    Security?: number;
    Gated?: boolean;
    Maintenance?: number;
    Photo?: string;
    Description?: string;
    SellRent!: number;
    Name? : string;
    PType!: string;
    FType!: string;
    Price!: number;
    BHK!: number;
    BuiltArea!: number;
    City! : string;
    RTM!: number;
    Image! : string;
    RadyToMove!:boolean;
    estPossessionOn!:Date;
    PostedOn!:string;
    Possession!:string;
}