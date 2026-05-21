import { Mission, MissionFilters } from "../model/missionModel";
import database from "../database";

export class MissionRepository {

    public async getAll(filters: MissionFilters): Promise<Mission[]> {
        const missions = await database("missions")
            .select("*")
            .orderBy(filters.sortBy, filters.order)
            .limit(filters.limit)
            .offset((filters.page - 1) * filters.limit);

        return missions;
    }

    public async getById(id: number): Promise<Mission | undefined> {
        return await database("missions").where({ id: id }).first();
    }

    public async create(missionData: any): Promise<Mission> {
        const [insertedId] = await database("missions").insert({
            title: missionData.title,
            description: missionData.description,
            dangerLevel: missionData.dangerLevel,
            status: missionData.status,
            teamIds: JSON.stringify(missionData.teamIds || []),
            threatIds: JSON.stringify(missionData.threatIds || [])
        });

        if (insertedId === undefined) {
            throw new Error("Erro crítico: banco não retornou o ID gerado.");
        }

        const newMission = await this.getById(insertedId);
        if (newMission === undefined) {
            throw new Error("Erro ao criar missão no banco de dados.");
        }
        return newMission;
    }

    public async update(id: number, missionData: any): Promise<Mission | undefined> {
        const rowsUpdated = await database("missions").where({ id: id }).update({
            title: missionData.title,
            description: missionData.description,
            dangerLevel: missionData.dangerLevel,
            status: missionData.status,
            teamIds: JSON.stringify(missionData.teamIds || []),
            threatIds: JSON.stringify(missionData.threatIds || [])
        });

        if (rowsUpdated === 0) {
            return undefined;
        }

        return await this.getById(id);
    }

    public async patch(id: number, missionData: any): Promise<Mission | undefined> {
        const dataToUpdate: any = { ...missionData };
        if (dataToUpdate.teamIds !== undefined) {
            dataToUpdate.teamIds = JSON.stringify(dataToUpdate.teamIds);
        }
        if (dataToUpdate.threatIds !== undefined) {
            dataToUpdate.threatIds = JSON.stringify(dataToUpdate.threatIds);
        }


        const rowsUpdated = await database("missions").where({ id: id }).update(dataToUpdate);

        if (rowsUpdated === 0) {
            return undefined;
        }

        return await this.getById(id);
    }

    public async delete(id: number): Promise<boolean> {
        const rowsDeleted = await database("missions").where({ id: id }).del();
        return rowsDeleted > 0;
    }
}
