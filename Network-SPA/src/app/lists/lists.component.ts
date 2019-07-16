import { AlertifyService } from './../_service/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../_service/user.service';
import { AuthService } from './../_service/auth.service';
import { PaginatednResult } from './../_models/pagination';
import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { Pagination } from '../_models/pagination';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  users: User[];
  pagination: Pagination;
  likesParam: string;

  constructor(private authService: AuthService,
              private userService: UserService,
              private route: ActivatedRoute,
              private alertifyService: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data.users.result;
      // console.log(data.users.result)
      this.pagination = data.users.pagintion;
    });
    this.likesParam = 'Likers';
  }

  loadUsers() {
    console.log(this.pagination);
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, null , this.likesParam)
      .subscribe((res: PaginatednResult<User[]>) => {
      this.users = res.result;
      this.pagination = res.pagintion;
    },
      error => {
        this.alertifyService.error(error);
      }
    );
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

}
