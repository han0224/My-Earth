const mongoose = require("mongoose");
const { User } = require("./User");

const todoSchema = mongoose.Schema({
  userEamil: String,
  status: {
    type: Number,
    default: 0,
  },
  title: String,
});
// study[date:0000-00-00 , time: 초단위로]

const Todo = mongoose.model("Todo", todoSchema);

module.exports = { Todo };
