import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { SharedModule } from '../shared/shared.module';
import { ProductFormComponent } from './product-form/product-form.component';

@NgModule({
  declarations: [AdminComponent, ProductFormComponent, AdminProductsComponent],
  imports: [CommonModule, AdminRoutingModule, SharedModule, DataTablesModule],
})
export class AdminModule {}
