import { Agente } from "../model/agenteModel";

let agentes: Agente[] = [];

export class AgenteService {
    getAll(): Agente[] {
        return agentes;
    }
    getById(id: number) {
        return agentes.find(a => a.id === id);
    }
    create(agente: Agente) {
        agentes.push(agente);
        return agente;
    }
    update(id: number, agenteAtualizado: Agente) {
        const index = agentes.findIndex(a => a.id === id);

        if (index === -1) {
            return undefined;
        }

        agentes[index] = agenteAtualizado;

        return agentes[index];
    }
    delete(id: number): boolean {
        const index = agentes.findIndex(a => a.id === id);

        if (index === -1) {
            return false;
        }
        agentes.splice(index, 1);

        return true;
    }
}