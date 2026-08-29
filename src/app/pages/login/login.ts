import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { LoginRequest } from '../../entities/LoginRequest';
import { LoginResponse } from '../../entities/LoginResponse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  constructor(private authService: AuthService, private router: Router){}

  username = '';

  password = '';


  login(){
    const loginRequest :  LoginRequest ={
      username : this.username,
      password: this.password
    }
    this.authService.login(loginRequest).subscribe({
      next: (response: LoginResponse) =>{
        this.authService.saveToken(response.token);
        this.router.navigate(['/books'])

      },
      error(err) {
        console.log(err);
      },
    })
  }

}
