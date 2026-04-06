export interface Agent {
    id: number;
    teamId?: number;
    name: string;
    codename: string;
    level: AgentLevel;
    specialty: AgentSpecialty;
    status: AgentStatus;
}

export enum AgentLevel {
    recruit,
    operator,
    veteran
}

export enum AgentSpecialty {
    combatant,
    specialist,
    occultist
}

export enum AgentStatus {
    active,
    onLeave,
    missing,
    dead
}
