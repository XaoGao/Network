import { AuthService } from './../_service/auth.service';
import { Message } from './../_models/message';
import { AlertifyService } from '../_service/alertify.service';
import { UserService } from '../_service/user.service';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MessagesResolver implements Resolve<Message[]> {
    pageNumber = 1;
    pageSize = 12;
    messageContainer = 'Unread';

    constructor(private userService: UserService,
                private router: Router,
                private alertifyService: AlertifyService,
                private authService: AuthService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
        return this.userService.getMessages(this.authService.decodedToken.nameid,
            this.pageNumber,
            this.pageSize,
            this.messageContainer).pipe(
            catchError(error => {
                this.alertifyService.error('Problem retrieving messages');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
