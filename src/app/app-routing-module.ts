import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookService } from './services/book-service';
import { Books } from './pages/books/books';
import { BookRegister } from './pages/book-register/book-register';
import { BookDetailsComponent } from './pages/book-details/book-details';
import { BuyOrdersComponent } from './pages/buy-orders/buy-orders';
import { Menu } from './menu/menu/menu';
import { SellComponent } from './sell/sell-component/sell-component';
import { ClientRegister } from './pages/client-register/client-register';
import { ClientSelectorGeneral } from './pages/client-selector-general/client-selector-general';
import { EditorRegisterComponent } from './pages/editor-register/editor-register';
import { GenreRegister } from './genre/genre-register/genre-register';
import { authGuard } from './guards/auth-guard';
import { Login } from './pages/login/login';
import { ClientSelector } from './pages/client-selector/client-selector';
const routes: Routes = [
  {path: '', redirectTo: 'books', pathMatch: 'full'},
  {path : 'books', component: Books},
  {path : 'login', component: Login},
  {path: 'book-details/:id', component: BookDetailsComponent},
  {path: 'book-register', component: BookRegister},
  {path: 'book-register/:id', component: BookRegister},
  {path: 'client-register', component: ClientRegister},
  {path: 'client-selector', component: ClientSelector},
  {path: 'buy-orders', component: BuyOrdersComponent},
  {path:'menu', component: Menu},
  {path:'sell-component', component: SellComponent},
  {path: 'client-selector-general', component: ClientSelectorGeneral},
  {path: 'editor-register', component: EditorRegisterComponent},
  {path: 'genre-register', component: GenreRegister}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
