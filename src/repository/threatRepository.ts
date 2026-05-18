import { Threat } from "../model/threatModel";
import database from "../database";

export class ThreatRepository {

    public async getAll(page: number, limit: number): Promise<Threat[]> {
        const threats = await database("threats")
            .select("*")
            .limit(limit)
            .offset((page - 1) * limit);
            
        return threats;
    }

    public async getById(id: number): Promise<Threat | undefined> {
        return await database("threats").where({ id: id }).first();
    }

    public async create(threatData: any): Promise<Threat> {
        const [insertedId] = await database("threats").insert({
            name: threatData.name,
            type: threatData.type,
            dangerLevel: threatData.dangerLevel,
            description: threatData.description,
            status: threatData.status
        });

        if (insertedId === undefined) {
            throw new Error("Erro crítico: banco não retornou o ID gerado.");
        }

        const newThreat = await this.getById(insertedId);
        if (newThreat === undefined) {
            throw new Error("Erro ao criar ameaça no banco de dados.");
        }
        return newThreat;
    }

    public async update(id: number, threatData: any): Promise<Threat | undefined> {
        const rowsUpdated = await database("threats").where({ id: id }).update({
            name: threatData.name,
            type: threatData.type,
            dangerLevel: threatData.dangerLevel,
            description: threatData.description,
            status: threatData.status
        });

        if (rowsUpdated === 0) {
            return undefined;
        }

        return await this.getById(id);
    }

    public async patch(id: number, threatData: any): Promise<Threat | undefined> {
        const rowsUpdated = await database("threats").where({ id: id }).update(threatData);

        if (rowsUpdated === 0) {
            return undefined;
        }

        return await this.getById(id);
    }

    public async delete(id: number): Promise<boolean> {
        const rowsDeleted = await database("threats").where({ id: id }).del();
        return rowsDeleted > 0;
    }
}
