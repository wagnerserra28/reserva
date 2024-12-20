import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from "@angular/common";
import { RouterLink } from "@angular/router";
import { ClienteModel } from '../../../core/models/cliente.model';
import { ClienteService } from '../../../core/services/cliente.service';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [
    DecimalPipe,
    RouterLink
  ],
  templateUrl: './cliente-list.component.html',
  styleUrl: './cliente-list.component.scss'
})
export class ClienteListComponent implements OnInit {
  clientes: ClienteModel[] = [];

  constructor(private clienteService: ClienteService) {
  }

  ngOnInit() {
    this.carregarClientes();
  }

  carregarClientes() {
    this.clienteService.obterClientes().subscribe({ next: (data: any) => {
        this.clientes = data;
      }
    });
  }

  ativarInativar(id: string) {
    this.clienteService.ativarInativar(id).subscribe({next: (data: any) => {
        this.carregarClientes();
      }
    });
  }
}
