import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminGuard } from '../admin/core/admin.guard';
import { AuthGuard } from '../auth/core/auth.guard';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { OrderComponent } from './order.component';

const routes: Routes = [
  { path: 'my/orders', component: OrderComponent, canActivate: [AuthGuard] },
  {
    path: 'admin/orders',
    component: OrderComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'order-success/:id',
    component: OrderSuccessComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'details/:key',
    component: OrderDetailComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule {}
