import { Schema, model } from "mongoose";

const PostsSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: { type: String },
    body: {
      type: String,
      required: true
    },
    tags: {
      type: Array,
      required: true
    },
    author: {
      type: String,
      required: true
    }
  },
  { timestamps: { createdAt: "created_at" } }
);

const PostModel = model("Posts", PostsSchema);

export default PostModel;
