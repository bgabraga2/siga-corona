import mongoose from "mongoose";

export async function connect() {
  await mongoose.connect(process.env.MONGODB_CONNECTION_STRING || '', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}
