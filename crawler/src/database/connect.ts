import mongoose from "mongoose";

export async function connect() {
  console.log("Trying to connect at database...");
  await mongoose.connect(process.env.MONGODB_CONNECTION_STRING || "", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log("Database connected!");
}
