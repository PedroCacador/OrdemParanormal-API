import { Threat, ThreatFilters } from "../model/threatModel";
import database from "../database";

export class ThreatRepository {

    public static async getAll(filters: ThreatFilters): Promise<Threat[]> {
        let query = database("threats").select("*");

        if (filters.name) {
            query = query.where("name", "like", `%${filters.name}%`);
        }
        if (filters.type) {
            query = query.where("type", filters.type);
        }
        if (filters.dangerLevel) {
            query = query.where("dangerLevel", filters.dangerLevel);
        }
        if (filters.status) {
            query = query.where("status", filters.status);
        }

        const threats = await query
            .orderBy(filters.sortBy, filters.order)
            .limit(filters.limit)
            .offset((filters.page - 1) * filters.limit);

        return threats;
    }

    public static async getById(id: number): Promise<Threat | undefined> {
        const threat = await database("threats").where({ id: id }).first();
        return threat;
    }

    public static async create(threatData: any): Promise<Threat> {
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

        const newThreat = await ThreatRepository.getById(insertedId);

        if (newThreat === undefined) {
            throw new Error("Erro ao criar ameaça no banco de dados.");
        }

        return newThreat;
    }

    public static async update(id: number, threatData: any): Promise<Threat | undefined> {
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

        const updatedThreat = await ThreatRepository.getById(id);
        return updatedThreat;
    }

    public static async patch(id: number, threatData: any): Promise<Threat | undefined> {
        const rowsUpdated = await database("threats").where({ id: id }).update(threatData);

        if (rowsUpdated === 0) {
            return undefined;
        }

        const updatedThreat = await ThreatRepository.getById(id);
        return updatedThreat;
    }

    public static async delete(id: number): Promise<boolean> {
        const rowsDeleted = await database("threats").where({ id: id }).del();
        return rowsDeleted > 0;
    }
}
