import { AlertifyService } from './../../_service/alertify.service';
import { UserService } from './../../_service/user.service';
import { AuthService } from './../../_service/auth.service';
import { User } from './../../_models/user';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() user: User;

  constructor(private authService: AuthService, private userService: UserService, private alertifyService: AlertifyService) { }

  ngOnInit() {
  }
  seendLike(id: number) {
    this.userService.sendLike(this.authService.decodedToken.nameid, id).subscribe((date) => {
      this.alertifyService.success('You have liked:' + this.user.knownAs);
    }, error => {
      this.alertifyService.error(error);
    });
  }

}
