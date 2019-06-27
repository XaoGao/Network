import { AlertifyService } from './../_service/alertify.service';
import { AuthService } from './../_service/auth.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() valuesFromHome: any;
  @Output() cancelRegiter = new EventEmitter();
  model: any = {};
  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }
  register() {
    this.authService.register(this.model).subscribe(() => {
      this.alertify.success('registration is successful');
    }, error => {
      this.alertify.error(error);
    });
  }
  cansel() {
    this.cancelRegiter.emit(false);
  }
}
