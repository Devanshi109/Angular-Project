import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { AuthResponse, SignupData } from '../interfaces/movie';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authServerPath = 'http://localhost:5566/api/v1/auth';
  private signupData: SignupData = {};
  private currentUser: string | null = null;
  
  constructor(private http: HttpClient, private router: Router) {
    this.loadCurrentUser();
  }
  
  login(email: string, password: string): Observable<AuthResponse> {
    const loginData = { email, password };
    
    return this.http.post<AuthResponse>(`${this.authServerPath}/signin`, loginData).pipe(
      tap((response) => {
        this.storeToken(response.accessToken);
        const decodedToken: any = jwtDecode(response.accessToken);
        this.currentUser = decodedToken.username;
        this.storeUsername(this.currentUser);
        console.log('Login successful');
        this.router.navigate(['/movies']);
      }),
      catchError((error) => {
        console.error('Error in login:', error);
        return throwError(() => new Error('Login failed! Please try again.'));
      })
    );
  }

  getCurrentUser(): string | null {
    return this.currentUser;
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('current_user');
    console.log('Logged out successfully');
    this.currentUser = null; 
    this.router.navigate(['/login']);
  }
  
  private storeToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  private storeUsername(username: string | null) {
    if (username) {
      localStorage.setItem('current_user', username);
    } else {
      localStorage.removeItem('current_user');
    }
  }

  private loadCurrentUser() {
    const storedUsername = localStorage.getItem('current_user');
    if (storedUsername) {
      this.currentUser = storedUsername;
    }
  }
  
  addSignupData(key: keyof SignupData, value: any) {
    this.signupData[key] = value;
  }
  
  signup(): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.authServerPath}/signup`, this.signupData).pipe(
      tap((response) => {
        this.storeToken(response.accessToken); 
        const decodedToken: any = jwtDecode(response.accessToken);
        this.currentUser = decodedToken.username;
        this.storeUsername(this.currentUser);
        console.log('Signup successful');
        this.router.navigate(['/home']); 
      }),
      catchError((error) => {
        console.error('Error in signup:', error);
        return throwError(() => new Error('Signup failed! Please try again.'));
      })
    );
  }
  
}


  