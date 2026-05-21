import { ParanormalObject, ParanormalObjectFilters } from "../model/paranormalObjectModel";
import database from "../database";

export class ParanormalObjectRepository {

    public static async getAll(filters: ParanormalObjectFilters): Promise<ParanormalObject[]> {
        let query = database("paranormal_objects").select("*");

        if (filters.name) {
            query = query.where("name", "like", `%${filters.name}%`);
        }
        if (filters.classification) {
            query = query.where("classification", filters.classification);
        }
        if (filters.dangerLevel) {
            query = query.where("dangerLevel", filters.dangerLevel);
        }
        if (filters.status) {
            query = query.where("status", filters.status);
        }

        const paranormalObjects = await query
            .orderBy(filters.sortBy, filters.order)
            .limit(filters.limit)
            .offset((filters.page - 1) * filters.limit);

        return paranormalObjects;
    }

    public static async getById(id: number): Promise<ParanormalObject | undefined> {
        const object = await database("paranormal_objects").where({ id: id }).first();
        return object;
    }

    public static async create(objectData: any): Promise<ParanormalObject> {
        const [insertedId] = await database("paranormal_objects").insert({
            name: objectData.name,
            classification: objectData.classification,
            effect: objectData.effect,
            dangerLevel: objectData.dangerLevel,
            status: objectData.status
        });

        if (insertedId === undefined) {
            throw new Error("Erro crítico: banco não retornou o ID gerado.");
        }

        const newObject = await ParanormalObjectRepository.getById(insertedId);

        if (newObject === undefined) {
            throw new Error("Erro ao criar objeto no banco de dados.");
        }

        return newObject;
    }

    public static async update(id: number, objectData: any): Promise<ParanormalObject | undefined> {
        const rowsUpdated = await database("paranormal_objects").where({ id: id }).update({
            name: objectData.name,
            classification: objectData.classification,
            effect: objectData.effect,
            dangerLevel: objectData.dangerLevel,
            status: objectData.status
        });

        if (rowsUpdated === 0) {
            return undefined;
        }

        const updatedObject = await ParanormalObjectRepository.getById(id);
        return updatedObject;
    }

    public static async patch(id: number, objectData: any): Promise<ParanormalObject | undefined> {
        const rowsUpdated = await database("paranormal_objects").where({ id: id }).update(objectData);

        if (rowsUpdated === 0) {
            return undefined;
        }

        const updatedObject = await ParanormalObjectRepository.getById(id);
        return updatedObject;
    }

    public static async delete(id: number): Promise<boolean> {
        const rowsDeleted = await database("paranormal_objects").where({ id: id }).del();
        return rowsDeleted > 0;
    }
}
