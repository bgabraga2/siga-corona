import dotenv from "dotenv";
import TwitterHandler from "./handlers/TwitterHandler";
import InstagramHandler from "./handlers/InstagramHandler";
import { connect } from "./database/connect";

connect();

// Lendo variáveis de ambiente
dotenv.config({ path: `src/env/.env.${process.env.NODE_ENV}` });

// setInterval(() => {
//   TwitterHandler.process();
// }, Number(process.env.CRAWLER_POOLING_MILISECONDS));

InstagramHandler.process();
