import dotenv from "dotenv";
import TwitterHandler from "./handlers/TwitterHandler";
import InstagramHandler from "./handlers/InstagramHandler";
import { connect } from "./database/connect";
import { resolve } from "path";

connect();

// Lendo variáveis de ambiente
dotenv.config({ path: resolve(`./src/env/.env.${process.env.NODE_ENV}`) });

setInterval(() => {
  TwitterHandler.process();
  InstagramHandler.process();
}, Number(process.env.CRAWLER_POOLING_MILISECONDS));
