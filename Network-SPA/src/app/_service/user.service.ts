import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { PaginatednResult } from '../_models/pagination';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  BASE_URL = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getUsers(page?, itemsPerPage?, userParams?, likeParam?): Observable<PaginatednResult<User[]>> {
    const paginatedResult: PaginatednResult<User[]> = new PaginatednResult<User[]>();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (userParams != null) {
      params = params.append('minAge', userParams.minAge);
      params = params.append('maxAge', userParams.maxAge);
      params = params.append('gender', userParams.gender);
      params = params.append('orderBy', userParams.orderBy);
    }

    if (likeParam === 'Likers') {
      params = params.append('likers', 'true');
    }
    if (likeParam === 'Likees') {
      params = params.append('likees', 'true');
    }

    return this.http.get<User[]>(this.BASE_URL + 'users', { observe: 'response', params})
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagintion = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        })
      );
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
  sendLike(id: number, recipientId: number) {
    return this.http.post(this.BASE_URL + 'users/' + id + '/like/' + recipientId, {});
  }
}
