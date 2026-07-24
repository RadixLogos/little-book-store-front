import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../entities/book';
import { OrderBook } from '../entities/OrderBook';
import { BuyOrderRequest } from '../entities/BuyOrderRequest';
import { BuyOrderResponse } from '../entities/BuyOrderResponse';
import { BookFilter } from '../entities/BookFilter';

@Injectable({
  providedIn: 'root',
})
export class BookService {

  private apiUrl = 'http://localhost:8080/'

  constructor(private http: HttpClient){}

  getBooks(filter: BookFilter,currentPage:number, size:number){
    return this.http.get<any>(`${this.apiUrl}books?name=${filter.name||''}&editorId=${filter.editorId||''}&genreId=${filter.genreId||''}&page=${currentPage}&size=${size}`);
  }

updateBook(book: Book){ 
  return this.http.put(`${this.apiUrl}books/${book.id}`, book, {observe: 'response'});
}
  getBookById(id: number){
    return this.http.get<Book>(`${this.apiUrl}books/${id}`)
  }

  saveBook(book: Book){
    return this.http.post<Book>(`${this.apiUrl}books`,book,{observe : 'response'});
  }

  saveBuyOrder(buyOrder : BuyOrderRequest){
    return this.http.post(this.apiUrl+"buy-orders",buyOrder, {observe: 'response'});
  }

  getAllBuyOrders(){
    return this.http.get<BuyOrderResponse[]>(`${this.apiUrl}buy-orders`);
  }

  updateBuyOrder(buyOrder: BuyOrderRequest){
    return this.http.put(`${this.apiUrl}buy-orders/${buyOrder.id}`, buyOrder, {observe: 'response'});
  }


  deleteBook(id: number){
    return this.http.delete(`${this.apiUrl}books/${id}`, {observe: 'response'});
  }

  deleteBuyOrder(id: number){
    return this.http.delete(`${this.apiUrl}buy-orders/${id}`, {observe: 'response'});
  }

  getImgUrl(imgFormFile : FormData){
    return this.http.post(this.apiUrl+"images/upload",imgFormFile, {observe: 'response'});
  }

}
