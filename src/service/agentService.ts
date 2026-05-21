import { Agent, AgentStatus, AgentFilters } from "../model/agentModel";
import { AgentRepository } from "../repository/agentRepository";

export class AgentService {
    private agentRepository: AgentRepository;

    constructor() {
        this.agentRepository = new AgentRepository();
    }

    public async getAll(filters: AgentFilters): Promise<Agent[]> {
        return await this.agentRepository.getAll(filters);
    }

    public async getById(id: number): Promise<Agent | undefined> {
        return await this.agentRepository.getById(id);
    }

    public async create(agentData: any): Promise<Agent> {
        // if (agentData.status === AgentStatus.active) {
        //     if (agentData.teamId === undefined || agentData.teamId === null) {
        //         throw new Error("Violação de Regra: Um agente ativo precisa estar em uma equipe.");
        //     }
        // } PROVISÓRIO FI!

        return await this.agentRepository.create(agentData);
    }

    public async update(id: number, agentData: any): Promise<Agent | undefined> {
        // if (agentData.status === AgentStatus.active) {
        //     if (agentData.teamId === undefined || agentData.teamId === null) {
        //         throw new Error("Violação de Regra: Um agente ativo precisa estar em uma equipe.");
        //     }
        // } PROVISÓRIO FI!

        return await this.agentRepository.update(id, agentData);
    }

    public async patch(id: number, agentData: any): Promise<Agent | undefined> {
        let agentOriginal = await this.agentRepository.getById(id);

        if (agentOriginal === undefined) {
            return undefined;
        }

        let finalStatus = agentOriginal.status;
        if (agentData.status !== undefined) {
            finalStatus = agentData.status;
        }

        let finalTeamId = agentOriginal.teamId;
        if (agentData.teamId !== undefined) {
            finalTeamId = agentData.teamId;
        }

        // if (finalStatus === AgentStatus.active) {
        //     if (finalTeamId === undefined || finalTeamId === null) {
        //         throw new Error("Violação de Regra: Um agente ativo precisa estar em uma equipe.");
        //     }
        // }

        return await this.agentRepository.patch(id, agentData);
    }

    public async delete(id: number): Promise<boolean> {
        return await this.agentRepository.delete(id);
    }
}