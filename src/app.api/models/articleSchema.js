import mongoose from "mongoose";
import { Schema } from "mongoose";

// require("./commentSchema");
import { commentSchema } from "./commentSchema";

const articleSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  comments: { type: [commentSchema] },
  date: { type: Date },
  editionHistory: [
    {
      editor: { type: String },
      date: { type: Date },
      wasPublished: { type: Boolean }
    }
  ],
  programDate: { type: Date },
  elements: [{}],
  files: { type: [String] },
  html: { type: String },
  content: { type: String },
  projectName: { type: String, required: true, unique: true },
  description: { type: String },
  keywords: { type: [String] }, //keywords
  structuredData: {}, //json,
  title: { type: String, unique: true },
  url: { type: String },
  thumbnail: {},
  isPublished: { type: Boolean, default: false },
  socialCount: {
    claps: { type: Number, default: 0 },
    share: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    views: { type: Number, default: 0 }
  }
});

articleSchema.index({
  "author.userName": "text",
  content: "text",
  title: "text",
  description: "text",
  keywords: "text"
});

mongoose.model("Article", articleSchema);
