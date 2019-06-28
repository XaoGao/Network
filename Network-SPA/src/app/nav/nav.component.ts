import { AlertifyService } from './../_service/alertify.service';
import { AuthService } from './../_service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  constructor(public authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
  }
  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('logged is successfuly');
    }, error => {
      this.alertify.error(error);
    }, () => {
      this.router.navigate(['/members']);
    });
  }
  loggedIn(): boolean {
    return this.authService.loggedIn();
  }
  logout(): void {
    localStorage.removeItem('token');
    this.alertify.message('Logged  out');
    this.router.navigate(['/home']);
  }
}
