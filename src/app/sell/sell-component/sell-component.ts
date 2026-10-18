import { ChangeDetectorRef, Component, EventEmitter, Input, NgZone, Output } from '@angular/core';
import { LoaderService } from '../../services/loader';
import { BookService } from '../../services/book-service';
import { Book } from '../../entities/book';
import { Order } from '../../entities/Order';
import { BuyOrderRequest } from '../../entities/BuyOrderRequest';
import { Client } from '../../entities/client';
import { ClientService } from '../../services/client-service';
import { BookFilter } from '../../entities/BookFilter';
import { Router } from '@angular/router';
import { ArticleService } from '../../services/article-service';
import { Article } from '../../entities/Article';

@Component({
  selector: 'app-sell-component',
  standalone: false,
  templateUrl: './sell-component.html',
  styleUrl: './sell-component.css',
})
export class SellComponent {
  @Input() clientId!: number | null;

  constructor(
    private bookService : BookService,
    private articleService: ArticleService,
     public loaderService: LoaderService, 
     private zone: NgZone, 
     private cdr: ChangeDetectorRef, 
     private clientService: ClientService, 
     private router: Router){}

  books: any[] = [];
  articles: any[] = [];
  bookFilter: BookFilter = {} as BookFilter;
  articleFilter : Article = {} as Article;
  selectedBook: Book = {} as Book;
  selectedArticle: Article = {} as Book;
  showSaleBox: boolean = false;
  date: Date = new Date();
  quantity: number = 1;
  typePayment: number = 1;
  soldValue: number = 0;
  moneyValue: number = 0;
  pixValue: number = 0;
  buyOrder: BuyOrderRequest= {} as BuyOrderRequest;
  order: Order = {} as Order;
  listOrderBooks: Order[] = [];
  listOrderArticles: Order[] = [];
  client: Client = {} as Client;
  totalPages : number = 0;
  currentPage: number = 0;
  card: string = '';
  
  // Variáveis do Modal
  isModalOpen: boolean = false;
  modalType: 'success' | 'error' = 'success';
  modalTitle: string = '';
  modalMessage: string = '';
  
  ngOnInit(): void {
    this.buyOrder.orders = [];
    this.card = 'book';
    if(this.books.length == 0){
    this.loadBooks();
  }
  if(this.articles.length == 0){
    this.loadArticles()
  }
  
  console.log('Client ID recebido:', this.clientId);
  // Pré-popular o clientId vindo como Input
  if(this.clientId! > 0 && this.clientId != null){
    this.buyOrder.clientId = this.clientId;
  }else{
    this.client.id = null;
    this.client.name = "Cliente anônimo";
    this.client.cellphone = "00000000000";
    this.clientService.saveClient(this.client).subscribe({
      next: (response) => {
        if (response.status === 201) {
          console.log('Cliente anônimo criado com sucesso:', response.body?.id);
          this.buyOrder.clientId = response.body!.id!; // Atribui o ID do cliente criado ao buyOrder
          this.clientId = response.body!.id!; // Atualiza o clientId do componente
        }
      },
      error: (err :  any) => {
        console.error('Erro ao criar cliente anônimo:', err);
      }     
    })
  }
}

loadBooks() {
  this.bookService.getBooks(this.bookFilter,this.currentPage,10)
    .subscribe({
      next: (response) => {
        console.log('Resposta completa da API:', response);
        console.log('Tipo de response:', typeof response);
        console.log('É array?', Array.isArray(response));
        if (response.content) {
          this.zone.run(() => {
            this.books = response.content;
            this.cdr.detectChanges();
          });
        } else if (Array.isArray(response)) {
          this.zone.run(() => {
            this.books = response;
            this.cdr.detectChanges();
          });
        } else {
          console.error('Estrutura de resposta inesperada');
        }
        console.log('Livros carregados:', this.books);
      },
      error: (err) => {
        console.error('Erro ao carregar livros:', err);
        // Opcional: exibir toast ou alerta para o usuário
      }
    });
   
}

loadArticles(){
    this.articleService.getArticles(this.articleFilter,this.currentPage,10)
    .subscribe({
      next: (response) => {
        if (response.content) {
          this.zone.run(() => {
            this.articles = response.content;
            this.cdr.detectChanges();
          });
        } else if (Array.isArray(response)) {
          this.zone.run(() => {
            this.articles = response;
            this.cdr.detectChanges();
          });
        } else {
          console.error('Estrutura de resposta inesperada');
        }
        console.log('Artigos carregados:', this.articles);
      },
      error: (err) => {
        console.error('Erro ao carregar artigos:', err);
        // Opcional: exibir toast ou alerta para o usuário
      }
    });
}

selectCard(selectedCard: string){
  this.card = selectedCard;
}

selectBook(book: any){
  this.selectedBook = book;
  this.showSaleBox = true;
  this.quantity = 1;
  this.typePayment = 1;
  this.soldValue = book.price;
  this.pixValue = book.price;
  this.moneyValue = 0;
  this.order = {} as Order;
  this.order.itemType = "book";
}

selectArticle(article: any){
  this.selectedArticle = article;
  this.showSaleBox = true;
  this.quantity = 1;
  this.typePayment = 1;
  this.soldValue = article.price;
  this.pixValue = article.price;
  this.moneyValue = 0;
  this.order = {} as Order;
  this.order.itemType = "article";
}

closeSaleBox(){
  this.showSaleBox = false;
}

selectPaymentType(type: number){
  this.typePayment = type;
}

selectQuantity(quantity: number){
  this.quantity = quantity;
}

selectClientId(clientId: number){
  this.clientId = clientId;
}

selectSoldValue(soldValue: number){
  if(soldValue === 0){
    soldValue = this.selectedBook.price;
  }
  this.soldValue = soldValue;
}

getStockQuantity(): number{
  if(this.card === 'book'){
    return this.selectedBook.stockQuantity;
  }
  if(this.card === 'article'){
    return this.selectedArticle.stockQuantity;
  }
  else return 0;
}

getItemPrice(): number{
  if(this.card === 'book'){
    return this.selectedBook.price;
  }
  if(this.card === 'article'){
    return this.selectedArticle.price;
  }
  else return 0;
}

getItemName(): string{
  if(this.card === 'book'){
    return this.selectedBook.name;
  }
  if(this.card === 'article'){
    return this.selectedArticle.name;
  }
  else return '';
}

finalizeSale(){
  if(this.clientId != null){
    this.buyOrder.clientId = this.clientId;
  }

  console.log('Client ID para a venda:', this.buyOrder.clientId);
  this.buyOrder.orderDate = new Date();
  
  this.bookService.saveBuyOrder(this.buyOrder).subscribe({
    next: (result:any) => {
      if(result.status === 201){
        this.openModal('success', 'Sucesso!', 'Venda registrada com sucesso!');
        this.closeSaleBox();
        this.voltarPagina();
      } else if(result.status >= 400){
        this.openModal('error', 'Erro na venda', 'Ocorreu um erro ao registrar a venda. Tente novamente.');
      }
    },
    error: (err: any) => {
      console.error('Erro ao finalizar venda:', err);
      this.openModal('error', 'Erro na venda', 'Ocorreu um erro ao registrar a venda. Tente novamente.');
    }
  });
}
registerSale(){
  if (!this.selectedBook?.id && !this.selectedArticle?.id) {
    console.error('Nenhum item selecionado para venda.');
    return;
  }

  if (!this.clientId) {
    this.openModal('error', 'Validação', 'Por favor, selecione um cliente para continuar.');
    return;
  }

  if(this.card === 'book'){
    this.order.itemId = this.selectedBook.id;
  }
  if(this.card === 'article'){
    this.order.itemId = this.selectedArticle.id;
  }
  this.order.quantity = this.quantity;
  this.order.soldValue = this.soldValue || this.selectedBook.price;
  this.order.pixValue = this.pixValue;
  this.order.moneyValue = this.moneyValue;
  this.order.subtotal = this.quantity * (this.soldValue || this.selectedBook.price);
  
  this.buyOrder.orders.push(this.order);
  
  console.log('Venda registrada:', this.order);
  console.log('Pedido de compra:', this.buyOrder);
  this.closeSaleBox();
}
  
  voltarPagina(){
    this.router.navigate(['/books']);
  }

  openModal(type: 'success' | 'error', title: string, message: string) {
    this.modalType = type;
    this.modalTitle = title;
    this.modalMessage = message;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
