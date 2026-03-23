import express, { Request, Response } from "express";
import cors from "cors";
import { error } from "node:console";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
    res.send("Olá mundo! Express + CORS");
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na na porta ${PORT}`);
});

// Endpoints - Nas próximas entregas devo organizar melhor em pastas
app.get("/status", (req: Request, res: Response)=>{
    res.send("Olhos sempre abertos.")
});

app.post("/agente", (req: Request, res: Response) =>{
    const {nome, codinome} = req.body;

    if(nome == codinome){
        return res.status(401).send({ error: "Proibido nome e codinome iguais!"});
    }

});

app.get("/objetos", (req: Request, res: Response) => {
  const objetos = [
    { id: 1, nome: "Detector de membrana" },
    { id: 2, nome: "Jaqueta do Veríssimo" }
  ];

  res.send(objetos);
});


