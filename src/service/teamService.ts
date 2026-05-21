import { Team, TeamFilters } from "../model/teamModel";
import { TeamRepository } from "../repository/teamRepository";

export class TeamService {

    public static async getAll(filters: TeamFilters): Promise<Team[]> {
        return await TeamRepository.getAll(filters);
    }

    public static async getById(id: number): Promise<Team | undefined> {
        return await TeamRepository.getById(id);
    }

    public static async create(teamData: any): Promise<Team> {
        return await TeamRepository.create(teamData);
    }

    public static async update(id: number, teamData: any): Promise<Team | undefined> {
        return await TeamRepository.update(id, teamData);
    }

    public static async patch(id: number, teamData: any): Promise<Team | undefined> {
        return await TeamRepository.patch(id, teamData);
    }

    public static async delete(id: number): Promise<boolean> {
        return await TeamRepository.delete(id);
    }
}