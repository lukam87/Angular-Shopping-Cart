import { Component, Input, OnInit } from '@angular/core';

import { Category } from 'src/app/shared/models/category-model';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'og-products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.css'],
})
export class ProductsFilterComponent implements OnInit {
  @Input() category: string;
  categories: Category[];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getAll().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }
}
