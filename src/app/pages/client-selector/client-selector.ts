import { Component, Output, EventEmitter, ChangeDetectorRef, NgZone } from '@angular/core';
import { ClientService } from '../../services/client-service';
import { Client } from '../../entities/client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-selector',
  standalone: false,
  templateUrl: './client-selector.html',
  styleUrl: './client-selector.css',
})
export class ClientSelector {
  @Output() clientSelected = new EventEmitter<number>();
  @Output() voltar = new EventEmitter<void>();
  @Output() openClientRegister = new EventEmitter<void>();


  clients: Client[] = [];
  selectedClientId: number | null = null;
  showRegisterForm: boolean = false;
  
  // Variáveis do formulário de cadastro
  newClientName: string = '';
  newClientEmail: string = '';
  newClientPhone: string = '';
  newClientCpf: string = '';

  // Modal
  isModalOpen: boolean = false;
  modalType: 'success' | 'error' = 'success';
  modalTitle: string = '';
  modalMessage: string = '';

  // Variáveis 
  activeScreen: string = '';
  client: Client = {} as Client;

  totalPages : number = 0;
  currentPage: number = 0;

  constructor(private clientService: ClientService, private zone: NgZone, 
  private cdr: ChangeDetectorRef, private router: Router) {}

  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    this.clientService.getClients(this.client,this.currentPage,12).subscribe({
      next: (response : any) => {
        this.zone.run(() => {
          this.clients = response.body.content || [];
          console.log('Clientes carregados:', this.clients);
          console.log(response);
          this.totalPages = response.body.totalPages;
          this.cdr.detectChanges();
        });
      },
      error: (err) => {
        console.error('Erro ao carregar clientes:', err);
        this.openModal('error', 'Erro', 'Erro ao carregar a lista de clientes.');
      },
      complete: () => {console.log('Requisição de clientes concluída.');}
    });
  }


  noClientSelected() {
    this.selectedClientId = -1 // -1 para indicar que nenhum cliente foi selecionado
    this.openRegisterForm()
  }
  toggleRegisterForm() {
    this.showRegisterForm = !this.showRegisterForm;
  }

  openRegisterForm() {
    this.activeScreen = 'sell';
  }

  registerNewClient() {
    if (!this.newClientName.trim()) {
      this.openModal('error', 'Validação', 'Por favor, preencha o nome do cliente.');
      return;
    }
    

    const newClient: Client = {
      name: this.newClientName,
      // email: this.newClientEmail,
      cellphone: this.newClientPhone,
      // cpf: this.newClientCpf,
    };

    this.clientService.saveClient(newClient).subscribe({
      next: (response) => {
        this.openModal('success', 'Sucesso!', 'Cliente cadastrado com sucesso!');
        this.resetForm();
        this.loadClients();
      },
      error: (err) => {
        console.error('Erro ao cadastrar cliente:', err);
        this.openModal('error', 'Erro', 'Erro ao cadastrar o cliente.');
      }
    });
  }

  resetForm() {
    this.newClientName = '';
    this.newClientEmail = '';
    this.newClientPhone = '';
    this.newClientCpf = '';
    this.showRegisterForm = false;
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

nextPage(){
  if(this.currentPage <= this.totalPages -1){
    this.currentPage++;
    this.loadClients();
  }
}


backPage(){
   if(this.currentPage > 0){
    this.currentPage--;
    this.loadClients();
  } 
  }
  voltarPagina() {
    this.router.navigate(['/books']);
  }
}
