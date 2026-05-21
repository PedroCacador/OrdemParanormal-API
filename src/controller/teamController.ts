import { Request, Response } from "express";
import { TeamService } from "../service/teamService";
import { TeamFilters } from "../model/teamModel";

export class TeamController {

    public static async getAll(req: Request, res: Response) {
        const filters: TeamFilters = {
            page: Number(req.query.page) || 1,
            limit: Number(req.query.limit) || 10,
            sortBy: req.query.sortBy as string || "id",
            order: req.query.order as string || "asc",
            name: req.query.name as string,
            specialization: req.query.specialization as string,
            status: req.query.status as string
        };

        const teams = await TeamService.getAll(filters);
        return res.json(teams);
    }

    public static async getById(req: Request, res: Response) {
        const id = Number(req.params.id);
        const team = await TeamService.getById(id);

        if (team === undefined) {
            return res.status(404).json({ erro: "Equipe não encontrada" });
        }

        return res.json(team);
    }

    public static async create(req: Request, res: Response) {
        try {
            const { name, specialization, status } = req.body;
            if (!name || !specialization || !status) {
                return res.status(400).json({ erro: "Todos os campos obrigatórios devem ser preenchidos (name, specialization, status)." });
            }

            const teamData = req.body;
            const newTeam = await TeamService.create(teamData);
            return res.status(201).json(newTeam);
        } catch (error: any) {
            return res.status(400).json({ erro: error.message });
        }
    }

    public static async update(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const teamData = req.body;

            const updatedTeam = await TeamService.update(id, teamData);

            if (updatedTeam === undefined) {
                return res.status(404).json({ erro: "Equipe não encontrada" });
            }

            return res.json(updatedTeam);
        } catch (error: any) {
            return res.status(400).json({ erro: error.message });
        }
    }

    public static async patch(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const teamData = req.body;

            const patchedTeam = await TeamService.patch(id, teamData);

            if (patchedTeam === undefined) {
                return res.status(404).json({ erro: "Equipe não encontrada" });
            }

            return res.json(patchedTeam);
        } catch (error: any) {
            return res.status(400).json({ erro: error.message });
        }
    }

    public static async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const foiRemovido = await TeamService.delete(id);

            if (foiRemovido === false) {
                return res.status(404).json({ erro: "Equipe não encontrada" });
            }

            return res.status(204).send();
        } catch (error: any) {
            return res.status(400).json({ erro: "Erro de integridade: " + error.message });
        }
    }
}