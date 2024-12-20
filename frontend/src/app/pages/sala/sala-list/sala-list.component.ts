import {Component, OnInit} from '@angular/core';
import {DecimalPipe, JsonPipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {SalaService} from "../../../core/services/sala.service";
import {SalaModel} from "../../../core/models/sala.model";

@Component({
  selector: 'app-sala-list',
  standalone: true,
  imports: [
    DecimalPipe,
    RouterLink,
    JsonPipe
  ],
  templateUrl: './sala-list.component.html',
  styleUrl: './sala-list.component.scss'
})
export class SalaListComponent implements OnInit {
  salas: SalaModel[] = [];
  
  constructor(private salaService: SalaService) { }

  ngOnInit() {
    this.carregarSalas();
  }

  carregarSalas() {
    this.salaService.obterSalas().subscribe({ next: (data: any) => {
        this.salas = data;
      }
    });
  }

  ativarInativar(id: string) {
    this.salaService.ativarInativar(id).subscribe({next: (data: any) => {
        this.carregarSalas();
      }
    });
  }
}
