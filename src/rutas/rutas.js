const express = require("express");
const router = express.Router();
const cliente = require("../modelo/cliente");

router.get("/", async (req, res) => {
  const invitados = await cliente.find();
  console.log(invitados);
  res.json({
    invitados,
  });
});

router.get("/:id", async (req, res) => {
  const invitado = await cliente.findById(req.params.id);
  res.json({
    invitado,
  });
});

router.post("/", async (req, res) => {
  const {
    primer_nombre,
    segundo_nombre,
    primer_apellido,
    segundo_apellido,
    edad,
    telefono,
    genero,
  } = req.body;
  const invitado = new cliente({
    primer_nombre,
    segundo_nombre,
    primer_apellido,
    segundo_apellido,
    edad,
    telefono,
    genero,
  });
  await invitado.save();
  res.json({
    status: "invitados guardados",
  });
});

router.put("/:id", async (req, res) => {
  const {
    primer_nombre,
    segundo_nombre,
    primer_apellido,
    segundo_apellido,
    edad,
    telefono,
    genero,
  } = req.body;
  const invitadoEditado = {
    primer_nombre,
    segundo_nombre,
    primer_apellido,
    segundo_apellido,
    edad,
    telefono,
    genero,
  };
  await cliente.findByIdAndUpdate(req.params.id, invitadoEditado, {
    useFindAndModify: false,
  });
  res.json({
    status: "Invitado Editado Exitosamente",
  });
});

router.delete("/:id", async (req, res) => {
  await cliente.findByIdAndRemove(req.params.id, {
    useFindAndModify: false,
  });
  res.json({ status: "Invitado Eliminado" });
});

module.exports = router;
