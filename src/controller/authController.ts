import { Request, Response } from "express";
import { AuthService } from "../service/authService";

export class AuthController {

    public static async login(req: Request, res: Response) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ erro: "Os campos email e password são obrigatórios." });
        }

        try {
            const token = await AuthService.login(email, password);
            return res.status(200).json({ token });
        } catch (error: any) {
            return res.status(401).json({ erro: error.message });
        }
    }
}
