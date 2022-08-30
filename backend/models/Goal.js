const mongoose = require("mongoose");

const goalSchema = mongoose.Schema({
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  week: [{ title: String, content: String }],
  month: [{ title: String, content: String }],
  year: [{ title: String, content: String }],
  final: [{ title: String, content: String }],
});

const Goal = mongoose.model("Goal", goalSchema);

module.exports = { Goal };
