console.log(`System starting at: "${process.env.NODE_ENV}"`);

require("dotenv-flow").config();
import TwitterHandler from "./handlers/TwitterHandler";
import InstagramHandler from "./handlers/InstagramHandler";
import { connect } from "./database/connect";
import { resolve } from "path";

connect();

setInterval(() => {
  console.log("Starting process...");
  TwitterHandler.process();
  InstagramHandler.process();
}, Number(process.env.CRAWLER_POOLING_MILISECONDS));
