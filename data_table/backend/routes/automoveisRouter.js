const express = require("express");
const router = express.Router();
const {
  createAutomoveis,
  getAutomoveis,
  updateAutomoveis,
  deleteAutomoveis,
  getAutomoveisById,
} = require("../controllers/automoveisController");

// Rotas de automoveis
router.post("/", createAutomoveis);
router.get("/", getAutomoveis);
router.get("/:id", getAutomoveisById);
router.put("/:id", updateAutomoveis); // Rota para atualizar Autmovel
router.delete("/:id", deleteAutomoveis); // Rota para deletar Automovel

module.exports = router;
