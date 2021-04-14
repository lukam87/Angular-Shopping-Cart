import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

import { StorageService } from 'src/app/auth/core/storage.service';
import { NotifyService } from 'src/app/shared/services/notify.service';
import { Product } from 'src/app/shopping/core/product-model';
import { ProductService } from '../core/product.service';

@Component({
  selector: 'og-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent
  implements OnInit, OnDestroy, AfterViewInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  productId: string;
  search: string;
  productsSub: Subscription;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  isLoading: boolean;

  constructor(
    private productService: ProductService,
    private storageService: StorageService,
    private notify: NotifyService
  ) {}

  ngOnInit(): void {
    this.getProducts();
    this.tableOptions();
  }

  tableOptions() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      lengthMenu: [5, 10, 15],
      searching: false,
    };
  }

  filter(query: string) {
    this.filteredProducts = query
      ? this.products.filter((p) =>
          p.title.toLowerCase().match(query.toLowerCase())
        )
      : this.products;
  }

  getProducts() {
    this.isLoading = true;
    let userId = this.storageService.userId;
    this.productsSub = this.productService.getUserProducts(userId).subscribe(
      (products) => {
        this.isLoading = false;
        this.filteredProducts = this.products = products;
      },
      (error) => {
        this.notify.error('Unexpected error, please try lather!');
      }
    );
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    this.productsSub.unsubscribe();
  }
}
