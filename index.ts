import express, { Request, Response } from "express";
import cors from "cors";
import agentRoutes from "./src/routes/agentRoutes";
import teamRoutes from "./src/routes/teamRoutes";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
    res.send("Bem vindo a ordo realitas agente.");
});

app.use(agentRoutes);
app.use(teamRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na na porta ${PORT}`);
});