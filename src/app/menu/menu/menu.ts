import { Component } from '@angular/core';
import { Book } from '../../entities/book';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {

  constructor(private authService: AuthService, private router: Router){}
  activeScreen: 'books' | 'register' | 'sell' | 'clientSelector' | 'clientRegister' | 'buyOrders' | 'editor' | 'genre' | 'login' = 'books';
  protectedScreen : string = '';
  mostrarCadastros = false;
  selectedClientId: number | null = null;
  book: Book = {} as Book;


  toggleCadastros() {
    this.mostrarCadastros = !this.mostrarCadastros;
  }

  openScreen(screen: String) {
    this.router.navigate([screen])
    this.mostrarCadastros = false;
  }
  
  receive(book: Book){
    this.book = book;
    this.openScreen('register');
  }
  onClientSelected(clientId: number) {
    this.selectedClientId = clientId;
    this.openScreen('sell');
  }

  isAdmin(): boolean{
    return this.authService.isAdmin();
  }
  isOperator(): boolean{
    return this.authService.isOperator();
  }

  isLogged(): boolean{
    return this.authService.isLoggendIn();
  }

  logout(){
    this.authService.logout();
  }
}
