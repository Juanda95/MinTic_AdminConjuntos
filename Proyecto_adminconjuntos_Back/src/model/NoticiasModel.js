const mongoose = require("mongoose");

const NoticiaSchema = mongoose.Schema({
  idNoticia: String,
  Titulo: String,
  cuerpo: String,
  fecha: {type:Date, default: Date.now}
});

module.exports = mongoose.model("Noticia", NoticiaSchema);