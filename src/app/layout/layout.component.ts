import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { AuthService } from '../auth/core/auth.service';
import { AppUser } from '../shared/models/app-user';
import { ShoppingCart } from '../shopping/core/shopping-cart';
import { ShoppingCartService } from '../shopping/core/shopping-cart.service';
import { menuItems, ItemAction, MenuItems } from './core/menu-items';

@Component({
  selector: 'og-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit, OnDestroy {
  appUser: AppUser;
  menuItems: MenuItems[] = menuItems;
  isCollapse = true;
  totalCount$: Observable<ShoppingCart>;
  totalCountSub: Subscription;

  constructor(
    private authService: AuthService,
    private cartService: ShoppingCartService
  ) {}

  async ngOnInit() {
    this.authService.appUser$.subscribe((user) => {
      this.appUser = user;
    });

    this.totalCount$ = await this.cartService.getCart();
  }

  getUser() {}

  handleMenuAction(action: ItemAction) {
    if (action === '/logout') {
      this.authService.logout();
      localStorage.removeItem('userId');
    }
  }

  collapse() {
    this.isCollapse = !this.isCollapse;
  }

  ngOnDestroy(): void {
    this.totalCountSub.unsubscribe();
  }
}
