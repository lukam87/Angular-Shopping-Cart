import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { catchError, map } from 'rxjs/operators';

import { NotifyService } from 'src/app/shared/services/notify.service';
import { ShoppingCartService } from '../../shopping/core/shopping-cart.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private db: AngularFireDatabase,
    private cartService: ShoppingCartService,
    private notify: NotifyService
  ) {}

  getOrdersByUserId(userId: string) {
    return this.db
      .object(`/orders`)
      .valueChanges()
      .pipe(
        map((orders) => {
          let orderById = [];
          Object.keys(orders).forEach((key) => {
            if (orders[key].userId === userId) {
              orderById.push({
                key: key,
                name: orders[key].shipping.name,
                date: orders[key].datePlaced,
              });
            }
          });
          return orderById;
        }),
        catchError((error) => this.handleError)
      );
  }

  getOrder(key: string) {
    return this.db
      .object('/orders/' + key)
      .valueChanges()
      .pipe(
        map((order: any) => {
          return order.items;
        }),
        catchError((error) => this.handleError)
      );
  }

  placeOrder(order) {
    this.db
      .list('/orders')
      .push(order)
      .then((result) => {
        this.notify.success('Order is send succesfully');
      })
      .catch((error) => {
        this.notify.error('Error occures, please try lather');
      });
    this.cartService.clearCart();
  }

  private handleError(error: HttpErrorResponse) {
    if (error) this.notify.error(error.message);
    return;
  }
}
