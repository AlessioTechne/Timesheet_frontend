export interface User {
  userId: number;
  username: string;
  token: string;
  roles: string[];
}

export interface UserRolesDto {
  userId: number;
  userName: string;
  fullName: string;
  email: string;
  roles: string[];
}

export interface UserUpdatesDto {
  userId: number;
  userName: string;
  fullName: string;
  email: string;
  roles: string[];
}

export interface UserNewDto {
  userName: string;
  fullName: string;
  email: string;
  roles: string[];
}
