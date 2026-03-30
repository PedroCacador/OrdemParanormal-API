import { Request, Response } from "express";
import { AgenteService } from "../service/agenteService";

const service = new AgenteService();

export class AgenteController {

    getAll(req: Request, res: Response) {
        const agentes = service.getAll();
        return res.json(agentes);
    }

    getById(req: Request, res: Response) {
        const id = Number(req.params.id);

        const agente = service.getById(id);

        if (!agente) {
            return res.status(404).json({ erro: "Agente não encontrado" });
        }

        return res.json(agente);
    }

    create(req: Request, res: Response) {
        const agente = service.create(req.body);
        return res.status(201).json(agente);
    }

    update(req: Request, res: Response) {
        const id = Number(req.params.id);

        const agente = service.update(id, req.body);

        if (!agente) {
            return res.status(404).json({ erro: "Agente não encontrado" });
        }

        return res.json(agente);
    }

    delete(req: Request, res: Response) {
        const id = Number(req.params.id);

        const removido = service.delete(id);

        if (!removido) {
            return res.status(404).json({ erro: "Agente não encontrado" });
        }

        return res.status(204).send();
    }
}