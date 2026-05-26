import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { AgentRepository } from "../repository/agentRepository";

export class AuthService {

    public static async login(email: string, password: string): Promise<string> {
        const agent = await AgentRepository.findByEmail(email);

        if (!agent) {
            throw new Error("Invalid credentials");
        }

        const passwordMatch = await bcrypt.compare(password, agent.password);

        if (!passwordMatch) {
            throw new Error("Invalid credentials");
        }

        const payload = {
            id: agent.id,
            name: agent.name,
            email: agent.email
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1h" });

        return token;
    }
}
