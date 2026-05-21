import { Threat, ThreatFilters } from "../model/threatModel";
import { ThreatRepository } from "../repository/threatRepository";

export class ThreatService {

    public static async getAll(filters: ThreatFilters): Promise<Threat[]> {
        return await ThreatRepository.getAll(filters);
    }

    public static async getById(id: number): Promise<Threat | undefined> {
        return await ThreatRepository.getById(id);
    }

    public static async create(threatData: any): Promise<Threat> {
        return await ThreatRepository.create(threatData);
    }

    public static async update(id: number, threatData: any): Promise<Threat | undefined> {
        return await ThreatRepository.update(id, threatData);
    }

    public static async patch(id: number, threatData: any): Promise<Threat | undefined> {
        return await ThreatRepository.patch(id, threatData);
    }

    public static async delete(id: number): Promise<boolean> {
        return await ThreatRepository.delete(id);
    }
}
