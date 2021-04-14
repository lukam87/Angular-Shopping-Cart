import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  get isloggedIn() {
    return !!localStorage.getItem('loggedUser');
  }

  get userId() {
    let id = JSON.parse(localStorage.getItem('loggedUser'));
    if (!id) return;

    return id.uid;
  }

  get token() {
    let userToken = JSON.parse(localStorage.getItem('loggedUser'));
    if (!userToken) return;

    return userToken.token;
  }

  saveUser(data: Object) {
    localStorage.setItem('loggedUser', JSON.stringify({ ...data }));
  }
}
