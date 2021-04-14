import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';

import { OrderDetail } from '../core/order-detail';
import { OrderService } from '../core/order.service';

@Component({
  selector: 'og-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
})
export class OrderDetailComponent implements OnInit {
  order$: Observable<OrderDetail>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.getOrder();
  }

  getOrder() {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      let key = paramMap.get('key');

      this.order$ = this.orderService.getOrder(key);
    });
  }
}
