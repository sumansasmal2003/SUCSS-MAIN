import mongoose, { Schema, models, model } from "mongoose";

const NoticeSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  postedBy: { type: String, required: true }, // Name of the President/Secretary
  designation: { type: String, required: true }, // "President" or "Secretary"
  isImportant: { type: Boolean, default: false },
}, { timestamps: true });

const Notice = models.Notice || model("Notice", NoticeSchema);

export default Notice;
