import mongoose from "mongoose";

const sosSchema = new mongoose.Schema({
  name: String,
  phone: String,
  emergency: String,
  location: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("SOS", sosSchema);