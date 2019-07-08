import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../_models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  BASE_URL = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.BASE_URL + 'users');
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.BASE_URL + 'users/' + id);
  }
  updateUser(id: number, user: User) {
    return this.http.put(this.BASE_URL + 'users/' + id, user);
  }
  setMainPhoto(userId: number, id: number) {
    return this.http.post(this.BASE_URL + 'users/' + userId + '/photos/' + id + '/setmain', {});
  }
  deletePhoto(userId: number, id: number) {
    return this.http.delete(this.BASE_URL + 'users/' + userId + '/photos/' + id);
  }
}
