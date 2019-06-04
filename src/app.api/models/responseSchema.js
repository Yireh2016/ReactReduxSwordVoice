import mongoose from "mongoose";
import { Schema } from "mongoose";

export const responseSchema = new Schema({
  userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
  userName: { type: String, required: true },
  message: { type: String },
  date: { type: Date, default: Date.now },
  claps: { type: Number, default: 0 }
});

mongoose.model("Reply", responseSchema);
