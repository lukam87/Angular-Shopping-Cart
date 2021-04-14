import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';

import { NotifyService } from 'src/app/shared/services/notify.service';
import { Product } from './product-model';
import { ShoppingCart } from './shopping-cart';
import { ShoppingCartItem } from './shopping-cart-item';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase, private notify: NotifyService) {}

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db
      .object('/shopping-carts/' + cartId)
      .valueChanges()
      .pipe(
        map((cart: any) => {
          if (!cart) return;
          return new ShoppingCart(cart.items);
        }),
        catchError((error) => this.handleError)
      );
  }

  async addToCart(product: Product) {
    let cartId = await this.getOrCreateCartId();

    this.getItem(cartId, product.key)
      .valueChanges()
      .pipe(take(1))
      .subscribe(
        (item: ShoppingCartItem) => {
          this.db.object('/shopping-carts/' + cartId + '/items/' + product.key);

          if (!item) return this.setItemToCart(product, cartId, product.key);

          this.cartQuantity(item, cartId, product.key);
        },
        (error) => {
          this.notify.error(error.message);
        }
      );
  }

  async removeFromCart(product: Product, change: boolean) {
    let cartId = await this.getOrCreateCartId();

    this.getItem(cartId, product.key)
      .valueChanges()
      .pipe(take(1))
      .subscribe(
        (item: ShoppingCartItem) => {
          this.cartQuantity(item, cartId, product.key, change);
        },
        (error) => {
          this.notify.error(error.message);
        }
      );
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime(),
    });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();

    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private setItemToCart(product: Product, cartId: string, productId: string) {
    this.db.object('/shopping-carts/' + cartId + '/items/' + productId).set({
      title: product.title,
      imageUrl: product.imageUrl,
      price: product.price,
      quantity: 1,
    });
  }

  private cartQuantity(
    item: ShoppingCartItem,
    cartId: string,
    productId: string,
    change?: boolean
  ) {
    if (change === true) {
      if (item.quantity === 1) {
        this.db
          .object('/shopping-carts/' + cartId + '/items/' + productId)
          .remove()
          .catch((error) => {
            this.notify.warning(error.message);
          });
      } else {
        this.db
          .object('/shopping-carts/' + cartId + '/items/' + productId)
          .update({ quantity: item.quantity - 1 })
          .catch((error) => {
            this.notify.success(error.message);
          });
      }
    } else {
      this.db
        .object('/shopping-carts/' + cartId + '/items/' + productId)
        .update({ quantity: item.quantity + 1 })
        .catch((error) => {
          this.notify.success(error.message);
        });
    }
  }

  private handleError(error: HttpErrorResponse) {
    if (error) this.notify.error(error.message);
    return;
  }
}
