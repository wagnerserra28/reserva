import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { ClienteService } from '../../../core/services/cliente.service';
import { ClienteModel } from '../../../core/models/cliente.model';

@Component({
  selector: 'app-cliente-edit',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './cliente-edit.component.html',
  styleUrl: './cliente-edit.component.scss'
})
export class ClienteEditComponent {
  nome!: string | undefined;
  camposObrigatorios: boolean = false;
  salvoComSucesso: boolean = false;
  idEditar!: string;

  get isUpdate(): boolean {
    return this.router.url.includes('/editar');
  }

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private clienteService: ClienteService) {
    if (this.isUpdate) {
      this.activatedRoute.paramMap.subscribe(params => {
        this.idEditar = params.get('id') as string;
        this.clienteService.getClienteById(this.idEditar).subscribe((cliente: any) => {
          this.nome = cliente.nome;
        });
      });
    }
  }

  salvarCliente() {
    if (this.existemCamposObrigatoriosSemPreencher()) {
      this.camposObrigatorios = true;

      setTimeout(() => {
        this.camposObrigatorios = false;
      }, 1500);

      return;
    } else {

      const cliente = {
        nome: this.nome
      } as ClienteModel;

      if (this.isUpdate) {
        this.clienteService.editarCliente(this.idEditar, cliente).subscribe({
          next: (data: any) => {
            if (data) {
              this.salvoComSucesso = true;

              setTimeout(() => {
                this.salvoComSucesso = false;
                this.router.navigate(['clientes']);
              }, 1500);

              this.limparForm();
            }
          }
        });
      }
      else {
        this.clienteService.salvarCliente(cliente).subscribe({
          next: (data: any) => {
            if (data) {
              this.salvoComSucesso = true;

              setTimeout(() => {
                this.salvoComSucesso = false;
                this.router.navigate(['clientes']);
              }, 1500);

              this.limparForm();
            }
          }
        });
      }
    }
  }

  existemCamposObrigatoriosSemPreencher() {
    if (this.nome === undefined) return true;

    return false;
  }

  limparForm() {
    this.nome = undefined;
  }
}
