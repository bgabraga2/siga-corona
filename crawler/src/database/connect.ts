import mongoose from "mongoose";
import logger from "node-color-log";

export async function connect() {
  logger.info("Trying to connect at database...");
  await mongoose.connect(process.env.MONGODB_CONNECTION_STRING || "", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  logger.info("Database connected!");
}
