import { Request, Response } from "express";
import { ParanormalObjectService } from "../service/paranormalObjectService";

const paranormalObjectService = new ParanormalObjectService();

export class ParanormalObjectController {

    public async getAll(req: Request, res: Response) {
        const objects = await paranormalObjectService.getAll();
        return res.json(objects);
    }

    public async getById(req: Request, res: Response) {
        const id = Number(req.params.id);
        const object = await paranormalObjectService.getById(id);

        if (object === undefined) {
            return res.status(404).json({ erro: "Objeto paranormal não encontrado" });
        }

        return res.json(object);
    }

    public async create(req: Request, res: Response) {
        try {
            const objectData = req.body;
            const newObject = await paranormalObjectService.create(objectData);
            return res.status(201).json(newObject);
        } catch (error: any) {
            return res.status(400).json({ erro: error.message });
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const objectData = req.body;
            const updatedObject = await paranormalObjectService.update(id, objectData);

            if (updatedObject === undefined) {
                return res.status(404).json({ erro: "Objeto paranormal não encontrado" });
            }

            return res.json(updatedObject);
        } catch (error: any) {
            return res.status(400).json({ erro: error.message });
        }
    }

    public async patch(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const objectData = req.body;
            const patchedObject = await paranormalObjectService.patch(id, objectData);

            if (patchedObject === undefined) {
                return res.status(404).json({ erro: "Objeto paranormal não encontrado" });
            }

            return res.json(patchedObject);
        } catch (error: any) {
            return res.status(400).json({ erro: error.message });
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const foiRemovido = await paranormalObjectService.delete(id);

            if (foiRemovido === false) {
                return res.status(404).json({ erro: "Objeto paranormal não encontrado" });
            }

            return res.status(204).send();
        } catch (error: any) {
            return res.status(400).json({ erro: error.message });
        }
    }
}
