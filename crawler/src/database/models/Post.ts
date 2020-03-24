import { Document, Schema } from "mongoose";
import mongoose from "mongoose";

export interface IPost extends Document {}

const schema = new Schema(
  {
    type: {
      type: String,
      enum: ["twitter", "instagram"],
      required: true
    },
    user: {
      type: String,
      required: false
    },
    url: {
      type: String,
      required: true
    },
    socialId: {
      type: String,
      required: false
    },
    image: {
      type: String,
      required: false
    },
    title: {
      type: String,
      required: false
    },
    text: {
      type: String,
      required: false
    },
    date: {
      type: Date
    },
    fullJson: {
      type: String,
      required: false
    }
  },
  { timestamps: true }
);

export default mongoose.model<IPost>("Post", schema);
