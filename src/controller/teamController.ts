import { Request, Response } from "express";
import { TeamService } from "../service/teamService";

const service = new TeamService();

export class TeamController {

    getAll(req: Request, res: Response) {
        return res.json(service.getAll());
    }

    getById(req: Request, res: Response) {
        const id = Number(req.params.id);
        const team = service.getById(id);

        if (!team) {
            return res.status(404).json({ erro: "Equipe não encontrada" });
        }

        return res.json(team);
    }

    create(req: Request, res: Response) {
        const team = service.create(req.body);
        return res.status(201).json(team);
    }

    update(req: Request, res: Response) {
        const id = Number(req.params.id);
        const team = service.update(id, req.body);

        if (!team) {
            return res.status(404).json({ erro: "Equipe não encontrada" });
        }

        return res.json(team);
    }

    delete(req: Request, res: Response) {
        const id = Number(req.params.id);
        const removed = service.delete(id);

        if (!removed) {
            return res.status(404).json({ erro: "Equipe não encontrada" });
        }

        return res.status(204).send();
    }
}