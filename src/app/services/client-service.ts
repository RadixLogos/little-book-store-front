import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../entities/client';

@Injectable({
  providedIn: 'root',
})
export class ClientService {

  private apiUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) {}

  getClients(filter: Client, currentPage: number, size: number) {
    return this.http.get<Client[]>(`${this.apiUrl}clients?name=${filter.name||''}&page=${currentPage}&size=${size}`,{ observe: 'response' });
  }

  saveClient(client: Client) {
    return this.http.post<Client>(`${this.apiUrl}clients`, client, { observe: 'response' });
  }


  updateClient(client: Client) {
    return this.http.put<Client>(`${this.apiUrl}clients/${client.id}`, client, { observe: 'response' });
  }

  deleteClient(client: Client){
    return this.http.delete<Client>(`${this.apiUrl}clients/${client.id}`,{ observe: 'response' })
  }
}
