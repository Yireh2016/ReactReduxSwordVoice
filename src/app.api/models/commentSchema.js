import mongoose from "mongoose";
import { Schema } from "mongoose";

// require("./responseSchema");

import { responseSchema } from "./responseSchema";

export const commentSchema = new Schema({
  userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
  userName: { type: String, required: true },
  message: { type: String },
  date: { type: Date, default: new Date() },
  responses: [responseSchema],
  claps: { type: Number, default: 0 }
});

mongoose.model("Comment", commentSchema);
