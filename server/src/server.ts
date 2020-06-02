import express from "express";
import routes from "./routes";

const app = express();

app.use(express.json());

app.use(routes);

// Rota: Endereço completo da requisição
// Recurso: Qual entidade estamos acessando do sistema
// GEt: Buscar uma ou mais informações do back-end
// POST: Criar uma nova informação no back-end
// PUT: Atualizar uma informaçào existente no back-end
// DELETE: Remover uma informação do back-end

// Request Param: Parâmetros que vem na própria rota que identificam um recurso
// Query Param: Parâmetros que vem na própria rota geralmente opcionais para filtros, paginação
// Request Body: Parâmetros para criação/atualizaçào de informaçòes

app.listen(3333);
console.log("Server running on port 3333");
