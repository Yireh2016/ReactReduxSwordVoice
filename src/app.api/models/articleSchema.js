import mongoose from "mongoose";
import { Schema } from "mongoose";
//schemas

const articleSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  coments: { type: [{}] },
  date: { type: Date, default: Date.now },
  elements: [{}],
  files: { type: [String] },
  html: { type: String },
  projectName: { type: String, required: true, unique: true },
  description: { type: String },
  keywords: { type: [String] }, //keywords
  structuredData: {}, //json,
  title: { type: String },
  url: { type: String },
  thumbnail: {}
});

mongoose.model("Article", articleSchema);
