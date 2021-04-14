import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';

import { StorageService } from 'src/app/auth/core/storage.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { Product } from 'src/app/shopping/core/product-model';
import { ProductService } from '../core/product.service';

@Component({
  selector: 'og-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit, OnDestroy {
  categoriesSub: Subscription;
  productSub: Subscription;
  categories;
  product: Product = {
    key: null,
    title: null,
    price: null,
    category: null,
    imageUrl: null,
  };
  mode = 'create';
  btn = 'Save';
  id: string;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.editProduct();
  }

  getCategories() {
    this.categoriesSub = this.categoryService
      .getAll()
      .subscribe((categories) => {
        this.categories = categories;
      });
  }

  editProduct() {
    this.productSub = this.activatedRoute.paramMap.subscribe(
      (paramMap: ParamMap) => {
        if (paramMap.has('id')) {
          this.id = paramMap.get('id');
          this.mode = 'edit';
          this.btn = 'Edit';
          this.productService.getProduct(this.id).subscribe((p: any) => {
            this.product = p;
          });
        } else {
          this.mode = 'create';
          this.id = null;
        }
      }
    );
  }

  deleteProduct() {
    if (!confirm('Are you sure you want to delete this product?')) return;
    this.productService.deleteProduct(this.id);
  }

  onSubmit(product) {
    if (this.mode === 'create') {
      let userId = this.storageService.userId;
      this.productService.saveProduct(product, userId);
    } else {
      this.productService.updateProduct(this.id, product);
    }
  }

  ngOnDestroy(): void {
    this.categoriesSub.unsubscribe();
    this.productSub.unsubscribe();
  }
}
