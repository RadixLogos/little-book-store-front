import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';

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
import { ClientSelectorGeneral } from './pages/client-selector-general/client-selector-general';
import { EditorRegisterComponent } from './pages/editor-register/editor-register';
import { GenreRegister } from './genre/genre-register/genre-register';
import { loadingInterceptor } from './interceptors/loading-interceptor';
import { Loader } from './shared/loader/loader';

@NgModule({
  declarations: [
    App,
    Books,
    BookRegister,
    BookDetailsComponent,
    BuyOrdersComponent,
    Menu,
    SellComponent,
    ModalAlert,
    ClientSelector,
    ClientRegister,
    ClientSelectorGeneral,
    EditorRegisterComponent,
    GenreRegister,
    Loader,
  ],
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
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([loadingInterceptor])),
  ],
  bootstrap: [App],
})
export class AppModule {}
