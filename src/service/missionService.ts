import { Mission } from "../model/missionModel";
import { MissionRepository } from "../repository/missionRepository";
import { TeamRepository } from "../repository/teamRepository";
import { ThreatRepository } from "../repository/threatRepository";
import { TeamStatus } from "../model/teamModel";

export class MissionService {
    private missionRepository: MissionRepository;
    private teamRepository: TeamRepository;
    private threatRepository: ThreatRepository;

    constructor() {
        this.missionRepository = new MissionRepository();
        this.teamRepository = new TeamRepository();
        this.threatRepository = new ThreatRepository();
    }

    public async getAll(page: number, limit: number): Promise<Mission[]> {
        return await this.missionRepository.getAll(page, limit);
    }

    public async getById(id: number): Promise<Mission | undefined> {
        return await this.missionRepository.getById(id);
    }

    public async create(missionData: any): Promise<Mission> {
        await this.validateTeamsAndThreats(missionData.teamIds, missionData.threatIds);
        return await this.missionRepository.create(missionData);
    }

    public async update(id: number, missionData: any): Promise<Mission | undefined> {
        await this.validateTeamsAndThreats(missionData.teamIds, missionData.threatIds);
        return await this.missionRepository.update(id, missionData);
    }

    public async patch(id: number, missionData: any): Promise<Mission | undefined> {
        const missionOriginal = await this.missionRepository.getById(id);

        if (missionOriginal === undefined) {
            return undefined;
        }

        let finalTeamIds = missionOriginal.teamIds;
        if (missionData.teamIds !== undefined) {
            finalTeamIds = missionData.teamIds;
        }

        let finalThreatIds = missionOriginal.threatIds;
        if (missionData.threatIds !== undefined) {
            finalThreatIds = missionData.threatIds;
        }

        await this.validateTeamsAndThreats(finalTeamIds, finalThreatIds);

        return await this.missionRepository.patch(id, missionData);
    }

    public async delete(id: number): Promise<boolean> {
        return await this.missionRepository.delete(id);
    }

    private async validateTeamsAndThreats(teamIds: number[], threatIds: number[]): Promise<void> {
        if (teamIds !== undefined && teamIds.length > 0) {
            for (let i = 0; i < teamIds.length; i++) {
                const teamId = teamIds[i];
                if (teamId !== undefined) {
                    const team = await this.teamRepository.getById(teamId);
                    if (team === undefined) {
                        throw new Error(`Violação de Regra: A equipe de ID ${teamId} não existe.`);
                    }
                    if (team.status !== TeamStatus.active) {
                        throw new Error(`Violação de Regra: A equipe '${team.name}' não está ativa para missões.`);
                    }
                }
            }
        }

        if (threatIds !== undefined && threatIds.length > 0) {
            for (let i = 0; i < threatIds.length; i++) {
                const threatId = threatIds[i];
                if (threatId !== undefined) {
                    const threat = await this.threatRepository.getById(threatId);
                    if (threat === undefined) {
                        throw new Error(`Violação de Regra: A ameaça de ID ${threatId} não existe.`);
                    }
                }
            }
        }
    }
}
