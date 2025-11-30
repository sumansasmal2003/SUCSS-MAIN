import mongoose, { Schema, models, model } from "mongoose";

const MemberSchema = new Schema({
  fullName: { type: String, required: true },
  guardianName: { type: String, required: true },
  dob: { type: Date, required: true },
  bloodGroup: { type: String },
  phone: { type: String, required: true },
  email: { type: String }, // Email is required for sending credentials
  address: { type: String, required: true },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending"
  },
  // New Auth Fields
  username: { type: String, unique: true, sparse: true },
  password: { type: String }, // In a real app, you must hash this!
  designation: {
    type: String,
    default: "Member" // Default for all normal applications
  },
  resetPasswordOtp: { type: String },
  resetPasswordExpires: { type: Date },
}, { timestamps: true });

const Member = models.Member || model("Member", MemberSchema);

export default Member;
