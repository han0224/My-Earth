const mongoose = require("mongoose");

const goalSchema = mongoose.Schema({
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  todo: [{ title: String, content: String }],
  do: [{ title: String, content: String }],
  done: [{ title: String, content: String }],
});

const Goal = mongoose.model("Goal", goalSchema);

module.exports = { Goal };
