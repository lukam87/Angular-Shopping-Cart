import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { StorageService } from './auth/core/storage.service';

@Component({
  selector: 'og-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(public router: Router, private storageService: StorageService) {}

  redirectUser() {
    let isLoggedIn = this.storageService.isloggedIn;

    if (!isLoggedIn) return;

    let returnUrl = localStorage.getItem('returnUrl');
    if (!returnUrl) return;

    localStorage.removeItem('returnUrl');
    this.router.navigateByUrl(returnUrl);
  }
}
