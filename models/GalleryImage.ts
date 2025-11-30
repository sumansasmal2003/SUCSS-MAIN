import mongoose, { Schema, models, model } from "mongoose";

const GalleryImageSchema = new Schema({
  url: { type: String, required: true },
  publicId: { type: String, required: true }, // For deleting later if needed
  caption: { type: String, required: true },
  category: {
    type: String,
    enum: ["Sports", "Cultural", "Social Welfare", "Meeting", "Awards", "Others"],
    default: "Others"
  },
  uploadedBy: { type: Schema.Types.ObjectId, ref: "Member" }, // Who uploaded it
  uploaderName: { type: String }, // Storing name for quick display
}, { timestamps: true });

const GalleryImage = models.GalleryImage || model("GalleryImage", GalleryImageSchema);

export default GalleryImage;
