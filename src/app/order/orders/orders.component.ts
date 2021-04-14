import { Component, Input, OnInit } from '@angular/core';

import { OrderTable } from '../core/order-table';

@Component({
  selector: 'og-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  @Input() orders: OrderTable[];

  constructor() {}

  ngOnInit(): void {}
}
