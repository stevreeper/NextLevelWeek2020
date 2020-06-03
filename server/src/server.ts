import express from "express";
import routes from "./routes";
import cors from "cors";
import path from "path";

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

app.listen(3333);
console.log("Server running on port 3333");

// Rota: Endereço completo da requisição
// Recurso: Qual entidade estamos acessando do sistema
// GET: Buscar uma ou mais informações do back-end (index, show)
// POST: Criar uma nova informação no back-end (create)
// PUT: Atualizar uma informaçào existente no back-end (update)
// DELETE: Remover uma informação do back-end (delete)

// Request Param: Parâmetros que vem na própria rota que identificam um recurso
// Query Param: Parâmetros que vem na própria rota geralmente opcionais para filtros, paginação
// Request Body: Parâmetros para criação/atualizaçào de informaçòes
