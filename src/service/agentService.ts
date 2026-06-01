import bcrypt from "bcryptjs";
import { Agent, AgentStatus, AgentFilters, CreateAgentDTO, UpdateAgentDTO, PatchAgentDTO, AgentLevel } from "../model/agentModel";
import { AgentRepository } from "../repository/agentRepository";

export class AgentService {
    public static async getAll(filters: AgentFilters): Promise<Agent[]> {
        return await AgentRepository.getAll(filters);
    }

    public static async getById(id: number): Promise<Agent | undefined> {
        return await AgentRepository.getById(id);
    }

    public static async create(agentData: CreateAgentDTO): Promise<Agent> {
        // TEMPORARY: Business Rule Validation
        // if (agentData.status === AgentStatus.active) {
        //     if (agentData.teamId === undefined || agentData.teamId === null) {
        //         throw new Error("Rule violation: An active agent must belong to a team.");
        //     }
        // }

        const hashedPassword = await bcrypt.hash(agentData.password, 10);

        return await AgentRepository.create({
            ...agentData,
            password: hashedPassword
        });
    }

    public static async update(id: number, agentData: UpdateAgentDTO, userId: number, userLevel: AgentLevel): Promise<Agent | undefined> {
        if (userLevel === AgentLevel.recruit && userId !== id) {
            throw new Error("Recruits can only update their own profile.");
        }

        // TEMPORARY: Business Rule Validation
        // if (agentData.status === AgentStatus.active) {
        //     if (agentData.teamId === undefined || agentData.teamId === null) {
        //         throw new Error("Rule violation: An active agent must belong to a team.");
        //     }
        // }

        return await AgentRepository.update(id, agentData);
    }

    public static async patch(id: number, agentData: PatchAgentDTO, userId: number, userLevel: AgentLevel): Promise<Agent | undefined> {
        if (userLevel === AgentLevel.recruit && userId !== id) {
            throw new Error("Recruits can only update their own profile.");
        }

        const agentOriginal = await AgentRepository.getById(id);

        if (!agentOriginal) {
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

        // TEMPORARY: Business Rule Validation
        // if (finalStatus === AgentStatus.active) {
        //     if (finalTeamId === undefined || finalTeamId === null) {
        //         throw new Error("Rule violation: An active agent must belong to a team.");
        //     }
        // }

        return await AgentRepository.patch(id, agentData);
    }

    public static async delete(id: number): Promise<boolean> {
        return await AgentRepository.delete(id);
    }
}
