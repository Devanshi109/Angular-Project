import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private users = [
    { username: 'Devanshi', password: '1234' },
    { username: 'Desai', password: 'desai123' },
  ];

  constructor() { }

  authUser = signal<string | null>(localStorage.getItem('user'));

  login(username: string, password: string) {
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem('user', username);
      this.authUser.set(username);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('user');
    this.authUser.set(null);
  }

  isUsernameExist(username: string): boolean {
    return this.users.some(u => u.username === username);
  }
}
