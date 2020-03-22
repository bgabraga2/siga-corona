import { Router } from "express";
import Init, { InitValidate } from "./controllers/Init";

const routes = Router();

routes.get("/", InitValidate, Init.home);

export default routes;
