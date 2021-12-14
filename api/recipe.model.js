const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

const RecipeSchema = new mongoose.Schema({
  title: String,
  description: String,
  adress: String,
  image: String,
  phone: String,
  year: String,
});

const Recipe = mongoose.model("Recipe", RecipeSchema);
