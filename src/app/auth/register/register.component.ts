import { Component } from '@angular/core';

import { AuthService } from '../core/auth.service';

@Component({
  selector: 'og-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerFields = {
    name: null,
    email: null,
    password: null,
    isAdmin: false,
  };

  constructor(private authService: AuthService) {}

  register(registerFormData) {
    let { name, email, password, isAdmin } = registerFormData;
    this.authService.registerWithEmailAndPassword(
      name,
      email,
      password,
      isAdmin
    );
  }
}
