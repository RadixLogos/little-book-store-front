import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Books } from './pages/books/books';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookRegister } from './pages/book-register/book-register';
import { BookDetailsComponent } from './pages/book-details/book-details';
import { BuyOrdersComponent } from './pages/buy-orders/buy-orders';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { Menu } from './menu/menu/menu';
import { SellComponent } from './sell/sell-component/sell-component';
import { ModalAlert } from './shared/modal-alert/modal-alert';
import { ClientSelector } from './pages/client-selector/client-selector';
import { ClientRegister } from './pages/client-register/client-register';

@NgModule({
  declarations: [App, Books, BookRegister, BookDetailsComponent, BuyOrdersComponent, Menu, SellComponent, ModalAlert, ClientSelector, ClientRegister],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
