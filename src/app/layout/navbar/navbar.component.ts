import { Component, Input, Output, EventEmitter } from '@angular/core';

import { MenuItems } from '../core/menu-items';

@Component({
  selector: 'og-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  @Input() appUser;
  @Input() menuItems: MenuItems[];
  @Output() logout = new EventEmitter();

  constructor() {}

  linkAction(action) {
    this.logout.emit(action);
  }
}
