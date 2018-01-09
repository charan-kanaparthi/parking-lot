import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components Routing
import { HttpModule } from '@angular/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'; 
import { OperationsComponent } from './operations.component';

import { OperationsService } from './operations.service';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import {OperationsRoutingModule} from './operations_routing.module';
import{ParkingBookingComponent} from './parking_booking.component';
import {SlotAllotmentComponent} from "./slot_allotment.component";
import {TicketComponent} from "./ticket.component";


@NgModule({
  imports: [
    OperationsRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NgxMyDatePickerModule
  ],
  declarations: [
    OperationsComponent,
    ParkingBookingComponent,
    SlotAllotmentComponent,
    TicketComponent
  ]
  ,
  providers:[OperationsService]
})
export class OperationsModule { }
