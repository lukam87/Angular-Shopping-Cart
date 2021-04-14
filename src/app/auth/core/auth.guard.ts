import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { StorageService } from 'src/app/auth/core/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private storageService: StorageService) {}

  canActivate(route, state: RouterStateSnapshot) {
    let isAutenticated = this.storageService.isloggedIn;

    if (!isAutenticated) {
      this.router.navigate(['/auth/login'], {
        queryParams: { returnUrl: state.url },
      });
    }

    return isAutenticated;
  }
}
