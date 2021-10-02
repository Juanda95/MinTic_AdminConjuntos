const mongoose = require("mongoose");

const ContaduriaSchema = mongoose.Schema({
  "_id": Object,
  "idNoticia": String,
  "Titulo": String,
  "cuerpo": String,
  "fecha": String 
});

module.exports = mongoose.model("Contaduria", ContaduriaSchema);