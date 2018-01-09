import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import {FormsModule} from '@angular/forms';
import { HomeRoutes } from './home.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule ,
    RouterModule.forChild(HomeRoutes), 
  ],
  declarations: [HomeComponent],
  providers:[]
})
export class HomeModule { }
