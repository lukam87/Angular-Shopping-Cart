import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminComponent } from './admin.component';
import { ProductFormComponent } from './product-form/product-form.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  {
    path: 'products',
    component: AdminProductsComponent,
  },
  {
    path: 'product',
    component: ProductFormComponent,
  },
  {
    path: 'products/:id',
    component: ProductFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
