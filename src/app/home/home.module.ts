import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { ProductsComponent } from './product/products.component';
import { ProductsFilterComponent } from './products-filter/products-filter.component';

@NgModule({
  declarations: [HomeComponent, ProductsComponent, ProductsFilterComponent],
  imports: [CommonModule, HomeRoutingModule, SharedModule],
})
export class HomeModule {}
