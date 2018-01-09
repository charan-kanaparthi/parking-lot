import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';
import { DashboardService } from 'app/dashboard/dashboard.service';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(DashboardRoutes), NgxChartsModule],
  declarations: [DashboardComponent],
  providers:[DashboardService]
})

export class DashboardModule {}
