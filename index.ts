import express, { Request, Response } from "express";
import cors from "cors";
import agentRoutes from "./src/routes/agentRoutes";
import teamRoutes from "./src/routes/teamRoutes";
import missionRoutes from "./src/routes/missionRoutes";
import threatRoutes from "./src/routes/threatRoutes";
import paranormalObjectRoutes from "./src/routes/paranormalObjectRoutes";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
    res.send("Bem vindo a ordo realitas agente.");
});

app.use(agentRoutes);
app.use(teamRoutes);
app.use(missionRoutes);
app.use(threatRoutes);
app.use(paranormalObjectRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});