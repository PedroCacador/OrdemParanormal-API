import { Threat } from "../model/threatModel";
import { ThreatRepository } from "../repository/threatRepository";

export class ThreatService {
    private threatRepository: ThreatRepository;

    constructor() {
        this.threatRepository = new ThreatRepository();
    }

    public async getAll(): Promise<Threat[]> {
        return await this.threatRepository.getAll();
    }

    public async getById(id: number): Promise<Threat | undefined> {
        return await this.threatRepository.getById(id);
    }

    public async create(threatData: any): Promise<Threat> {
        return await this.threatRepository.create(threatData);
    }

    public async update(id: number, threatData: any): Promise<Threat | undefined> {
        return await this.threatRepository.update(id, threatData);
    }

    public async patch(id: number, threatData: any): Promise<Threat | undefined> {
        return await this.threatRepository.patch(id, threatData);
    }

    public async delete(id: number): Promise<boolean> {
        return await this.threatRepository.delete(id);
    }
}
