import { ClienteModel } from "./cliente.model";
import { SalaModel } from "./sala.model";

export interface ReservaModel {
    id?: string,
    clienteId: string,
    cliente?: ClienteModel,
    salaId: string,
    sala?: SalaModel,
    dataInicio: Date, 
    dataFim: Date,
    timeInicio: any, 
    timeFim: any,
    ativo?: boolean
}
  