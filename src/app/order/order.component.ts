import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { StorageService } from '../auth/core/storage.service';
import { OrderTable } from './core/order-table';
import { OrderService } from './core/order.service';

@Component({
  selector: 'og-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit, OnDestroy {
  orders: OrderTable[];
  ordersSub: Subscription;
  isLoading: boolean;

  constructor(
    private orderService: OrderService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.getOrderByUserId();
  }

  getOrderByUserId() {
    this.isLoading = true;
    let userId = this.storageService.userId;
    this.ordersSub = this.orderService
      .getOrdersByUserId(userId)
      .subscribe((orders) => {
        this.isLoading = false;
        this.orders = orders;
      });
  }

  ngOnDestroy(): void {
    this.ordersSub.unsubscribe();
  }
}
