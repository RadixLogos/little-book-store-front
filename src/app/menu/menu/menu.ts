import { Component } from '@angular/core';
import { Book } from '../../entities/book';

@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {

  activeScreen: 'books' | 'register' | 'sell' | 'clientSelector' | 'clientRegister' | 'buyOrders' | 'editor' = 'books';
  mostrarCadastros = false;
  selectedClientId: number | null = null;
  book: Book = {} as Book;

  toggleCadastros() {
    this.mostrarCadastros = !this.mostrarCadastros;
  }

  openScreen(screen: 'books' | 'register' | 'sell' | 'clientSelector' | 'clientRegister' | 'buyOrders' | 'editor') {
    this.activeScreen = screen;
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

  openRegister() {
  this.book = {} as Book;
  this.openScreen('register');
}
}
