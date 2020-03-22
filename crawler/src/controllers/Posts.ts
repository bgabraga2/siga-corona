import mongoose from "mongoose";
import Post from "../database/models/Post";

export async function create() {
  return await Post.create({
    type: "twitter",
    url: "http://google.com",
    socialId: "123123123"
  });
}
