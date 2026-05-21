export interface ParanormalObject {
    id: number;
    name: string;
    classification: ObjectClassification;
    effect: string;
    dangerLevel: ObjectDangerLevel;
    status: ObjectStatus;
}

export enum ObjectClassification {
    cursed = "cursed",
    artifact = "artifact",
    relic = "relic"
}

export enum ObjectDangerLevel {
    low = "low",
    medium = "medium",
    high = "high",
    extreme = "extreme"
}

export enum ObjectStatus {
    secured = "secured",
    inUse = "inUse",
    missing = "missing"
}

export interface ParanormalObjectFilters {
    page: number;
    limit: number;
    sortBy: string;
    order: string;
    name?: string | undefined;
    classification?: string | undefined;
    dangerLevel?: string | undefined;
    status?: string | undefined;
}
