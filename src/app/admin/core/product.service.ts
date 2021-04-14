import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';

import { NotifyService } from 'src/app/shared/services/notify.service';
import { Product } from 'src/app/shopping/core/product-model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private db: AngularFireDatabase,
    private router: Router,
    private notify: NotifyService
  ) {}

  saveProduct(product: Product, userId: string) {
    this.db
      .list('products')
      .push({ product, userId })
      .then((result) => {
        this.notify.success('Product is successfully added');
      })
      .catch((error) => {
        this.notify.success(error.message);
      });
    this.router.navigate(['/admin/products']);
  }

  updateProduct(productId: string, product: Product) {
    this.db
      .object('/products/' + productId)
      .update({ product })
      .then((result) => {
        this.notify.success('Product is successfully updated');
      })
      .catch((error) => {
        this.notify.success(error.message);
      });
    this.router.navigate(['/admin/products']);
  }

  getAll() {
    return this.db
      .object('products')
      .valueChanges()
      .pipe(
        map((products: any) => {
          let allProducts = [];
          Object.keys(products).forEach((key) => {
            allProducts.push({
              key: key,
              ...products[key].product,
            });
          });
          return allProducts;
        }),
        catchError((error) => this.handleError)
      );
  }

  getUserProducts(userid: string) {
    return this.db
      .object('products')
      .valueChanges()
      .pipe(
        map((products: any) => {
          let getProducts = [];
          Object.keys(products).forEach((key) => {
            if (products[key].userId === userid) {
              getProducts.push({
                key: key,
                ...products[key].product,
              });
            }
          });
          return getProducts;
        }),
        catchError((error) => this.handleError)
      );
  }

  getProduct(productId: string) {
    return this.db
      .object('/products/' + productId)
      .valueChanges()
      .pipe(
        map((products: any) => products.product),
        catchError((error) => this.handleError)
      );
  }

  deleteProduct(productId: string) {
    this.db
      .object('/products/' + productId)
      .remove()
      .then((result) => {
        this.notify.info('Product is successfully deleted');
      })
      .catch((error) => {
        this.notify.success(error.message);
      });
    this.router.navigate(['/admin/products']);
  }

  private handleError(error: HttpErrorResponse) {
    if (error) this.notify.error(error.message);
    return;
  }
}
