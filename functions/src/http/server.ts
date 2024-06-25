import * as express from "express";
import "express-async-errors";
import {Request, Response} from "express";
import {body} from "express-validator";
import {createUser} from "./cases/createUser";
import {errorHandler} from "./middlewares/errorHandler";
import {requestValidator} from "./middlewares/requestValidator";

const app = express();

app.use(express.json());

app.post("/users", [
  body("name").notEmpty(),
  requestValidator,
], async (req: Request, res: Response) => {
  const output = await createUser(req.body);
  return res.status(201).json(output);
});

app.use(errorHandler);

export default app;
