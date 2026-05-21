import { Agent, AgentFilters } from "../model/agentModel";
import database from "../database";

export class AgentRepository {

    public async getAll(filters: AgentFilters): Promise<Agent[]> {
        const agents = await database("agents")
            .select("*")
            .orderBy(filters.sortBy, filters.order)
            .limit(filters.limit)
            .offset((filters.page - 1) * filters.limit);

        return agents;
    }

    public async getById(id: number): Promise<Agent | undefined> {
        const agent = await database("agents").where({ id: id }).first();
        return agent;
    }

    public async create(agentData: any): Promise<Agent> {
        const [insertedId] = await database("agents").insert({
            teamId: agentData.teamId,
            name: agentData.name,
            codename: agentData.codename,
            level: agentData.level,
            specialty: agentData.specialty,
            status: agentData.status
        });

        if (insertedId === undefined) {
            throw new Error("Erro crítico: banco não retornou o ID gerado.");
        }

        const newAgent = await this.getById(insertedId);

        if (newAgent === undefined) {
            throw new Error("Erro ao criar agente no banco de dados.");
        }

        return newAgent;
    }

    public async update(id: number, agentData: any): Promise<Agent | undefined> {
        const rowsUpdated = await database("agents").where({ id: id }).update({
            teamId: agentData.teamId,
            name: agentData.name,
            codename: agentData.codename,
            level: agentData.level,
            specialty: agentData.specialty,
            status: agentData.status
        });

        if (rowsUpdated === 0) {
            return undefined;
        }

        const updatedAgent = await this.getById(id);
        return updatedAgent;
    }

    public async patch(id: number, agentData: any): Promise<Agent | undefined> {
        const rowsUpdated = await database("agents").where({ id: id }).update(agentData);

        if (rowsUpdated === 0) {
            return undefined;
        }

        const updatedAgent = await this.getById(id);
        return updatedAgent;
    }

    public async delete(id: number): Promise<boolean> {
        const rowsDeleted = await database("agents").where({ id: id }).del();

        if (rowsDeleted > 0) {
            return true;
        }

        return false;
    }
}