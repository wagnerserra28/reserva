import { Component, OnInit } from '@angular/core';
import { ReservaModel } from '../../../core/models/reserva.model';
import { ReservaService } from '../../../core/services/reserva.service';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reserva-list',
  standalone: true,
  imports: [
    RouterLink,
    DatePipe
  ],
  templateUrl: './reserva-list.component.html',
  styleUrl: './reserva-list.component.scss'
})
export class ReservaListComponent implements OnInit {
  reservas: ReservaModel[] = [];

  constructor(private reservaService: ReservaService) {
  }

  ngOnInit() {
    this.carregarReservas();
  }

  carregarReservas() {
    this.reservaService.obterReservas().subscribe({
      next: (data: any) => {
        this.reservas = data;
      }
    });
  }

  ativarInativar(id?: string) {
    if(id){
      this.reservaService.ativarInativar(id).subscribe({
        next: (data: any) => {
          this.carregarReservas();
        }
      });
    } else {
      alert.apply('Id não encontrado.')
    }
  }
}
