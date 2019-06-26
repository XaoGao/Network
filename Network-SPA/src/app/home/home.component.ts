import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  values: any;
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }
  registerToggle() {
    this.registerMode = true;
  }
  canselRegisterMode(registerMode: boolean) {
    this.registerMode = registerMode;
  }
}
