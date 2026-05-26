import mongoose from "mongoose";

const dietSchema = new mongoose.Schema({
  title: String,
  description: String,
  calories: Number,
  type: String,
  goal: String,
});

const Diet = mongoose.model("Diet", dietSchema);

export default Diet;