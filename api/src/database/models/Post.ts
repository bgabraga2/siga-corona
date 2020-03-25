import mongoose, { Document, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate";

export interface IPost extends Document {}

const schema = new Schema(
  {
    type: {
      type: String,
      enum: ['twitter', 'instagram', 'youtube'],
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
  {
    timestamps: true,
    versionKey: false
  }
);

schema.plugin(mongoosePaginate);

export default mongoose.model<IPost>("Post", schema);
