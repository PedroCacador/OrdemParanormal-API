import { ParanormalObject, ParanormalObjectFilters } from "../model/paranormalObjectModel";
import database from "../database";

export class ParanormalObjectRepository {

    public async getAll(filters: ParanormalObjectFilters): Promise<ParanormalObject[]> {
        const paranormalObjects = await database("paranormal_objects")
            .select("*")
            .orderBy(filters.sortBy, filters.order)
            .limit(filters.limit)
            .offset((filters.page - 1) * filters.limit);

        return paranormalObjects;
    }

    public async getById(id: number): Promise<ParanormalObject | undefined> {
        return await database("paranormal_objects").where({ id: id }).first();
    }

    public async create(objectData: any): Promise<ParanormalObject> {
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

        const newObject = await this.getById(insertedId);
        if (newObject === undefined) {
            throw new Error("Erro ao criar objeto paranormal no banco de dados.");
        }
        return newObject;
    }

    public async update(id: number, objectData: any): Promise<ParanormalObject | undefined> {
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

        return await this.getById(id);
    }

    public async patch(id: number, objectData: any): Promise<ParanormalObject | undefined> {
        const rowsUpdated = await database("paranormal_objects").where({ id: id }).update(objectData);

        if (rowsUpdated === 0) {
            return undefined;
        }

        return await this.getById(id);
    }

    public async delete(id: number): Promise<boolean> {
        const rowsDeleted = await database("paranormal_objects").where({ id: id }).del();
        return rowsDeleted > 0;
    }
}
