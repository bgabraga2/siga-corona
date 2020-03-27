import { Router } from "express";
import Posts from "./controllers/Post";

const routes = Router();

routes.get('/posts', Posts.listValidations, Posts.list);
routes.get('/posts/:id', Posts.findOneValidations, Posts.findOne);
routes.get('/posts/share/:id', Posts.findOneValidations, Posts.shareOne);

export default routes;
