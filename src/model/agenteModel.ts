import { NivelAgente, EspecialidadeAgente, StatusAgente } from "../types/agentesTypes";

export interface Agente {
    id: number;
    nome: string;
    codinome: string;
    nivel: NivelAgente; 
    especialidade: EspecialidadeAgente; 
    status: StatusAgente; 
}