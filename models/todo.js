var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    isCompleted: {
      type: Boolean
    }
  }, { timestamps: true }
)

module.exports = mongoose.model("Todo", todoSchema);