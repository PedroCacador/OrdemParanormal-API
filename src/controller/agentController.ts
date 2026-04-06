import { Request, Response } from "express";
import { AgentService } from "../service/agentService";

const service = new AgentService();

export class AgentController {

    getAll(req: Request, res: Response) {
        const agents = service.getAll();
        return res.json(agents);
    }

    getById(req: Request, res: Response) {
        const id = Number(req.params.id);

        const agent = service.getById(id);

        if (!agent) {
            return res.status(404).json({ error: "Agent not found" });
        }

        return res.json(agent);
    }

    create(req: Request, res: Response) {
        const agent = service.create(req.body);
        return res.status(201).json(agent);
    }

    update(req: Request, res: Response) {
        const id = Number(req.params.id);

        const agent = service.update(id, req.body);

        if (!agent) {
            return res.status(404).json({ error: "Agent not found" });
        }

        return res.json(agent);
    }

    delete(req: Request, res: Response) {
        const id = Number(req.params.id);

        const removed = service.delete(id);

        if (!removed) {
            return res.status(404).json({ error: "Agent not found" });
        }

        return res.status(204).send();
    }
}
