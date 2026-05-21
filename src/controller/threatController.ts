import { Request, Response } from "express";
import { ThreatService } from "../service/threatService";
import { ThreatFilters } from "../model/threatModel";

export class ThreatController {

    public static async getAll(req: Request, res: Response) {
        const filters: ThreatFilters = {
            page: Number(req.query.page) || 1,
            limit: Number(req.query.limit) || 10,
            sortBy: req.query.sortBy as string || "id",
            order: req.query.order as string || "asc",
            name: req.query.name as string,
            type: req.query.type as string,
            dangerLevel: req.query.dangerLevel as string,
            status: req.query.status as string
        };

        const threats = await ThreatService.getAll(filters);
        return res.json(threats);
    }

    public static async getById(req: Request, res: Response) {
        const id = Number(req.params.id);
        const threat = await ThreatService.getById(id);

        if (threat === undefined) {
            return res.status(404).json({ erro: "Ameaça não encontrada" });
        }

        return res.json(threat);
    }

    public static async create(req: Request, res: Response) {
        try {
            const { name, type, dangerLevel, description, status } = req.body;
            if (!name || !type || !dangerLevel || !description || !status) {
                return res.status(400).json({ erro: "Todos os campos obrigatórios devem ser preenchidos (name, type, dangerLevel, description, status)." });
            }

            const threatData = req.body;
            const newThreat = await ThreatService.create(threatData);
            return res.status(201).json(newThreat);
        } catch (error: any) {
            return res.status(400).json({ erro: error.message });
        }
    }

    public static async update(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const threatData = req.body;

            const updatedThreat = await ThreatService.update(id, threatData);

            if (updatedThreat === undefined) {
                return res.status(404).json({ erro: "Ameaça não encontrada" });
            }

            return res.json(updatedThreat);
        } catch (error: any) {
            return res.status(400).json({ erro: error.message });
        }
    }

    public static async patch(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const threatData = req.body;

            const patchedThreat = await ThreatService.patch(id, threatData);

            if (patchedThreat === undefined) {
                return res.status(404).json({ erro: "Ameaça não encontrada" });
            }

            return res.json(patchedThreat);
        } catch (error: any) {
            return res.status(400).json({ erro: error.message });
        }
    }

    public static async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const foiRemovido = await ThreatService.delete(id);

            if (foiRemovido === false) {
                return res.status(404).json({ erro: "Ameaça não encontrada" });
            }

            return res.status(204).send();
        } catch (error: any) {
            return res.status(400).json({ erro: error.message });
        }
    }
}
