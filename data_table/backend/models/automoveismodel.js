const mongoose = require("mongoose");

const automoveisSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tipo: { type: String, required: true },
  responsible: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Automoveis = mongoose.model("Automoveis", automoveisSchema);
module.exports = Automoveis;
