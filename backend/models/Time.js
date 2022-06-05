const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const timeSchema = mongoose.Schema({
  user_id: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});
// study[date:0000-00-00 , time: 초단위로]

const Time = mongoose.model("Time", timeSchema);

module.exports = { Time };
