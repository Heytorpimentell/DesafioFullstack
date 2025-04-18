const Ferramentas = require("../models/ferramentas");

//Criar ferramentas
exports.createFerramentas = async (req, res) => {
  try {
    const { name, tipo, responsible } = req.body;
    const novaFerramenta = new Ferramentas({ name, tipo, responsible }); //Nome diferente para a instância
    await novaFerramenta.save();
    res.status(201).json(novaFerramenta);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//Listar ferramentas
exports.getFerramentas = async (_req, res) => {
  try {
    const ferramentas = await Ferramentas.find();
    res.status(200).json(ferramentas);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//Listar ferramenta

exports.getFerramentasById = async (req, res) => {
  try {
    const ferramenta = await Ferramentas.findById(req.params.id);
    if (!ferramenta) {
      return res.status(404).json({ message: "Ferramenta não encontrado" });
    }
    res.status(200).json(ferramenta);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Atualizar ferramenta

exports.updateFerramentas = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, tipo, responsible } = req.body;

    const updatedFerramentas = await Ferramentas.findByIdAndUpdate(
      id,
      { name, tipo, responsible },
      { new: true }
    );
    if (!updatedFerramentas)
      return res.status(404).json({ message: "Ferramenta não encontrado" });

    res.status(200).json(updatedFerramentas);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Excluir ferramenta
exports.deleteFerramentas = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFerramentas = await Ferramentas.findByIdAndDelete(id);
    if (!deletedFerramentas)
      return res.status(404).json({ message: "Ferramenta não encontrado" }); // Corrigi a mensagem

    res.status(200).json({ message: "Ferramenta excluída com sucesso" }); // Corrigi a mensagem
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
