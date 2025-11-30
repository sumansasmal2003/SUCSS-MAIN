import mongoose, { Schema, models, model } from "mongoose";

const EventSchema = new Schema({
  title: { type: String, required: true },
  date: { type: String, required: true }, // Keeping as string for flexibility "Jan 26, 2025"
  time: { type: String, required: true },
  location: { type: String, required: true },
  category: {
    type: String,
    enum: ["Sports", "Cultural", "Social", "Meeting"],
    required: true
  },
  shortDesc: { type: String, required: true },
  fullDesc: { type: String, required: true },
  image: { type: String, required: true }, // URL to image
  coordinator: { type: String, required: true },
  entryFee: { type: String, default: "Free" },
  isFeatured: { type: Boolean, default: false },
}, { timestamps: true });

// Prevent recompiling model if it already exists (Next.js hot reload fix)
const Event = models.Event || model("Event", EventSchema);

export default Event;
