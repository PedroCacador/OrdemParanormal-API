export interface Threat {
    id: number;
    name: string;
    type: ThreatType;
    dangerLevel: ThreatDangerLevel;
    description: string;
    status: ThreatStatus;
}

export enum ThreatType { 
    blood = "blood",
    death = "death",
    energy = "energy",
    knowledge = "knowledge",
    fear = "fear"
}

export enum ThreatDangerLevel {
    low = "low",
    medium = "medium",
    high = "high",
    extreme = "extreme"
}

export enum ThreatStatus {
    active = "active",
    contained = "contained",
    eliminated = "eliminated"
}

export interface ThreatFilters {
    page: number;
    limit: number;
    sortBy: string;
    order: string;
    name?: string | undefined;
    type?: string | undefined;
    dangerLevel?: string | undefined;
    status?: string | undefined;
}
