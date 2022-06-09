const mongoose = require("mongoose");

const timeSchema = mongoose.Schema({
  date: String,
  time: Number,
});
// study[date:0000-00-00 , time: 초단위로]

const Time = mongoose.model("Time", timeSchema);

module.exports = { Time };
