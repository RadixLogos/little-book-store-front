import { Component, Output, EventEmitter, ChangeDetectorRef, NgZone } from '@angular/core';
import { ClientService } from '../../services/client-service';
import { Client } from '../../entities/client';

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

  constructor(private clientService: ClientService, private zone: NgZone, 
  private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    this.clientService.getClients().subscribe({
      next: (response : any) => {
        this.zone.run(() => {
          this.clients = response.body.content || [];
          console.log('Clientes carregados:', this.clients);
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

  
  selectClient() {
    if (this.selectedClientId) {
      this.clientSelected.emit(this.selectedClientId);
    }
  }

  noClientSelected() {
    this.clientSelected.emit(-1); // Emite -1 para indicar que nenhum cliente foi selecionado
  }
  toggleRegisterForm() {
    this.showRegisterForm = !this.showRegisterForm;
  }

  openRegisterForm() {
    
    this.openClientRegister.emit();
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

  voltarPagina() {
    this.voltar.emit();
  }
}
