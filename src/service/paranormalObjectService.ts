import { ParanormalObject } from "../model/paranormalObjectModel";
import { ParanormalObjectRepository } from "../repository/paranormalObjectRepository";

export class ParanormalObjectService {
    private paranormalObjectRepository: ParanormalObjectRepository;

    constructor() {
        this.paranormalObjectRepository = new ParanormalObjectRepository();
    }

    public async getAll(): Promise<ParanormalObject[]> {
        return await this.paranormalObjectRepository.getAll();
    }

    public async getById(id: number): Promise<ParanormalObject | undefined> {
        return await this.paranormalObjectRepository.getById(id);
    }

    public async create(objectData: any): Promise<ParanormalObject> {
        return await this.paranormalObjectRepository.create(objectData);
    }

    public async update(id: number, objectData: any): Promise<ParanormalObject | undefined> {
        return await this.paranormalObjectRepository.update(id, objectData);
    }

    public async patch(id: number, objectData: any): Promise<ParanormalObject | undefined> {
        return await this.paranormalObjectRepository.patch(id, objectData);
    }

    public async delete(id: number): Promise<boolean> {
        return await this.paranormalObjectRepository.delete(id);
    }
}
