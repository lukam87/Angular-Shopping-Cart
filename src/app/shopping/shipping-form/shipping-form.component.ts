import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ShoppingCart } from '../core/shopping-cart';
import { Shipping } from '../core/shipping-model';
import { Order } from '../core/order';
import { OrderService } from 'src/app/order/core/order.service';
import { AuthService } from 'src/app/auth/core/auth.service';

@Component({
  selector: 'og-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css'],
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input() cart: ShoppingCart;
  userId: string;
  userSub: Subscription;

  shipping: Shipping = {
    name: null,
    address: null,
    addr1: null,
    city: null,
  };

  constructor(
    private orderService: OrderService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getUserId();
  }

  getUserId() {
    this.userSub = this.authService.user$.subscribe((user) => {
      this.userId = user.uid;
    });
  }

  placeOrder(shipping) {
    let order = new Order(this.userId, shipping, this.cart);

    this.orderService.placeOrder(order);

    this.router.navigate(['/order/order-success', this.userId]);
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
