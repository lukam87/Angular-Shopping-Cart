import { Component, Input } from '@angular/core';

import { ShoppingCart } from '../core/shopping-cart';

@Component({
  selector: 'og-shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css'],
})
export class ShoppingCartSummaryComponent {
  @Input() cart: ShoppingCart;

  constructor() {}
}
