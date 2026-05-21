import { Request, Response } from "express";
import { MissionService } from "../service/missionService";
import { MissionFilters } from "../model/missionModel";

export class MissionController {

    public static async getAll(req: Request, res: Response) {
        const filters: MissionFilters = {
            page: Number(req.query.page) || 1,
            limit: Number(req.query.limit) || 10,
            sortBy: req.query.sortBy as string || "id",
            order: req.query.order as string || "asc",
            title: req.query.title as string,
            dangerLevel: req.query.dangerLevel as string,
            status: req.query.status as string
        };

        const missions = await MissionService.getAll(filters);
        return res.json(missions);
    }

    public static async getById(req: Request, res: Response) {
        const id = Number(req.params.id);
        const mission = await MissionService.getById(id);

        if (mission === undefined) {
            return res.status(404).json({ erro: "Missão não encontrada" });
        }

        return res.json(mission);
    }

    public static async create(req: Request, res: Response) {
        try {
            const { title, description, dangerLevel, status } = req.body;
            if (!title || !description || !dangerLevel || !status) {
                return res.status(400).json({ erro: "Todos os campos obrigatórios devem ser preenchidos (title, description, dangerLevel, status)." });
            }

            const missionData = req.body;
            const newMission = await MissionService.create(missionData);
            return res.status(201).json(newMission);
        } catch (error: any) {
            return res.status(400).json({ erro: error.message });
        }
    }

    public static async update(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const missionData = req.body;

            const updatedMission = await MissionService.update(id, missionData);

            if (updatedMission === undefined) {
                return res.status(404).json({ erro: "Missão não encontrada" });
            }

            return res.json(updatedMission);
        } catch (error: any) {
            return res.status(400).json({ erro: error.message });
        }
    }

    public static async patch(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const missionData = req.body;

            const patchedMission = await MissionService.patch(id, missionData);

            if (patchedMission === undefined) {
                return res.status(404).json({ erro: "Missão não encontrada" });
            }

            return res.json(patchedMission);
        } catch (error: any) {
            return res.status(400).json({ erro: error.message });
        }
    }

    public static async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const foiRemovido = await MissionService.delete(id);

            if (foiRemovido === false) {
                return res.status(404).json({ erro: "Missão não encontrada" });
            }

            return res.status(204).send();
        } catch (error: any) {
            return res.status(400).json({ erro: error.message });
        }
    }
}
