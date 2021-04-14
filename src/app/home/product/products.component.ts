import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ProductService } from 'src/app/admin/core/product.service';
import { Product } from 'src/app/shopping/core/product-model';
import { ShoppingCart } from 'src/app/shopping/core/shopping-cart';
import { ShoppingCartService } from 'src/app/shopping/core/shopping-cart.service';

@Component({
  selector: 'og-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  shoppingCart: ShoppingCart;
  cartSub: Subscription;
  productSub: Subscription;
  isLoading: boolean;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private cartService: ShoppingCartService
  ) {}

  ngOnInit(): void {
    this.getProducts();
    this.getCart();
  }

  getProducts() {
    this.isLoading = true;
    this.productSub = this.productService
      .getAll()
      .pipe(
        switchMap((products: Product[]) => {
          this.isLoading = false;
          this.filteredProducts = this.products = products;

          return this.activatedRoute.queryParamMap;
        })
      )
      .subscribe((paramMap: ParamMap) => {
        this.category = paramMap.get('category');
        this.applyFilter();
      });
  }

  private applyFilter() {
    this.filteredProducts = this.category
      ? this.products.filter((p) => p.category === this.category)
      : this.products;
  }

  async getCart() {
    this.cartSub = (await this.cartService.getCart()).subscribe((cart) => {
      this.shoppingCart = cart;
    });
  }

  ngOnDestroy(): void {
    this.cartSub.unsubscribe();
    this.productSub.unsubscribe();
  }
}
