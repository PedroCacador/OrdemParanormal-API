import { Team, TeamFilters } from "../model/teamModel";
import database from "../database";

export class TeamRepository {

    public static async getAll(filters: TeamFilters): Promise<Team[]> {
        let query = database("teams").select("*");

        if (filters.name) {
            query = query.where("name", "like", `%${filters.name}%`);
        }
        if (filters.specialization) {
            query = query.where("specialization", filters.specialization);
        }
        if (filters.status) {
            query = query.where("status", filters.status);
        }

        const teams = await query
            .orderBy(filters.sortBy, filters.order)
            .limit(filters.limit)
            .offset((filters.page - 1) * filters.limit);

        return teams;
    }

    public static async getById(id: number): Promise<Team | undefined> {
        const team = await database("teams").where({ id: id }).first();
        return team;
    }

    public static async create(teamData: any): Promise<Team> {
        const [insertedId] = await database("teams").insert({
            name: teamData.name,
            specialization: teamData.specialization,
            status: teamData.status
        });

        if (insertedId === undefined) {
            throw new Error("Erro crítico: banco não retornou o ID gerado.");
        }

        const newTeam = await TeamRepository.getById(insertedId);

        if (newTeam === undefined) {
            throw new Error("Erro ao criar equipe no banco de dados.");
        }

        return newTeam;
    }

    public static async update(id: number, teamData: any): Promise<Team | undefined> {
        const rowsUpdated = await database("teams").where({ id: id }).update({
            name: teamData.name,
            specialization: teamData.specialization,
            status: teamData.status
        });

        if (rowsUpdated === 0) {
            return undefined;
        }

        const updatedTeam = await TeamRepository.getById(id);
        return updatedTeam;
    }

    public static async patch(id: number, teamData: any): Promise<Team | undefined> {
        const rowsUpdated = await database("teams").where({ id: id }).update(teamData);

        if (rowsUpdated === 0) {
            return undefined;
        }

        const updatedTeam = await TeamRepository.getById(id);
        return updatedTeam;
    }

    public static async delete(id: number): Promise<boolean> {
        const rowsDeleted = await database("teams").where({ id: id }).del();
        return rowsDeleted > 0;
    }
}