import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import firebase from 'firebase/app';
import { catchError } from 'rxjs/operators';

import { AppUser } from '../models/app-user';
import { NotifyService } from './notify.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: AppUser;

  constructor(private db: AngularFireDatabase, private notify: NotifyService) {}

  update(user: firebase.User) {
    this.db
      .object('/user/' + user.uid)
      .update({
        name: user.displayName,
        email: user.email,
      })
      .then((result) => {
        this.notify.success('User data is succefully saved');
      })
      .catch((error) => {
        this.notify.error(error.message);
      });
  }

  save(userId: string, displayName: string, email: string, isAdmin: boolean) {
    this.db
      .object('/user/' + userId)
      .set({ displayName: displayName, email: email, isAdmin: isAdmin })
      .then((result) => {
        this.notify.success('User data is succefully saved');
      })
      .catch((error) => {
        this.notify.error(error.message);
      });
  }

  get(uid: string): any {
    return this.db
      .object(`user/${uid}`)
      .valueChanges()
      .pipe(catchError((error) => this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error) this.notify.error(error.message);
    return;
  }
}
