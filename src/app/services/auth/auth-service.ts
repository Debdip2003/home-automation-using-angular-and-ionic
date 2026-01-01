import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/interface/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //injecting the dependencies
  private httpClient = inject(HttpClient);

  //initializing the variables
  user = new BehaviorSubject<User | null>(this.getUser());
  user$ = this.user.asObservable();
  isAuthenticated = signal<boolean>(this.getUser() ? true : false);

  constructor() {}

  //getting the current user value
  getUser(): User | null {
    const user = localStorage.getItem('loggedInUserDetails');
    return user ? JSON.parse(user) : null;
  }

  //setting the user observable
  setUser(userData: User | null) {
    this.user.next(userData);
  }

  loginUser() {
    this.isAuthenticated.set(true);
    return this.httpClient.get<User>('http://localhost:3000/users');
  }

  logoutUSer() {
    this.isAuthenticated.set(false);
    this.setUser(null);
    localStorage.removeItem('loggedInUserDetails');
  }

  addUser(userData: User) {
    this.isAuthenticated.set(true);
    return this.httpClient.post<User>('http://localhost:3000/users', userData);
  }
}
