import { Request, Response } from "express";
import { ParanormalObjectService } from "../service/paranormalObjectService";
import { ParanormalObjectFilters } from "../model/paranormalObjectModel";

export class ParanormalObjectController {

    public static async getAll(req: Request, res: Response) {
        const filters: ParanormalObjectFilters = {
            page: Number(req.query.page) || 1,
            limit: Number(req.query.limit) || 10,
            sortBy: req.query.sortBy as string || "id",
            order: req.query.order as string || "asc",
            name: req.query.name as string,
            classification: req.query.classification as string,
            dangerLevel: req.query.dangerLevel as string,
            status: req.query.status as string
        };

        const objects = await ParanormalObjectService.getAll(filters);
        return res.json(objects);
    }

    public static async getById(req: Request, res: Response) {
        const id = Number(req.params.id);
        const object = await ParanormalObjectService.getById(id);

        if (object === undefined) {
            return res.status(404).json({ erro: "Objeto paranormal não encontrado" });
        }

        return res.json(object);
    }

    public static async create(req: Request, res: Response) {
        try {
            const { name, classification, effect, dangerLevel, status } = req.body;
            if (!name || !classification || !effect || !dangerLevel || !status) {
                return res.status(400).json({ erro: "Todos os campos obrigatórios devem ser preenchidos (name, classification, effect, dangerLevel, status)." });
            }

            const objectData = req.body;
            const newObject = await ParanormalObjectService.create(objectData);
            return res.status(201).json(newObject);
        } catch (error: any) {
            return res.status(400).json({ erro: error.message });
        }
    }

    public static async update(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const objectData = req.body;

            const updatedObject = await ParanormalObjectService.update(id, objectData);

            if (updatedObject === undefined) {
                return res.status(404).json({ erro: "Objeto não encontrado" });
            }

            return res.json(updatedObject);
        } catch (error: any) {
            return res.status(400).json({ erro: error.message });
        }
    }

    public static async patch(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const objectData = req.body;

            const patchedObject = await ParanormalObjectService.patch(id, objectData);

            if (patchedObject === undefined) {
                return res.status(404).json({ erro: "Objeto não encontrado" });
            }

            return res.json(patchedObject);
        } catch (error: any) {
            return res.status(400).json({ erro: error.message });
        }
    }

    public static async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const foiRemovido = await ParanormalObjectService.delete(id);

            if (foiRemovido === false) {
                return res.status(404).json({ erro: "Objeto paranormal não encontrado" });
            }

            return res.status(204).send();
        } catch (error: any) {
            return res.status(400).json({ erro: error.message });
        }
    }
}
