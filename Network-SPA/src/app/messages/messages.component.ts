import { AlertifyService } from './../_service/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../_service/auth.service';
import { UserService } from './../_service/user.service';
import { Pagination, PaginatednResult } from './../_models/pagination';
import { Component, OnInit } from '@angular/core';
import { Message } from '../_models/message';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  pagination: Pagination;
  messageContainer = 'Unread';
  constructor(private userService: UserService,
              private authService: AuthService, private route: ActivatedRoute, private alertifyService: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.messages = data.messages.result;
      this.pagination = data.messages.pagintion;
    });
  }

  loadMessages() {
    this.userService.getMessages(this.authService.decodedToken.nameid,
                                this.pagination.currentPage,
                                this.pagination.itemsPerPage, this.messageContainer).subscribe((res: PaginatednResult<Message[]>) => {
          this.messages = res.result;
          this.pagination = res.pagintion;
      }, error => {
        this.alertifyService.error(error);
      });
  }

  deleteMessages(id: number) {
    this.alertifyService.confirm('Are you sure want to delete the message', () => {
      this.userService.deleteMessage(id, this.authService.decodedToken.nameid).subscribe(() => {
        this.messages.splice(this.messages.findIndex(m => m.id === id), 1);
        this.alertifyService.success('Messages has been deleted');
      }, error => {
        this.alertifyService.error('Failed to delete the message');
      });
    });
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }
}
