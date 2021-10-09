const mongoose = require("mongoose");

const UsuarioSchema = mongoose.Schema({
  "cedula": String,
  "contraseña": String,
  "tipoUsuario": Number,
  "informacion":Object	  
});

module.exports = mongoose.model("Usuario", UsuarioSchema);