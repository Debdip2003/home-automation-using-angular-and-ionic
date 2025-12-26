import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from 'src/app/interface/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //injecting the dependencies
  private httpClient = inject(HttpClient);

  //initializing the variables
  user: User | null = null;

  constructor() {}

  loginUser() {
    return this.httpClient.get<User>('http://localhost:3000/users');
  }

  addUser(userData: User) {
    return this.httpClient.post<User>('http://localhost:3000/users', userData);
  }
}
