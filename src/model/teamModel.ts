export interface Team {
    id: number;
    name: string;
    specialization: TeamSpecialization;
    status: TeamStatus;
    agentIds?: number[];
}

export enum TeamSpecialization {
    containment = "containment",
    investigation = "investigation",
    support = "support"
}

export enum TeamStatus {
    active = "active",
    dissolved = "dissolved",
    inactive = "inactive"
}

export interface TeamFilters {
    page: number;
    limit: number;
    sortBy: string;
    order: string;
}