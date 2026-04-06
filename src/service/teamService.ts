import { Team } from "../model/teamModel";
import { teams } from "../data/teamsData";

export class TeamService {

    getAll(): Team[] {
        return teams;
    }

    getById(id: number) {
        return teams.find(t => t.id === id);
    }

    create(team: Team) {
        teams.push(team);
        return team;
    }

    update(id: number, updatedTeam: Team) {
        const index = teams.findIndex(t => t.id === id);

        if (index === -1) {
            return undefined;
        }

        teams[index] = updatedTeam;

        return teams[index];
    }

    delete(id: number): boolean {
        const index = teams.findIndex(t => t.id === id);

        if (index === -1) {
            return false;
        }

        teams.splice(index, 1);
        return true;
    }
}