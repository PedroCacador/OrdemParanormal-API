import { Agent, AgentFilters, CreateAgentDTO, UpdateAgentDTO, PatchAgentDTO } from "../model/agentModel";
import database from "../database";

export class AgentRepository {

    public static async getAll(filters: AgentFilters): Promise<Agent[]> {
        let query = database("agents").select("*");

        if (filters.name) {
            query = query.where("name", "like", `%${filters.name}%`);
        }
        if (filters.level) {
            query = query.where("level", filters.level);
        }
        if (filters.specialty) {
            query = query.where("specialty", filters.specialty);
        }
        if (filters.status) {
            query = query.where("status", filters.status);
        }
        if (filters.teamId) {
            query = query.where("teamId", filters.teamId);
        }

        const agents = await query
            .orderBy(filters.sortBy, filters.order)
            .limit(filters.limit)
            .offset((filters.page - 1) * filters.limit);

        return agents;
    }

    public static async getById(id: number): Promise<Agent | undefined> {
        const agent = await database("agents").where({ id: id }).first();
        return agent;
    }

    public static async findByEmail(email: string): Promise<Agent | undefined> {
        const agent = await database("agents").where({ email: email }).first();
        return agent;
    }

    public static async create(agentData: CreateAgentDTO): Promise<Agent> {
        const [insertedId] = await database("agents").insert({
            teamId: agentData.teamId,
            name: agentData.name,
            codename: agentData.codename,
            level: agentData.level,
            specialty: agentData.specialty,
            status: agentData.status,
            email: agentData.email,
            password: agentData.password
        });

        if (insertedId === undefined) {
            throw new Error("Erro crítico: banco não retornou o ID gerado.");
        }

        const newAgent = await AgentRepository.getById(insertedId);

        if (newAgent === undefined) {
            throw new Error("Erro ao criar agente no banco de dados.");
        }

        return newAgent;
    }

    public static async update(id: number, agentData: UpdateAgentDTO): Promise<Agent | undefined> {
        const rowsUpdated = await database("agents").where({ id: id }).update({
            teamId: agentData.teamId,
            name: agentData.name,
            codename: agentData.codename,
            level: agentData.level,
            specialty: agentData.specialty,
            status: agentData.status,
            email: agentData.email,
            password: agentData.password
        });

        if (rowsUpdated === 0) {
            return undefined;
        }

        const updatedAgent = await AgentRepository.getById(id);
        return updatedAgent;
    }

    public static async patch(id: number, agentData: PatchAgentDTO): Promise<Agent | undefined> {
        const rowsUpdated = await database("agents").where({ id: id }).update(agentData);

        if (rowsUpdated === 0) {
            return undefined;
        }

        const updatedAgent = await AgentRepository.getById(id);
        return updatedAgent;
    }

    public static async delete(id: number): Promise<boolean> {
        const rowsDeleted = await database("agents").where({ id: id }).del();

        if (rowsDeleted > 0) {
            return true;
        }

        return false;
    }
}