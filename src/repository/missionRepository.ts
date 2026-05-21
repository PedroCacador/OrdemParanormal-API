import { Mission, MissionFilters } from "../model/missionModel";
import database from "../database";

export class MissionRepository {

    public static async getAll(filters: MissionFilters): Promise<Mission[]> {
        let query = database("missions").select("*");

        if (filters.title) {
            query = query.where("title", "like", `%${filters.title}%`);
        }
        if (filters.dangerLevel) {
            query = query.where("dangerLevel", filters.dangerLevel);
        }
        if (filters.status) {
            query = query.where("status", filters.status);
        }

        const missions = await query
            .orderBy(filters.sortBy, filters.order)
            .limit(filters.limit)
            .offset((filters.page - 1) * filters.limit);

        return missions;
    }

    public static async getById(id: number): Promise<Mission | undefined> {
        const mission = await database("missions").where({ id: id }).first();

        if (mission) {
            if (typeof mission.teamIds === 'string') mission.teamIds = JSON.parse(mission.teamIds);
            if (typeof mission.threatIds === 'string') mission.threatIds = JSON.parse(mission.threatIds);
        }

        return mission;
    }

    public static async create(missionData: any): Promise<Mission> {
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

        const newMission = await MissionRepository.getById(insertedId);

        if (newMission === undefined) {
            throw new Error("Erro ao criar missão no banco de dados.");
        }

        return newMission;
    }

    public static async update(id: number, missionData: any): Promise<Mission | undefined> {
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

        const updatedMission = await MissionRepository.getById(id);
        return updatedMission;
    }

    public static async patch(id: number, missionData: any): Promise<Mission | undefined> {
        const patchData: any = { ...missionData };

        if (patchData.teamIds) {
            patchData.teamIds = JSON.stringify(patchData.teamIds);
        }
        if (patchData.threatIds) {
            patchData.threatIds = JSON.stringify(patchData.threatIds);
        }

        const rowsUpdated = await database("missions").where({ id: id }).update(patchData);

        if (rowsUpdated === 0) {
            return undefined;
        }

        const updatedMission = await MissionRepository.getById(id);
        return updatedMission;
    }

    public static async delete(id: number): Promise<boolean> {
        const rowsDeleted = await database("missions").where({ id: id }).del();
        return rowsDeleted > 0;
    }
}
