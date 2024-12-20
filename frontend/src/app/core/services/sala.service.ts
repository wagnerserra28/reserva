import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SalaModel} from "../models/sala.model";

@Injectable({
  providedIn: 'root'
})
export class SalaService {

  constructor(private http: HttpClient) { }

  obterSalas() {
    return this.http.get('http://localhost:4000/api/salas')
  }

  ativarInativar(id: string) {
    return this.http.patch(`http://localhost:4000/api/salas/${id}/inativar`, {});
  }

  salvarSala(sala: SalaModel) {
    return this.http.post(`http://localhost:4000/api/salas`, sala);
  }

  editarSala(id: string, sala: SalaModel) {
    return this.http.put(`http://localhost:4000/api/salas/${id}/editar`, sala);
  }

  getSalaById(id: string) {
    return this.http.get(`http://localhost:4000/api/salas/${id}`);
  }
}
