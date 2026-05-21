import { Request, Response } from "express";
import { ThreatService } from "../service/threatService";
import { ThreatFilters } from "../model/threatModel";

const threatService = new ThreatService();

export class ThreatController {

    public async getAll(req: Request, res: Response) {
        const filters: ThreatFilters = {
            page: Number(req.query.page) || 1,
            limit: Number(req.query.limit) || 10,
            sortBy: req.query.sortBy as string || "id",
            order: req.query.order as string || "asc"
        };

        const threats = await threatService.getAll(filters);
        return res.json(threats);
    }

    public async getById(req: Request, res: Response) {
        const id = Number(req.params.id);
        const threat = await threatService.getById(id);

        if (threat === undefined) {
            return res.status(404).json({ erro: "Ameaça não encontrada" });
        }

        return res.json(threat);
    }

    public async create(req: Request, res: Response) {
        try {
            const threatData = req.body;
            const newThreat = await threatService.create(threatData);
            return res.status(201).json(newThreat);
        } catch (error: any) {
            return res.status(400).json({ erro: error.message });
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const threatData = req.body;
            const updatedThreat = await threatService.update(id, threatData);

            if (updatedThreat === undefined) {
                return res.status(404).json({ erro: "Ameaça não encontrada" });
            }

            return res.json(updatedThreat);
        } catch (error: any) {
            return res.status(400).json({ erro: error.message });
        }
    }

    public async patch(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const threatData = req.body;
            const patchedThreat = await threatService.patch(id, threatData);

            if (patchedThreat === undefined) {
                return res.status(404).json({ erro: "Ameaça não encontrada" });
            }

            return res.json(patchedThreat);
        } catch (error: any) {
            return res.status(400).json({ erro: error.message });
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const foiRemovido = await threatService.delete(id);

            if (foiRemovido === false) {
                return res.status(404).json({ erro: "Ameaça não encontrada" });
            }

            return res.status(204).send();
        } catch (error: any) {
            return res.status(400).json({ erro: error.message });
        }
    }
}
