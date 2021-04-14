import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/auth/core/auth.service';
import { ShoppingCart } from '../core/shopping-cart';
import { ShoppingCartService } from '../core/shopping-cart.service';

@Component({
  selector: 'og-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  cart$: Observable<ShoppingCart>;
  isLoading: boolean;

  constructor(
    private cartService: ShoppingCartService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getCart();
  }

  checkOut() {
    this.authService.user$.subscribe((user) => {
      if (!user) {
        localStorage.setItem('returnUrl', this.router.url);
        this.router.navigate(['/auth/login']);
      } else {
        this.router.navigate(['/shopping/check-out']);
      }
    });
  }

  clearCart() {
    this.cartService.clearCart();
  }

  async getCart() {
    this.cart$ = await this.cartService.getCart();
  }
}
