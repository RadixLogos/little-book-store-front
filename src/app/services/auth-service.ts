import { Injectable, REQUEST } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../entities/LoginRequest';
import { LoginResponse } from '../entities/LoginResponse';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../entities/JwtPayload';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient){}

  apiUrl = 'http://localhost:8080/login'

  login(request: LoginRequest){
    return this.http.post<LoginResponse>(this.apiUrl,request);
  }

  saveToken(token: string){
    localStorage.setItem('bookstore-token',token);
  }
  getToken():string|null{
    return localStorage.getItem('bookstore-token');
  }
  logout(): void{
    localStorage.removeItem('bookstore-token');
  }
  
  isLoggendIn(): boolean{
    return localStorage.getItem('bookstore-token') !== null;
  }

  decodeToken(): JwtPayload| null{
    const token = this.getToken();
    if(!token) return null;
    return jwtDecode<JwtPayload>(token);
  } 

  getUsername(): string | null{
    const payload = this.decodeToken();
     return payload?.sub ?? '';
  }

  getRole(): string | null {
    return this.decodeToken()?.role ?? '';
  }

  isOperator(): boolean {
    return this.getRole() === 'ROLE_OPERATOR'
  }

  isAdmin(): boolean {
    return this.getRole() === 'ROLE_ADMIN'
  }
}
