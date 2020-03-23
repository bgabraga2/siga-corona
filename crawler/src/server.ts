require("dotenv-flow").config();
import TwitterHandler from "./handlers/TwitterHandler";
import InstagramHandler from "./handlers/InstagramHandler";
import { connect } from "./database/connect";
import logger from "node-color-log";

class Server {
  constructor() {
    logger.info(`Server starting at: "${process.env.NODE_ENV}"`);
    this.start();
  }
  async start() {
    await connect();
    this.thread();
  }
  async thread() {
    TwitterHandler.process();
    InstagramHandler.process();
  }
}

const sv = new Server();
setInterval(sv.thread, Number(process.env.CRAWLER_POOLING_MILISECONDS));
