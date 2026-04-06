export interface Team { 
    id: number;
    name: string;
    specialization: Specialization;
    teamStatus: teamStatus;
    agentIds?: number[];
}

enum Specialization {
    containment,
    investigation,
    suport
}

enum teamStatus {
    active,
    dissolved,
    inactive
}