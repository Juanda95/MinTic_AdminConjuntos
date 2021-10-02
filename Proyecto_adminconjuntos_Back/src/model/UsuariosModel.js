const mongoose = require("mongoose");

const UsuarioSchema = mongoose.Schema({
  "_id": Object,
  "idNoticia": String,
  "Titulo": String,
  "cuerpo": String,
  "fecha": String 
});

module.exports = mongoose.model("Usuario", UsuarioSchema);