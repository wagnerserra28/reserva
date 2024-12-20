import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SalaService } from '../../../core/services/sala.service';
import { ClienteService } from '../../../core/services/cliente.service';
import { SalaModel } from '../../../core/models/sala.model';
import { ClienteModel } from '../../../core/models/cliente.model';
import { NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { ReservaModel } from '../../../core/models/reserva.model';
import { ReservaService } from '../../../core/services/reserva.service';

@Component({
  selector: 'app-reserva-edit',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    NgbTimepickerModule
  ],
  templateUrl: './reserva-edit.component.html',
  styleUrl: './reserva-edit.component.scss'
})
export class ReservaEditComponent implements OnInit {
  clienteId!: string | undefined;
  salaId!: number | undefined;
  dataInicio: Date | undefined = new Date();
  dataFim: Date | undefined = new Date();
  timeInicio: any = { hour: 13, minute: 30 };
  timeFim: any = { hour: 15, minute: 30 };
  camposObrigatorios: boolean = false;
  salvoComSucesso: boolean = false;
  idEditar!: string;
  mensagemErro!: string;

  salas: SalaModel[] = [];
  clientes: ClienteModel[] = [];

  get isUpdate(): boolean {
    return this.router.url.includes('/editar');
  }

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private salaService: SalaService, private clienteService: ClienteService, private reservaService: ReservaService) { 
    if (this.isUpdate) {
      this.activatedRoute.paramMap.subscribe(params => {
        this.idEditar = params.get('id') as string;
        this.reservaService.getReservaById(this.idEditar).subscribe((reserva: any) => {
          this.clienteId = reserva.clienteId;
          this.salaId = reserva.salaId;
          this.dataInicio = reserva.dataInicio;
          this.dataFim = reserva.dataFim;
          this.timeInicio = reserva.timeInicio;
          this.timeFim = reserva.timeFim;
        });
      });
    }
  }

  ngOnInit(): void {
    this.obterClientes();
    this.obterSalas();
  }

  obterClientes() {
    this.clienteService.obterClientes().subscribe({
      next: (clientes: any) => {
        this.clientes = clientes;
        this.clientes = this.clientes.filter(s => s.ativo == true);
      },
      error: (error) => {
        console.error('Erro ao carregar clientes:', error);
      }
    });
  }

  obterSalas() {
    this.salaService.obterSalas().subscribe({
      next: (salas: any) => {
        this.salas = salas;
        this.salas = this.salas.filter(s => s.ativo == true);
      },
      error: (error) => {
        console.error('Erro ao carregar salas:', error);
      }
    });
  }

  salvarReserva() {
    if (this.existemCamposObrigatoriosSemPreencher()) {
      this.camposObrigatorios = true;

      setTimeout(() => {
        this.camposObrigatorios = false;
      }, 1500);

      return;
    } else {

      const reserva = {
        salaId: this.salaId,
        clienteId: this.clienteId,
        dataInicio: this.dataInicio,
        dataFim: this.dataFim,
        timeInicio: this.timeInicio,
        timeFim: this.timeFim
      };

      if (this.isUpdate) {
        this.reservaService.editarReserva(this.idEditar, reserva).subscribe({
          next: (data: any) => {
            if (data) {
              this.salvoComSucesso = true;

              setTimeout(() => {
                this.salvoComSucesso = false;
                this.router.navigate(['reservas']);
              }, 1500);

              this.limparForm();
            }
          }, error: (err: any) => {
            if(err.status === 400)
              this.mensagemErro = err.error;
          }
        });
      }
      else {
        this.reservaService.salvarReserva(reserva).subscribe({
          next: (data: any) => {
            if (data) {
              this.salvoComSucesso = true;

              setTimeout(() => {
                this.salvoComSucesso = false;
                this.router.navigate(['reservas']);
              }, 1500);

              this.limparForm();
            }
          }, error: (err: any) => {
            if(err.status === 400)
              this.mensagemErro = err.error;
          }
        });
      }
    }
  }

  existemCamposObrigatoriosSemPreencher() {
    if (this.clienteId === undefined) return true;
    if (this.salaId === undefined) return true;
    if (this.dataInicio === undefined) return true;
    if (this.dataFim === undefined) return true;
    if (this.timeInicio === undefined) return true;
    if (this.timeFim === undefined) return true;

    return false;
  }

  limparForm() {
    this.clienteId = undefined;
    this.salaId = undefined;
    this.dataInicio = undefined;
    this.dataFim = undefined;
    this.timeInicio = { hour: 0, minute: 0 };
    this.timeFim = { hour: 0, minute: 0 };
  }
}
