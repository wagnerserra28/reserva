import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  constructor(private http: HttpClient) { }

  obterReservas() {
    return this.http.get('http://localhost:4000/api/reservas')
  }

  ativarInativar(id: string) {
    return this.http.patch(`http://localhost:4000/api/reservas/${id}/inativar`, {});
  }

  salvarReserva(reserva: any) {
    return this.http.post(`http://localhost:4000/api/reservas`, reserva);
  }

  editarReserva(id: string, reserva: any) {
    return this.http.put(`http://localhost:4000/api/reservas/${id}/editar`, reserva);
  }

  getReservaById(id: string) {
    return this.http.get(`http://localhost:4000/api/reservas/${id}`);
  }
}
