import { Request, Response } from "express";
import { AgentService } from "../service/agentService";
import { AgentFilters, CreateAgentDTO, UpdateAgentDTO, PatchAgentDTO, AgentLevel } from "../model/agentModel";

export class AgentController {

    public static async getAll(req: Request, res: Response) {
        const filters: AgentFilters = {
            page: Number(req.query.page) || 1,
            limit: Number(req.query.limit) || 10,
            sortBy: req.query.sortBy as string || "id",
            order: req.query.order as string || "asc",
            name: req.query.name as string,
            level: req.query.level as string,
            specialty: req.query.specialty as string,
            status: req.query.status as string,
            teamId: req.query.teamId ? Number(req.query.teamId) : undefined
        };

        const agents = await AgentService.getAll(filters);
        return res.json(agents);
    }

    public static async getById(req: Request, res: Response) {
        const id = Number(req.params.id);
        const agent = await AgentService.getById(id);

        if (agent === undefined) {
            return res.status(404).json({ erro: "Agente não encontrado" });
        }

        return res.json(agent);
    }

    public static async create(req: Request, res: Response) {
        try {
            const { name, codename, level, specialty, status, email, password, teamId } = req.body;
            if (!name || !codename || !specialty || !status || !email || !password) {
                return res.status(400).json({ erro: "Todos os campos obrigatórios devem ser preenchidos (name, codename, specialty, status, email, password)." });
            }

            const agentData: CreateAgentDTO = {
                name,
                codename,
                level: level || AgentLevel.recruit,
                specialty,
                status,
                email,
                password,
                teamId
            };

            const newAgent = await AgentService.create(agentData);
            return res.status(201).json(newAgent);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Erro desconhecido";
            return res.status(400).json({ erro: message });
        }
    }

    public static async update(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const { name, codename, level, specialty, status, email, password, teamId } = req.body;

            const agentData: UpdateAgentDTO = {
                name,
                codename,
                level,
                specialty,
                status,
                email,
                password,
                teamId
            };

            const updatedAgent = await AgentService.update(id, agentData);

            if (updatedAgent === undefined) {
                return res.status(404).json({ erro: "Agente não encontrado" });
            }

            return res.json(updatedAgent);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Erro desconhecido";
            return res.status(400).json({ erro: message });
        }
    }

    public static async patch(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const { name, codename, level, specialty, status, email, password, teamId } = req.body;

            const agentData: PatchAgentDTO = {};
            if (name !== undefined) agentData.name = name;
            if (codename !== undefined) agentData.codename = codename;
            if (level !== undefined) agentData.level = level;
            if (specialty !== undefined) agentData.specialty = specialty;
            if (status !== undefined) agentData.status = status;
            if (email !== undefined) agentData.email = email;
            if (password !== undefined) agentData.password = password;
            if (teamId !== undefined) agentData.teamId = teamId;

            const patchedAgent = await AgentService.patch(id, agentData);

            if (patchedAgent === undefined) {
                return res.status(404).json({ erro: "Agente não encontrado" });
            }

            return res.json(patchedAgent);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Erro desconhecido";
            return res.status(400).json({ erro: message });
        }
    }

    public static async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const foiRemovido = await AgentService.delete(id);

            if (foiRemovido === false) {
                return res.status(404).json({ erro: "Agente não encontrado" });
            }

            return res.status(204).send();
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Erro desconhecido";
            return res.status(400).json({ erro: message });
        }
    }
}
