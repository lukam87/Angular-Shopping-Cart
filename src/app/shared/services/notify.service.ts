import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotifyService {
  constructor(private toastr: ToastrService) {}

  success(message: string, title?: string) {
    this.toastr.success(message, title);
  }

  warning(message: string, title?: string) {
    this.toastr.warning(message, title);
  }

  info(message: string, title?: string) {
    this.toastr.info(message, title);
  }

  error(message: string, title?: string) {
    this.toastr.error(message, title);
  }
}
