import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { SalaService } from "../../../core/services/sala.service";
import { SalaModel } from "../../../core/models/sala.model";

@Component({
  selector: 'app-sala-edit',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './sala-edit.component.html',
  styleUrl: './sala-edit.component.scss'
})
export class SalaEditComponent {
  descricao!: string | undefined;
  quantidadeCadeiras!: number | undefined;
  camposObrigatorios: boolean = false;
  salvoComSucesso: boolean = false;
  idEditar!: string;

  get isUpdate(): boolean {
    return this.router.url.includes('/editar');
  }

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private salaService: SalaService) {
    if (this.isUpdate) {
      this.activatedRoute.paramMap.subscribe(params => {
        this.idEditar = params.get('id') as string;
        this.salaService.getSalaById(this.idEditar).subscribe((sala: any) => {
          this.descricao = sala.descricao;
          this.quantidadeCadeiras = sala.quantidadeCadeiras;
        });
      });
    }
  }

  salvarSala() {
    if (this.existemCamposObrigatoriosSemPreencher()) {
      this.camposObrigatorios = true;

      setTimeout(() => {
        this.camposObrigatorios = false;
      }, 1500);

      return;
    } else {
      
      const sala = {
        descricao: this.descricao,
        quantidadeCadeiras: this.quantidadeCadeiras
      } as SalaModel;

      if (this.isUpdate) {
        this.salaService.editarSala(this.idEditar, sala).subscribe({
          next: (data: any) => {
            if (data) {
              this.salvoComSucesso = true;

              setTimeout(() => {
                this.salvoComSucesso = false;
                this.router.navigate(['salas']);
              }, 1500);

              this.limparForm();
            }
          }
        });
      }
      else {
        this.salaService.salvarSala(sala).subscribe({
          next: (data: any) => {
            if (data) {
              this.salvoComSucesso = true;

              setTimeout(() => {
                this.salvoComSucesso = false;
                this.router.navigate(['salas']);
              }, 1500);

              this.limparForm();
            }
          }
        });
      }
    }
  }

  existemCamposObrigatoriosSemPreencher() {
    if (this.descricao === undefined) return true;
    if (this.quantidadeCadeiras === undefined) return true;

    return false;
  }

  limparForm() {
    this.descricao = undefined;
    this.quantidadeCadeiras = undefined;
  }
}
