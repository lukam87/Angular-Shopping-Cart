import { Component, Input } from '@angular/core';

import { Product } from 'src/app/shopping/core/product-model';
import { ShoppingCart } from 'src/app/shopping/core/shopping-cart';
import { ShoppingCartService } from 'src/app/shopping/core/shopping-cart.service';

@Component({
  selector: 'og-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css'],
})
export class ProductQuantityComponent {
  @Input() product: Product;
  @Input() shoppingCart: ShoppingCart;

  constructor(private cartService: ShoppingCartService) {}

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart(change?: boolean) {
    this.cartService.removeFromCart(this.product, (change = true));
  }
}
