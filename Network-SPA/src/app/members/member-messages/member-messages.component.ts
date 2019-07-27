import { AlertifyService } from './../../_service/alertify.service';
import { UserService } from './../../_service/user.service';
import { Message } from './../../_models/message';
import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/_service/auth.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @Input() recipientId: number;
  messages: Message[];
  newMessage: any = {};
  constructor(private authService: AuthService,
              private userService: UserService,
              private alertifyService: AlertifyService) { }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    const currentUserId = +this.authService.decodedToken.nameid;
    this.userService.getMessagesThread(this.authService.decodedToken.nameid, this.recipientId).pipe(
      tap(messages => {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < messages.length; i++) {
          if (messages[i].isRead === false && messages[i].recipientId === currentUserId) {
            this.userService.markAsRead(currentUserId, messages[i].id);
          }
        }
      })
    ).subscribe(messages => {
      this.messages = messages;
    }, error => {
      this.alertifyService.error(error);
    });
  }

  sendMessage() {
    this.newMessage.recipientId = this.recipientId;
    this.userService.sendMessage(this.authService.decodedToken.nameid, this.newMessage).subscribe(
      (message: Message) => {
        this.messages.unshift(message);
        this.newMessage.content = '';
    }, error => {
      this.alertifyService.error(error);
    });
  }

}
