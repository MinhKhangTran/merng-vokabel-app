const mongoose = require("mongoose");

const vokabelSchema = new mongoose.Schema(
  {
    german: {
      type: String,
      required: true
    },
    korean: {
      type: String,
      required: true
    },
    author: {
      type: String,
      default: "MKT"
    },
    marked: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const Vokabel = mongoose.model("Vokabel", vokabelSchema);

module.exports = Vokabel;
