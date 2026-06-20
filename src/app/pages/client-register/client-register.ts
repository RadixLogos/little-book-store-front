import { Component, EventEmitter, Output } from '@angular/core';
import { ClientService } from '../../services/client-service';
import { Client } from '../../entities/client';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-client-register',
  standalone: false,
  templateUrl: './client-register.html',
  styleUrl: './client-register.css',
})
export class ClientRegister {

  constructor(private clientService: ClientService, private toast: ToastrService) {}

  clientSelected: Client = {} as Client;

  @Output() voltar = new EventEmitter();

  resetForm() {
    this.clientSelected = {} as Client;
  }

  voltarPagina() {
    this.voltar.emit();
  }

  saveClient() {
    if (!this.clientSelected.name) {
      this.toast.error("Nome é obrigatório!");
      return;
    }

    this.clientService.saveClient(this.clientSelected).subscribe(
      (response: any) => {
        if (response.status === 201) {
          this.toast.success("Cliente cadastrado com sucesso!");
          this.resetForm();
        }
      },
      (error) => {
        this.toast.error("Erro ao cadastrar cliente!");
      }
    );
  }
}
