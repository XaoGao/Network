import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from './../../_service/alertify.service';
import { UserService } from './../../_service/user.service';
import { User } from './../../_models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  users: User[];

  constructor(private userService: UserService, private alertifyService: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data.users;
    });
  }

  // loadUsers() {
  //   this.userService.getUsers().subscribe((users: User[]) => {
  //     this.users = users;
  //   },
  //     error => {
  //       this.alertifyService.error(error);
  //     }
  //   );
  // }
}
