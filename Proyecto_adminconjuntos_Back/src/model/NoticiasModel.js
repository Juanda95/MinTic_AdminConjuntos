const mongoose = require("mongoose");

const NoticiaSchema = mongoose.Schema({
  "idNoticia": String,
  "Titulo": String,
  "cuerpo": String,
  "fecha": String 
});

module.exports = mongoose.model("Noticia", NoticiaSchema);