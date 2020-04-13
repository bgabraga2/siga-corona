import mongoose, { Document, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate";

export interface IPost extends Document {
  type: PostTypes;
  user: string;
  url: string;
  socialId: string;
  image: string;
  title: string;
  text: string;
  date: Date;
  fullJson: string;
}

export enum PostTypes {
  twitter = 'twitter',
  instagram = 'instagram',
  youtube = 'youtube'
}

const schema = new Schema(
  {
    type: {
      type: String,
      enum: Object.values(PostTypes),
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
