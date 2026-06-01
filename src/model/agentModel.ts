export interface Agent {
    id: number;
    teamId?: number;
    name: string;
    codename: string;
    level: AgentLevel;
    specialty: AgentSpecialty;
    status: AgentStatus;
    email: string;
    password: string;
}

export type CreateAgentDTO = Omit<Agent, "id">;

export type UpdateAgentDTO = Omit<Agent, "id">;

export type PatchAgentDTO = Partial<Omit<Agent, "id">>;

export enum AgentLevel {
    recruit = "recruit",
    operator = "operator",
    veteran = "veteran"
}

export enum AgentSpecialty {
    combatant = "combatant",
    specialist = "specialist",
    occultist = "occultist"
}

export enum AgentStatus {
    active = "active",
    onLeave = "onLeave",
    missing = "missing",
    dead = "dead"
}

export interface AgentFilters {
    page: number;
    limit: number;
    sortBy: string;
    order: string;
    name?: string | undefined;
    level?: string | undefined;
    specialty?: string | undefined;
    status?: string | undefined;
    teamId?: number | undefined;
}
