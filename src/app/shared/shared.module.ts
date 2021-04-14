import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';

import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';

@NgModule({
  declarations: [ProductCardComponent, ProductQuantityComponent],
  imports: [CommonModule, FormsModule, CustomFormsModule],
  exports: [
    CommonModule,
    FormsModule,
    ProductCardComponent,
    ProductQuantityComponent,
    CustomFormsModule,
  ],
})
export class SharedModule {}
