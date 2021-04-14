import { Component } from '@angular/core';

import { AuthService } from '../core/auth.service';

@Component({
  selector: 'og-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginFields = {
    email: null,
    password: null,
  };

  constructor(private authService: AuthService) {}

  login(loginFormData) {
    let { email, password } = loginFormData;

    this.authService.loginWithEmailAndPassword(email, password);
  }
}
