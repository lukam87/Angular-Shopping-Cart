import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrdersComponent } from './orders/orders.component';

@NgModule({
  declarations: [
    OrderComponent,
    OrderSuccessComponent,
    OrderDetailComponent,
    OrdersComponent,
  ],
  imports: [CommonModule, DataTablesModule, OrderRoutingModule],
})
export class OrderModule {}
