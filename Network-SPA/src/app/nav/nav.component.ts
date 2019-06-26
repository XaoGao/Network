import { AuthService } from './../_service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  login() {
    this.authService.login(this.model).subscribe(next => {
      console.log('logged is successfuly');
    }, error => {
      console.log('failed in login');
    });
  }
  loggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
  logout(): void {
    localStorage.removeItem('token');
    console.log('Logged  out');
  }
}
