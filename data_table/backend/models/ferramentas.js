const mongoose = require("mongoose");

const ferramentasSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tipo: { type: String, required: true },
  responsible: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Ferramentas = mongoose.model("Ferramentas", ferramentasSchema);

module.exports = Ferramentas;
