const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const plantationRoutes = require("./routes/plantationRoutes");
const ferramentasRoutes = require("./routes/ferramentasRoutes");
const automoveisRoutes = require("./routes/automoveisRouter");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parse de JSON
app.use(express.json());

app.use(cors());

// Conectando ao MongoDB
mongoose
  .connect(
    "mongodb+srv://nome:senha2@desafiofullstack.sglxvtl.mongodb.net/?retryWrites=true&w=majority&appName=DesafioFullstack",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Conectado ao MongoDB!");
  })
  .catch((err) => {
    console.log("Erro ao conectar ao MongoDB:", err);
  });

// Usando rotas
app.use("/api/users", userRoutes);
app.use("/api/plantations", plantationRoutes);
app.use("/api/automoveis", automoveisRoutes);
app.use("/api/ferramentas", ferramentasRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
