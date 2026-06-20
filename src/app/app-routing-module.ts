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
const routes: Routes = [
  {path: '', redirectTo: 'menu', pathMatch: 'full'},
  {path : 'books', component: Books},
  {path: 'book-details/:id', component: BookDetailsComponent},
  {path: 'book-register', component: BookRegister},
  {path: 'client-register', component: ClientRegister},
  {path: 'buy-orders', component: BuyOrdersComponent},
  {path:'menu', component: Menu},
  {path:'sell-component', component: SellComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
