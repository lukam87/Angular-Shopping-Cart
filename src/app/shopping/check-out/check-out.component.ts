import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ShoppingCart } from '../core/shopping-cart';
import { ShoppingCartService } from '../core/shopping-cart.service';

@Component({
  selector: 'og-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
})
export class CheckOutComponent implements OnInit {
  cart$: Observable<ShoppingCart>;

  constructor(private cartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.getCart();
  }

  async getCart() {
    this.cart$ = await this.cartService.getCart();
  }
}
