import { Request, Response } from "express";
import { AgentService } from "../service/agentService";
import { AgentFilters, CreateAgentDTO, UpdateAgentDTO, PatchAgentDTO, AgentLevel } from "../model/agentModel";

export class AgentController {
    public static async getAll(req: Request, res: Response): Promise<void> {
        try {
            const filters: AgentFilters = {
                page: Number(req.query.page) || 1,
                limit: Number(req.query.limit) || 10,
                sortBy: (req.query.sortBy as string) || "id",
                order: req.query.order === "desc" ? "desc" : "asc",
                name: req.query.name as string,
                level: req.query.level as AgentLevel,
                specialty: req.query.specialty as string,
                status: req.query.status as string,
                teamId: req.query.teamId ? Number(req.query.teamId) : undefined
            };

            const agents = await AgentService.getAll(filters);
            res.status(200).json(agents);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    public static async getById(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            const agent = await AgentService.getById(id);

            if (!agent) {
                res.status(404).json({ error: "Agent not found." });
                return;
            }

            res.json(agent);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    public static async create(req: Request, res: Response): Promise<void> {
        try {
            const { name, codename, level, specialty, status, email, password, teamId } = req.body;

            if (!name || !codename || !specialty || !status || !email || !password) {
                res.status(400).json({ error: "Missing required fields (name, codename, specialty, status, email, password)." });
                return;
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
            res.status(201).json(newAgent);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    public static async update(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            const { name, codename, level, specialty, status, email, password, teamId } = req.body;

            const userId = req.user!.id;
            const userLevel = req.user!.level;

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

            const updatedAgent = await AgentService.update(id, agentData, userId, userLevel);

            if (!updatedAgent) {
                res.status(404).json({ error: "Agent not found." });
                return;
            }

            res.json(updatedAgent);
        } catch (error: any) {
            if (error.message === "Recruits can only update their own profile.") {
                res.status(403).json({ error: error.message });
                return;
            }
            res.status(400).json({ error: error.message });
        }
    }

    public static async patch(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            const { name, codename, level, specialty, status, email, password, teamId } = req.body;

            const userId = req.user!.id;
            const userLevel = req.user!.level;

            const agentData: PatchAgentDTO = {};
            if (name !== undefined) agentData.name = name;
            if (codename !== undefined) agentData.codename = codename;
            if (level !== undefined) agentData.level = level;
            if (specialty !== undefined) agentData.specialty = specialty;
            if (status !== undefined) agentData.status = status;
            if (email !== undefined) agentData.email = email;
            if (password !== undefined) agentData.password = password;
            if (teamId !== undefined) agentData.teamId = teamId;

            const patchedAgent = await AgentService.patch(id, agentData, userId, userLevel);

            if (!patchedAgent) {
                res.status(404).json({ error: "Agent not found." });
                return;
            }

            res.json(patchedAgent);
        } catch (error: any) {
            if (error.message === "Recruits can only update their own profile.") {
                res.status(403).json({ error: error.message });
                return;
            }
            res.status(400).json({ error: error.message });
        }
    }

    public static async delete(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            const deleted = await AgentService.delete(id);

            if (!deleted) {
                res.status(404).json({ error: "Agent not found." });
                return;
            }

            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}