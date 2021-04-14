import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import firebase from 'firebase/app';

import { UserService } from 'src/app/shared/services/user.service';
import { StorageService } from './storage.service';
import { NotifyService } from 'src/app/shared/services/notify.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<firebase.User>;
  isLoggedIn: boolean;

  constructor(
    private afAuth: AngularFireAuth,
    private userService: UserService,
    private router: Router,
    private storageService: StorageService,
    private notify: NotifyService
  ) {
    this.user$ = afAuth.authState;
  }

  registerWithEmailAndPassword(
    displayName: string,
    email: string,
    password: string,
    isAdmin: boolean
  ) {
    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        if (result) {
          this.userService.save(result.user.uid, displayName, email, isAdmin);
          this.logout();
          this.router.navigate(['/']);
        }
      })
      .catch((error) => {
        this.notify.error(error.message);
      });
  }

  loginWithEmailAndPassword(email: string, password: string) {
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        if (!result) return;
        this.saveUser({
          uid: result.user.uid,
          token: result.user.refreshToken,
        });
      })
      .catch((error) => {
        this.notify.error(error.message);
      });
  }

  logout() {
    this.afAuth.signOut();
    localStorage.removeItem('token');

    this.router.navigate(['/']);
  }

  private saveUser(response) {
    if (!response) return;

    this.storageService.saveUser(response);
    this.router.navigate(['/']);
    return true;
  }

  get appUser$(): Observable<any> {
    return this.user$.pipe(
      switchMap((user) => {
        if (user) return this.userService.get(user.uid);

        return of(null);
      })
    );
  }
}
