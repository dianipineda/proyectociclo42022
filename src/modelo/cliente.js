const mongoose = require("mongoose");
const { Schema } = mongoose;

const InvitadoSchema = new Schema({
  primer_nombre: { type: String, require: true },
  segundo_nombre: { type: String, require: false },
  primer_apellido: { type: String, require: true },
  segundo_apellido: { type: String, require: false },
  edad: { type: Number, required: true },
  telefono: { type: String, require: true },
  genero: { type: String, required: true },
});

module.exports = mongoose.model("Invitado", InvitadoSchema);
