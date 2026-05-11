import { Team } from "../model/teamModel";
import database from "../database";

export class TeamRepository {

    public async getAll(): Promise<Team[]> {
        return await database("teams").select("*");
    }

    public async getById(id: number): Promise<Team | undefined> {
        return await database("teams").where({ id: id }).first();
    }

    public async create(teamData: any): Promise<Team> {
        const [insertedId] = await database("teams").insert({
            name: teamData.name,
            specialization: teamData.specialization,
            status: teamData.status
        });

        if (insertedId === undefined) {
            throw new Error("Erro crítico: banco não retornou o ID gerado.");
        }

        const newTeam = await this.getById(insertedId);
        if (newTeam === undefined) {
            throw new Error("Erro ao criar equipe no banco de dados.");
        }
        return newTeam;
    }

    public async update(id: number, teamData: any): Promise<Team | undefined> {
        const rowsUpdated = await database("teams").where({ id: id }).update({
            name: teamData.name,
            specialization: teamData.specialization,
            status: teamData.status
        });

        if (rowsUpdated === 0) {
            return undefined;
        }

        return await this.getById(id);
    }

    public async patch(id: number, teamData: any): Promise<Team | undefined> {
        const rowsUpdated = await database("teams").where({ id: id }).update(teamData);

        if (rowsUpdated === 0) {
            return undefined;
        }

        return await this.getById(id);
    }

    public async delete(id: number): Promise<boolean> {
        const rowsDeleted = await database("teams").where({ id: id }).del();
        return rowsDeleted > 0;
    }
}