import express from "express";

const app = express();

app.get("/users", (req: express.Request, res: express.Response) => {
  console.log("Listagem de usuários");

  res.json(["Diego", "Cleiton", "Robson"]);
});

app.listen(3333);
