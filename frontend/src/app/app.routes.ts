import { Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {SalaListComponent} from "./pages/sala/sala-list/sala-list.component";
import {SalaEditComponent} from "./pages/sala/sala-edit/sala-edit.component";
import {ClienteListComponent} from "./pages/cliente/cliente-list/cliente-list.component";
import {ClienteEditComponent} from "./pages/cliente/cliente-edit/cliente-edit.component";
import { ReservaListComponent } from './pages/reserva/reserva-list/reserva-list.component';
import { ReservaEditComponent } from './pages/reserva/reserva-edit/reserva-edit.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'salas',
    component: SalaListComponent
  },
  {
    path: 'sala-criar',
    component: SalaEditComponent
  },
  {
    path: 'sala/:id/editar',
    component: SalaEditComponent
  },
  {
    path: 'clientes',
    component: ClienteListComponent
  },
  {
    path: 'cliente-criar',
    component: ClienteEditComponent
  },
  {
    path: 'cliente/:id/editar',
    component: ClienteEditComponent
  },
  {
    path: 'reservas',
    component: ReservaListComponent
  },
  {
    path: 'reserva-criar',
    component: ReservaEditComponent
  },
  {
    path: 'reserva/:id/editar',
    component: ReservaEditComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {path: '**', redirectTo: ''},
];
