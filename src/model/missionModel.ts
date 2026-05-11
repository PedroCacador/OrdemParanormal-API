export interface Mission {
    id: number;
    title: string;
    description: string;
    dangerLevel: MissionDangerLevel;
    status: MissionStatus;
    startDate: Date;
    endDate?: Date;
    teamIds: number[];
    threatIds: number[];
}

export enum MissionDangerLevel {
    low = "low",
    medium = "medium",
    high = "high",
    extreme = "extreme"
}

export enum MissionStatus {
    planned = "planned",
    inProgress = "inProgress",
    completed = "completed",
    failed = "failed"
}
