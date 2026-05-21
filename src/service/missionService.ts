import { Mission, MissionFilters } from "../model/missionModel";
import { MissionRepository } from "../repository/missionRepository";
import { TeamRepository } from "../repository/teamRepository";
import { ThreatRepository } from "../repository/threatRepository";
import { TeamStatus } from "../model/teamModel";

export class MissionService {

    public static async getAll(filters: MissionFilters): Promise<Mission[]> {
        return await MissionRepository.getAll(filters);
    }

    public static async getById(id: number): Promise<Mission | undefined> {
        return await MissionRepository.getById(id);
    }


    public static async create(missionData: any): Promise<Mission> {
        if (missionData.teamIds && missionData.teamIds.length > 0) {
            for (const teamId of missionData.teamIds) {
                const team = await TeamRepository.getById(teamId);
                if (!team) {
                    throw new Error(`A equipe com ID ${teamId} não existe.`);
                }
            }
        }

        if (missionData.threatIds && missionData.threatIds.length > 0) {
            for (const threatId of missionData.threatIds) {
                const threat = await ThreatRepository.getById(threatId);
                if (!threat) {
                    throw new Error(`A ameaça com ID ${threatId} não existe.`);
                }
            }
        }

        return await MissionRepository.create(missionData);
    }

    public static async update(id: number, missionData: any): Promise<Mission | undefined> {
        if (missionData.teamIds && missionData.teamIds.length > 0) {
            for (const teamId of missionData.teamIds) {
                const team = await TeamRepository.getById(teamId);
                if (!team) {
                    throw new Error(`A equipe com ID ${teamId} não existe.`);
                }
            }
        }

        if (missionData.threatIds && missionData.threatIds.length > 0) {
            for (const threatId of missionData.threatIds) {
                const threat = await ThreatRepository.getById(threatId);
                if (!threat) {
                    throw new Error(`A ameaça com ID ${threatId} não existe.`);
                }
            }
        }
        return await MissionRepository.update(id, missionData);
    }

    public static async patch(id: number, missionData: any): Promise<Mission | undefined> {
        let missionOriginal = await MissionRepository.getById(id);

        if (missionOriginal === undefined) {
            return undefined;
        }

        if (missionData.teamIds && missionData.teamIds.length > 0) {
            for (const teamId of missionData.teamIds) {
                const team = await TeamRepository.getById(teamId);
                if (!team) {
                    throw new Error(`A equipe com ID ${teamId} não existe.`);
                }
            }
        }

        if (missionData.threatIds && missionData.threatIds.length > 0) {
            for (const threatId of missionData.threatIds) {
                const threat = await ThreatRepository.getById(threatId);
                if (!threat) {
                    throw new Error(`A ameaça com ID ${threatId} não existe.`);
                }
            }
        }

        return await MissionRepository.patch(id, missionData);
    }

    public static async delete(id: number): Promise<boolean> {
        return await MissionRepository.delete(id);
    }
}
