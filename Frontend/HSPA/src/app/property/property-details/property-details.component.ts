import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UnaryFunction } from 'rxjs';
import { IpropertyBase } from 'src/app/model/IPropertyBase';
import { Property } from 'src/app/model/property';
import { HousingService } from 'src/app/services/housing.service';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css']
})
export class PropertyDetailsComponent implements OnInit {
  propertyId: number = 0;  
  property = new Property(); 
  galleryOptions!: NgxGalleryOptions[];
  galleryImages!: NgxGalleryImage[];

  constructor(private route: ActivatedRoute, 
    private router:Router,
    private housingService:HousingService) { }

  ngOnInit() {
    this.propertyId = this.route.snapshot.params["id"];      
    this.route.data.subscribe(
      (data : Property | any) =>{
      this.property = data.prp;
    },error =>{
      this.router.navigateByUrl("/");
    }
  )

    // this.route.params.subscribe(
    //   (param)=>{
    //     this.propertyId = +param['id'];
    //     this.housingService.getPropertyDetails(this.propertyId).subscribe(
    //       (data: IpropertyBase|undefined) =>{    
    //         debugger;        
    //         this.property = data;
    //       }
    //     )        
    //   }
    // )

    this.galleryOptions = [
      {
        width: '100%',
        height: '465px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      }      
    ];

    this.galleryImages = [
      {
        small: 'assets/images/internal-1.png',
        medium: 'assets/images/internal-1.png',
        big: 'assets/images/internal-1.png'
      },
      {
        small: 'assets/images/internal-2.png',
        medium: 'assets/images/internal-2.png',
        big: 'assets/images/internal-2.png'
      },
      {
        small: 'assets/images/internal-3.png',
        medium: 'assets/images/internal-3.png',
        big: 'assets/images/internal-3.png'
      },
      {
        small: 'assets/images/internal-4.png',
        medium: 'assets/images/internal-4.png',
        big: 'assets/images/internal-4.png'
      },
      {
        small: 'assets/images/internal-5.png',
        medium: 'assets/images/internal-5.png',
        big: 'assets/images/internal-5.png'
      },
    ];
  }

  onSelfRoute(){
    ++this.propertyId;
    this.router.navigate(['/property-details/'+this.propertyId]);
  }

}
