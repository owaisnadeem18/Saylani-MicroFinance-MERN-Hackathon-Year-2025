import mongoose from "mongoose";

const loanSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  loanAmount: { type: Number, required: true },
  loanPeriod: { type: Number, required: true },
  status: { type: String, default: "pending" },
  tokenNumber: { type: Number },
  appointment: {
    date: {
      type: Date,
    },
    time: {
      type: String,
    },
    officeLocation: {
      type: String,
    },
  },
}, {timestamps: true} );

const Loan = mongoose.model("Loan", loanSchema);
export default Loan;
