import { ParanormalObject, ParanormalObjectFilters } from "../model/paranormalObjectModel";
import { ParanormalObjectRepository } from "../repository/paranormalObjectRepository";

export class ParanormalObjectService {

    public static async getAll(filters: ParanormalObjectFilters): Promise<ParanormalObject[]> {
        return await ParanormalObjectRepository.getAll(filters);
    }

    public static async getById(id: number): Promise<ParanormalObject | undefined> {
        return await ParanormalObjectRepository.getById(id);
    }

    public static async create(objectData: any): Promise<ParanormalObject> {
        return await ParanormalObjectRepository.create(objectData);
    }

    public static async update(id: number, objectData: any): Promise<ParanormalObject | undefined> {
        return await ParanormalObjectRepository.update(id, objectData);
    }

    public static async patch(id: number, objectData: any): Promise<ParanormalObject | undefined> {
        return await ParanormalObjectRepository.patch(id, objectData);
    }

    public static async delete(id: number): Promise<boolean> {
        return await ParanormalObjectRepository.delete(id);
    }
}
