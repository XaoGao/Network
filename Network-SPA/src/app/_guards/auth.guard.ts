import { AlertifyService } from './../_service/alertify.service';
import { AuthService } from './../_service/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanActivate {

  constructor(private authService: AuthService, private router: Router, private alertify: AlertifyService) { }

  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      return true;
    } else {
      this.alertify.error('You need login in the system');
      this.router.navigate(['/home']);
      return false;
    }
  }
}
