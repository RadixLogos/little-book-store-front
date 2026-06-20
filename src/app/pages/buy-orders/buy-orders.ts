
import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectorRef
} from '@angular/core';

import { BookService } from '../../services/book-service';
import { LoaderService } from '../../services/loader';
import {  BuyOrderRequest } from '../../entities/BuyOrderRequest';
import { Client } from '../../entities/client';
import { ClientService } from '../../services/client-service';
import { BuyOrderResponse } from '../../entities/BuyOrderResponse';

@Component({
  selector: 'app-buy-orders',
  templateUrl: './buy-orders.html',
  styleUrl: './buy-orders.css',
  changeDetection: ChangeDetectionStrategy.Default,
  standalone: false,
})
export class BuyOrdersComponent implements OnInit {

  buyOrders: BuyOrderResponse[] = [];

  buyOrderSelected: BuyOrderResponse = {} as BuyOrderResponse;

  buyOrderRequest = {} as BuyOrderRequest;

  selectedClient: Client = {} as Client;
  
  clientList: Client[] = [];

  isLoading = true;

  editingOrderId: number | null = null;

  file!: File;

  @Output()
  voltar = new EventEmitter<void>();

  constructor(
    private bookService: BookService,
    public loaderService: LoaderService,
    private clientService: ClientService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadBuyOrders();
    this.loadClients();
  }

  loadBuyOrders(): void {

    this.isLoading = true;

    const timeout = setTimeout(() => {

      console.warn('Timeout ao carregar pedidos');

      this.isLoading = false;

    }, 10000);

    this.bookService.getAllBuyOrders().subscribe({

      next: (response: any) => {

        clearTimeout(timeout);

        console.log('Pedidos carregados:', response);

        this.buyOrders = response.content || response;

        this.isLoading = false;

        this.cdr.detectChanges();
      },

      error: (err) => {

        clearTimeout(timeout);

        console.error('Erro ao carregar pedidos:', err);

        this.buyOrders = [];

        this.isLoading = false;

        this.cdr.detectChanges();
      }

    });

  }

  startEdit(order: BuyOrderResponse): void {

    this.editingOrderId = order.id!;

  }

  cancelEdit(): void {

    this.editingOrderId = null;

    this.loadBuyOrders();

  }

  saveEdit(order: BuyOrderResponse): void {
    this.buyOrderRequest = {
      id: order.id,
      clientId: order.client.id,
      clientName: order.client.name,
      total: order.total,
      orderDate: order.orderDate,
      orderBooks: order.orderBooks,
      receiptUrl: order.receiptUrl
    }

    this.bookService.updateBuyOrder(this.buyOrderRequest).subscribe({

      next: () => {

        console.log('Pedido atualizado com sucesso');

        this.editingOrderId = null;

        this.loadBuyOrders();

      },

      error: (err) => {

        console.error('Erro ao atualizar pedido:', err);

      }

    });

  }

  loadClients(): void {
    this.clientService.getClients().subscribe({
      
      next: (response: any) => {

        this.clientList = response.body.content || response;

      },

      error: (err) => {

        console.error('Erro ao carregar clientes:', err);

        this.clientList = [];

      }

    }); 
  }

  deleteBuyOrder(id: number): void {

    if (confirm('Tem certeza que deseja deletar este pedido?')) {

      this.bookService.deleteBuyOrder(id).subscribe({

        next: () => {

          console.log('Pedido deletado com sucesso');

          this.buyOrders = this.buyOrders.filter(
            (o) => o.id !== id
          );

        },

        error: (err) => {

          console.error('Erro ao deletar pedido:', err);

        }

      });

    }

  }

  getFormattedDate(date: Date): string {

    return new Date(date).toLocaleDateString('pt-BR');

  }

onFileSelected(event: any, buyOrder: BuyOrderResponse) {
  this.file = event.target.files[0];
  this.buyOrderSelected = buyOrder;
  this.getImgUrl();
}

getImgUrl(){
    const forms = new FormData();
    forms.append("file",this.file)
    console.log("entrou");
    this.bookService.getImgUrl(forms).subscribe(      
      (result:any) =>{
          if(result.status == 200){
            this.buyOrderSelected.receiptUrl = result.body.url;
            this.saveEdit(this.buyOrderSelected);
          }
      }
    )
  }

}

