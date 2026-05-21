import { Request, Response } from "express";
import { MissionService } from "../service/missionService";
import { MissionFilters } from "../model/missionModel";

const missionService = new MissionService();

export class MissionController {

    public async getAll(req: Request, res: Response) {
        const filters: MissionFilters = {
            page: Number(req.query.page) || 1,
            limit: Number(req.query.limit) || 10,
            sortBy: req.query.sortBy as string || "id",
            order: req.query.order as string || "asc"
        };

        const missions = await missionService.getAll(filters);
        return res.json(missions);
    }

    public async getById(req: Request, res: Response) {
        const id = Number(req.params.id);
        const mission = await missionService.getById(id);

        if (mission === undefined) {
            return res.status(404).json({ erro: "Missão não encontrada" });
        }

        return res.json(mission);
    }

    public async create(req: Request, res: Response) {
        try {
            const missionData = req.body;
            const newMission = await missionService.create(missionData);
            return res.status(201).json(newMission);
        } catch (error: any) {
            return res.status(400).json({ erro: error.message });
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const missionData = req.body;
            const updatedMission = await missionService.update(id, missionData);

            if (updatedMission === undefined) {
                return res.status(404).json({ erro: "Missão não encontrada" });
            }

            return res.json(updatedMission);
        } catch (error: any) {
            return res.status(400).json({ erro: error.message });
        }
    }

    public async patch(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const missionData = req.body;
            const patchedMission = await missionService.patch(id, missionData);

            if (patchedMission === undefined) {
                return res.status(404).json({ erro: "Missão não encontrada" });
            }

            return res.json(patchedMission);
        } catch (error: any) {
            return res.status(400).json({ erro: error.message });
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const foiRemovido = await missionService.delete(id);

            if (foiRemovido === false) {
                return res.status(404).json({ erro: "Missão não encontrada" });
            }

            return res.status(204).send();
        } catch (error: any) {
            return res.status(400).json({ erro: error.message });
        }
    }
}
