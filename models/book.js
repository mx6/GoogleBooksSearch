const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String },
  synopsis: String,
  date: { type: Date, default: Date.now },
  link: String,
  thumbnail: String
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
