const AutomoveisModel = require("../models/automoveismodel");

// Criar automóvel
exports.createAutomoveis = async (req, res) => {
  try {
    const { name, tipo, responsible } = req.body;
    const automovel = new AutomoveisModel({ name, tipo, responsible });
    await automovel.save();
    res.status(201).json(automovel);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Listar todos os automóveis
exports.getAutomoveis = async (_req, res) => {
  try {
    const automoveis = await AutomoveisModel.find().populate(
      "responsible",
      "name"
    );
    res.status(200).json(automoveis);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Buscar automóvel por ID
exports.getAutomoveisById = async (req, res) => {
  try {
    const automovel = await AutomoveisModel.findById(req.params.id).populate(
      "responsible",
      "name"
    );
    if (!automovel) {
      return res.status(404).json({ message: "Automóvel não encontrado" });
    }
    res.status(200).json(automovel);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Atualizar automóvel
exports.updateAutomoveis = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, tipo, responsible } = req.body;

    const updatedAutomovel = await AutomoveisModel.findByIdAndUpdate(
      id,
      { name, tipo, responsible },
      { new: true }
    );
    if (!updatedAutomovel) {
      return res.status(404).json({ message: "Automóvel não encontrado" });
    }
    res.status(200).json(updatedAutomovel);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Deletar automóvel
exports.deleteAutomoveis = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAutomovel = await AutomoveisModel.findByIdAndDelete(id);
    if (!deletedAutomovel) {
      return res.status(404).json({ message: "Automóvel não encontrado" });
    }
    res.status(200).json({ message: "Automóvel excluído com sucesso" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
