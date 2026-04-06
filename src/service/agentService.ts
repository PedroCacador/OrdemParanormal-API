import { Agent } from "../model/agentModel"

let agents: Agent[] = [];

export class AgentService {
    getAll(): Agent[] {
        return agents;
    }
    getById(id: number) {
        return agents.find(a => a.id === id);
    }
    create(agent: Agent) {
        agents.push(agent);
        return agent;
    }
    update(id: number, updatedAgent: Agent) {
        const index = agents.findIndex(a => a.id === id);

        if (index === -1) {
            return undefined;
        }

        agents[index] = updatedAgent;

        return agents[index];
    }
    delete(id: number): boolean {
        const index = agents.findIndex(a => a.id === id);

        if (index === -1) {
            return false;
        }
        agents.splice(index, 1);

        return true;
    }
}