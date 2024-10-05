import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { Routes, RouterModule } from '@angular/router'; 
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PropertyCardComponent } from './property/property-card/property-card.component';
import { PropertyListComponent } from './property/property-list/property-list.component';
import { AddPropertyComponent } from './property/add-property/add-property.component';
import { PropertyDetailsComponent } from './property/property-details/property-details.component';
import { PagenotfoundComponent } from './errorPages/pagenotfound/pagenotfound.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserRegisterComponent } from './user/user-login/user-register/user-register.component';
import { NavBarComponent } from './nav-bar/nav-bar/nav-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PropertyDetailsResolverService } from './property/property-details/property-details-resolver.service';
import { FilterPipe } from './pipes/filter.pipe';
import { SortPipe } from './pipes/sort.pipe';

const appRoute: Routes = [
  {path :'',component:PropertyListComponent},
  {path :'rent-property',component:PropertyListComponent},
  {path : 'add-property', component:AddPropertyComponent},
  { path: 'property-details/:id', 
    component:PropertyDetailsComponent, 
    resolve:{prp:PropertyDetailsResolverService}},
  { path: 'user/login', component:UserLoginComponent},
  { path: 'user/register', component:UserRegisterComponent },
  { path: '**', component:PagenotfoundComponent}
]

@NgModule({
  declarations: [
    AppComponent,PropertyCardComponent, PropertyListComponent,NavBarComponent,AddPropertyComponent,PropertyDetailsComponent,PagenotfoundComponent,
    UserLoginComponent,UserRegisterComponent, FilterPipe, SortPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,    
    TabsModule.forRoot(),
    NgbModule,
    RouterModule.forRoot(appRoute),
    ButtonsModule.forRoot(), BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    NgxGalleryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
