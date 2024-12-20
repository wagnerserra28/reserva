import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClienteModel } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  obterClientes() {
    return this.http.get('http://localhost:4000/api/clientes');
  }

  ativarInativar(id: string) {
    return this.http.patch(`http://localhost:4000/api/clientes/${id}/inativar`, {});
  }

  salvarCliente(sala: ClienteModel) {
    return this.http.post(`http://localhost:4000/api/clientes`, sala);
  }

  editarCliente(id: string, sala: ClienteModel) {
    return this.http.put(`http://localhost:4000/api/clientes/${id}/editar`, sala);
  }

  getClienteById(id: string) {
    return this.http.get(`http://localhost:4000/api/clientes/${id}`);
  }
}
