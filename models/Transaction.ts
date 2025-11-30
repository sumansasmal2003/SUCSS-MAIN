import mongoose, { Schema, models, model } from "mongoose";

const TransactionSchema = new Schema({
  type: {
    type: String,
    enum: ["Income", "Expense"],
    required: true
  },
  category: { type: String, required: true }, // e.g., "Membership Fees", "Maintenance"
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  recordedBy: { type: String, required: true }, // Name of Treasurer who added it
}, { timestamps: true });

const Transaction = models.Transaction || model("Transaction", TransactionSchema);

export default Transaction;
