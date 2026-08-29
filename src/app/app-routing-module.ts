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
import { roleGuard } from './guards/role-guard';
const routes: Routes = [
  {path: '', redirectTo: 'books', pathMatch: 'full'},
  {path : 'books', component: Books},
  {path : 'login', component: Login},
  {path: 'book-details/:id', component: BookDetailsComponent},
  {path: 'book-register', component: BookRegister, canActivate: [authGuard, roleGuard],data:{
    role:['ROLE_ADMIN']
  }},
  {path: 'book-register/:id', component: BookRegister, canActivate: [authGuard, roleGuard],data:{
    role:['ROLE_ADMIN']
  }},
  {path: 'client-register', component: ClientRegister, canActivate: [authGuard, roleGuard],data:{
    role:['ROLE_ADMIN','ROLE_OPERATOR']
  }},
  {path: 'client-selector', component: ClientSelector, canActivate: [authGuard, roleGuard],data:{
    role:['ROLE_ADMIN','ROLE_OPERATOR']
  }},
  {path: 'buy-orders', component: BuyOrdersComponent, canActivate: [authGuard, roleGuard],data:{
    role:['ROLE_ADMIN','ROLE_OPERATOR']
  }},
  {path:'sell-component', component: SellComponent, canActivate: [authGuard, roleGuard],data:{
    role:['ROLE_ADMIN','ROLE_OPERATOR']
  }},
  {path: 'client-selector-general', component: ClientSelectorGeneral, canActivate: [authGuard, roleGuard],data:{
    role:['ROLE_ADMIN','ROLE_OPERATOR']
  }},
  {path: 'editor-register', component: EditorRegisterComponent, canActivate: [authGuard, roleGuard],data:{
    role:['ROLE_ADMIN','ROLE_OPERATOR']
  }},
  {path: 'genre-register', component: GenreRegister, canActivate: [authGuard, roleGuard],data:{
    role:['ROLE_ADMIN','ROLE_OPERATOR']
  }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
