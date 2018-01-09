import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OperationsComponent } from './operations.component';
import{ParkingBookingComponent} from './parking_booking.component';
import {SlotAllotmentComponent} from "./slot_allotment.component";
import {TicketComponent} from "./ticket.component";


const routes: Routes = [
  {
    path: '',
    component: OperationsComponent,
    data: {
      title: 'Operations'
    },
    children: [
       {
        path: 'parking_booking',
        component:ParkingBookingComponent,
        data: {
          title: 'ParkingBooking'
        }
      },      
      {
        path: 'slot_allotment',
        component:SlotAllotmentComponent,
        data: {
          title: 'SlotAllotment'
        }
      },
       {
        path: 'ticket',
        component:TicketComponent,
        data: {
          title: 'Ticket'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationsRoutingModule {}
