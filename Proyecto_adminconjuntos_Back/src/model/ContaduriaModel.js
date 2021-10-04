const mongoose = require("mongoose");

const ContaduriaSchema = mongoose.Schema({
  "idPago": String,
  "Cedula": String,
  "Fecha": String,
  "Monto": String 
});

module.exports = mongoose.model("Contaduria", ContaduriaSchema);