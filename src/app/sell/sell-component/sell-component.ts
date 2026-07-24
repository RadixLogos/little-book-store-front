import { ChangeDetectorRef, Component, EventEmitter, Input, NgZone, Output } from '@angular/core';
import { LoaderService } from '../../services/loader';
import { BookService } from '../../services/book-service';
import { Book } from '../../entities/book';
import { OrderBook } from '../../entities/OrderBook';
import { BuyOrderRequest } from '../../entities/BuyOrderRequest';
import { Client } from '../../entities/client';
import { ClientService } from '../../services/client-service';
import { BookFilter } from '../../entities/BookFilter';

@Component({
  selector: 'app-sell-component',
  standalone: false,
  templateUrl: './sell-component.html',
  styleUrl: './sell-component.css',
})
export class SellComponent {
  @Input() clientId!: number | null;
  @Output() voltar = new EventEmitter<void>();

  constructor(private service : BookService, public loaderService: LoaderService, private zone: NgZone, private cdr: ChangeDetectorRef, private clientService: ClientService){}

  books: any[] = [];
  bookFilter: BookFilter = {} as BookFilter;
  selectedBook: Book = {} as Book;
  showSaleBox: boolean = false;
  date: Date = new Date();
  quantity: number = 1;
  typePayment: number = 1;
  soldValue: number = 0;
  moneyValue: number = 0;
  pixValue: number = 0;
  buyOrder: BuyOrderRequest= {} as BuyOrderRequest;
  orderBook: OrderBook = {} as OrderBook;
  listOrderBooks: OrderBook[] = [];
  client: Client = {} as Client;
  totalPages : number = 0;
  currentPage: number = 0;
  
  // Variáveis do Modal
  isModalOpen: boolean = false;
  modalType: 'success' | 'error' = 'success';
  modalTitle: string = '';
  modalMessage: string = '';
  
  ngOnInit(): void {
  if(this.books.length == 0){
    this.loadBooks();
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
  this.service.getBooks(this.bookFilter,this.currentPage,10)
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


selectBook(book: any){
  this.selectedBook = book;
  this.showSaleBox = true;
  this.quantity = 1;
  this.typePayment = 1;
  this.soldValue = book.price;
  this.pixValue = book.price;
  this.moneyValue = 0;
  this.orderBook = {} as OrderBook;
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


finalizeSale(){
  if(this.clientId != null){
    this.buyOrder.clientId = this.clientId;
  }

  console.log('Client ID para a venda:', this.buyOrder.clientId);
  this.buyOrder.orderBooks = this.listOrderBooks;
  this.buyOrder.orderDate = new Date();
  this.service.saveBuyOrder(this.buyOrder).subscribe({
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
  if (!this.selectedBook?.id) {
    console.error('Nenhum livro selecionado para venda.');
    return;
  }

  if (!this.clientId) {
    this.openModal('error', 'Validação', 'Por favor, selecione um cliente para continuar.');
    return;
  }

  this.orderBook.bookId = this.selectedBook.id;
  this.orderBook.quantity = this.quantity;
  this.orderBook.soldValue = this.soldValue || this.selectedBook.price;
  this.orderBook.pixValue = this.pixValue;
  this.orderBook.moneyValue = this.moneyValue;
  this.orderBook.subtotal = this.quantity * (this.soldValue || this.selectedBook.price);
  
  this.listOrderBooks.push(this.orderBook);
  

  
  console.log('Venda registrada:', this.orderBook);
  console.log('Pedido de compra:', this.buyOrder);
  this.closeSaleBox();
}
  
  voltarPagina(){
    this.voltar.emit();
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
