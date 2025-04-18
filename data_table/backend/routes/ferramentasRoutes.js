const express = require("express");
const router = express.Router();
const {
  createFerramentas,
  getFerramentas,
  updateFerramentas,
  deleteFerramentas,
  getFerramentasById,
} = require("../controllers/ferramentasControllers");

// Rotas de plantações
router.post("/", createFerramentas);
router.get("/", getFerramentas);
router.get("/:id", getFerramentasById);
router.put("/:id", updateFerramentas); // Rota para atualizar Ferramenta
router.delete("/:id", deleteFerramentas); // Rota para deletar Ferramenta

module.exports = router;
