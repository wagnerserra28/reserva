import { Component, OnInit } from '@angular/core';
import { ReservaModel } from '../../../core/models/reserva.model';
import { ReservaService } from '../../../core/services/reserva.service';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reserva-list',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    DatePipe
  ],
  templateUrl: './reserva-list.component.html',
  styleUrl: './reserva-list.component.scss'
})
export class ReservaListComponent implements OnInit {
  reservas: ReservaModel[] = [];
  pesquisa: string | undefined;
  pesquisaNaoEncontrada: boolean = false;

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

  pesquisar() {
    if(this.pesquisa)
      this.reservaService.obterPesquisa(this.pesquisa).subscribe({
        next: (data: any) => {
          if(data && data.length > 0)
            this.reservas = data;
          else{
            this.pesquisaNaoEncontrada = true;
            setTimeout(() => {
              this.pesquisaNaoEncontrada = false;
            }, 3000);
          }
        }
      });
  }

  limparPesquisa() {
    this.pesquisa = undefined;
    this.carregarReservas();
  }

  ativarInativar(id?: string) {
    if(id){
      this.reservaService.ativarInativar(id).subscribe({
        next: (data: any) => {
          this.carregarReservas();
        }
      });
    } 
  }
}
