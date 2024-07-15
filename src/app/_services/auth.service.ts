import { BehaviorSubject, map, take } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = environment.authenticateUrl;
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();
  token: string;

  constructor(private http: HttpClient) {}

  login(model: any) {
    const formValues = model.value;
    return this.http.post<User>(this.baseUrl + 'Login', formValues).pipe(
      map((response: User) => {
        console.log(response)
        const user = response;
        if (user) {
          this.setCurrentUser(user);
        }
      })
    );
  }

  setCurrentUser(user: User) {
    user.roles = [];
    this.token = user.token;
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? (user.roles = roles) : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  getDecodedToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }
  getAuthToken() {
    return this.token;
  }
}
