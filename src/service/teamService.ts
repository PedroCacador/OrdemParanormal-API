import { Team, TeamFilters } from "../model/teamModel";
import { TeamRepository } from "../repository/teamRepository";

export class TeamService {
    private teamRepository: TeamRepository;

    constructor() {
        this.teamRepository = new TeamRepository();
    }

    public async getAll(filters: TeamFilters): Promise<Team[]> {
        return await this.teamRepository.getAll(filters);
    }

    public async getById(id: number): Promise<Team | undefined> {
        return await this.teamRepository.getById(id);
    }

    public async create(teamData: any): Promise<Team> {
        return await this.teamRepository.create(teamData);
    }

    public async update(id: number, teamData: any): Promise<Team | undefined> {
        return await this.teamRepository.update(id, teamData);
    }

    public async patch(id: number, teamData: any): Promise<Team | undefined> {
        return await this.teamRepository.patch(id, teamData);
    }

    public async delete(id: number): Promise<boolean> {
        return await this.teamRepository.delete(id);
    }
}