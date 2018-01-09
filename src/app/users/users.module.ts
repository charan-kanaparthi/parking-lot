import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UsersService} from './users.service';
import { UsersComponent } from 'app/users/users.component';
import { RouterModule } from '@angular/router';
import { UsersRoutes } from 'app/users/users.routing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@NgModule({
  imports: [
    CommonModule,
    FormsModule ,
    ReactiveFormsModule,
    NgxDatatableModule,
    RouterModule.forChild(UsersRoutes)
  ],
  declarations: [UsersComponent],
  providers:[UsersService]
})
export class UsersModule { }
