import * as mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config({ path: `src/env/.env.${process.env.NODE_ENV}` });

export function connect(): void {
  mongoose.connect(process.env.MONGODB_CONNECTION_STRING || "", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}
