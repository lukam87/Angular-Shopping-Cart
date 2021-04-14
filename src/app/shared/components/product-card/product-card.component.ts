import { Component, Input } from '@angular/core';

import { Product } from 'src/app/shopping/core/product-model';
import { ShoppingCart } from 'src/app/shopping/core/shopping-cart';
import { ShoppingCartService } from 'src/app/shopping/core/shopping-cart.service';

@Component({
  selector: 'og-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input() product: Product;
  @Input() shoppingCart: ShoppingCart;
  @Input() actions = true;

  constructor(private cartService: ShoppingCartService) {}

  addToCart() {
    this.cartService.addToCart(this.product);
  }
}
