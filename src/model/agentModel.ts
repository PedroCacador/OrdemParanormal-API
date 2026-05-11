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
