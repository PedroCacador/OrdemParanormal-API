import bcrypt from "bcryptjs";
import { Agent, AgentStatus, AgentFilters, CreateAgentDTO, UpdateAgentDTO, PatchAgentDTO } from "../model/agentModel";
import { AgentRepository } from "../repository/agentRepository";

export class AgentService {

    public static async getAll(filters: AgentFilters): Promise<Agent[]> {
        return await AgentRepository.getAll(filters);
    }

    public static async getById(id: number): Promise<Agent | undefined> {
        return await AgentRepository.getById(id);
    }

    public static async create(agentData: CreateAgentDTO): Promise<Agent> {
        // if (agentData.status === AgentStatus.active) {
        //     if (agentData.teamId === undefined || agentData.teamId === null) {
        //         throw new Error("Violação de Regra: Um agente ativo precisa estar em uma equipe.");
        //     }
        // } PROVISÓRIO FI!

        const hashedPassword = await bcrypt.hash(agentData.password, 10);

        return await AgentRepository.create({
            ...agentData,
            password: hashedPassword
        });
    }

    public static async update(id: number, agentData: UpdateAgentDTO): Promise<Agent | undefined> {
        // if (agentData.status === AgentStatus.active) {
        //     if (agentData.teamId === undefined || agentData.teamId === null) {
        //         throw new Error("Violação de Regra: Um agente ativo precisa estar em uma equipe.");
        //     }
        // } PROVISÓRIO FI!

        return await AgentRepository.update(id, agentData);
    }

    public static async patch(id: number, agentData: PatchAgentDTO): Promise<Agent | undefined> {
        const agentOriginal = await AgentRepository.getById(id);

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

        return await AgentRepository.patch(id, agentData);
    }

    public static async delete(id: number): Promise<boolean> {
        return await AgentRepository.delete(id);
    }
}