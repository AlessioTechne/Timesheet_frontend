import {
  User,
  UserNewDto,
  UserRolesDto,
  UserUpdatesDto,
} from '../_models/user';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RolesDto } from '../_models/rolesDto';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private baseUrl: string = environment.apiUrl+ 'admin/';

  constructor(private http: HttpClient) {}

  getUsersWithRoles() {
    return this.http.get<UserRolesDto[]>(
      this.baseUrl + 'users-with-roles'
    );
  }
  getUserWithRoles(id: number) {
    return this.http.get<UserRolesDto>(
      this.baseUrl + 'user-with-roles/' + id
    );
  }

  updateUserWithRoles(userDto: UserUpdatesDto) {
    return this.http.put<string[]>(this.baseUrl + 'edit-roles', userDto);
  }

  createUserWithRoles(userDto: UserNewDto) {
    return this.http.post<string>(this.baseUrl + 'new-user', userDto);
  }

  deleteUser(username: number) {
    return this.http.delete(this.baseUrl + username);
  }

  getRoles() {
    return this.http.get<RolesDto[]>(this.baseUrl + 'roles');
  }
}
