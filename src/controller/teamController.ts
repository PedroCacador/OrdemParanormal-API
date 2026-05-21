import { Request, Response } from "express";
import { TeamService } from "../service/teamService";
import { TeamFilters } from "../model/teamModel";

const teamService = new TeamService();

export class TeamController {

    public async getAll(req: Request, res: Response) {
        const filters: TeamFilters = {
            page: Number(req.query.page) || 1,
            limit: Number(req.query.limit) || 10,
            sortBy: req.query.sortBy as string || "id",
            order: req.query.order as string || "asc"
        };

        const teams = await teamService.getAll(filters);
        return res.json(teams);
    }

    public async getById(req: Request, res: Response) {
        const id = Number(req.params.id);
        const team = await teamService.getById(id);

        if (team === undefined) {
            return res.status(404).json({ erro: "Equipe não encontrada" });
        }

        return res.json(team);
    }

    public async create(req: Request, res: Response) {
        try {
            const teamData = req.body;
            const newTeam = await teamService.create(teamData);
            return res.status(201).json(newTeam);
        } catch (error: any) {
            return res.status(400).json({ erro: error.message });
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const teamData = req.body;
            const updatedTeam = await teamService.update(id, teamData);

            if (updatedTeam === undefined) {
                return res.status(404).json({ erro: "Equipe não encontrada" });
            }

            return res.json(updatedTeam);
        } catch (error: any) {
            return res.status(400).json({ erro: error.message });
        }
    }

    public async patch(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const teamData = req.body;
            const patchedTeam = await teamService.patch(id, teamData);

            if (patchedTeam === undefined) {
                return res.status(404).json({ erro: "Equipe não encontrada" });
            }

            return res.json(patchedTeam);
        } catch (error: any) {
            return res.status(400).json({ erro: error.message });
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const foiRemovido = await teamService.delete(id);

            if (foiRemovido === false) {
                return res.status(404).json({ erro: "Equipe não encontrada" });
            }

            return res.status(204).send();
        } catch (error: any) {
            return res.status(400).json({ erro: "Erro de integridade: " + error.message });
        }
    }
}