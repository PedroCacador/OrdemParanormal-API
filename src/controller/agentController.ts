import { Request, Response } from "express";
import { AgentService } from "../service/agentService";

const agentService = new AgentService();

export class AgentController {

    public async getAll(req: Request, res: Response) {
        const agents = await agentService.getAll();
        return res.json(agents);
    }

    public async getById(req: Request, res: Response) {
        const id = Number(req.params.id);
        const agent = await agentService.getById(id);

        if (agent === undefined) {
            return res.status(404).json({ erro: "Agente não encontrado" });
        }

        return res.json(agent);
    }

    public async create(req: Request, res: Response) {
        try {
            const agentData = req.body;
            const newAgent = await agentService.create(agentData);
            return res.status(201).json(newAgent);
        } catch (error: any) {
            return res.status(400).json({ erro: error.message });
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const agentData = req.body;

            const updatedAgent = await agentService.update(id, agentData);

            if (updatedAgent === undefined) {
                return res.status(404).json({ erro: "Agente não encontrado" });
            }

            return res.json(updatedAgent);
        } catch (error: any) {
            return res.status(400).json({ erro: error.message });
        }
    }

    public async patch(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const agentData = req.body;

            const patchedAgent = await agentService.patch(id, agentData);

            if (patchedAgent === undefined) {
                return res.status(404).json({ erro: "Agente não encontrado" });
            }

            return res.json(patchedAgent);
        } catch (error: any) {
            return res.status(400).json({ erro: error.message });
        }
    }

    public async delete(req: Request, res: Response) {
        const id = Number(req.params.id);
        const foiRemovido = await agentService.delete(id);

        if (foiRemovido === false) {
            return res.status(404).json({ erro: "Agente não encontrado" });
        }

        return res.status(204).send();
    }
}
