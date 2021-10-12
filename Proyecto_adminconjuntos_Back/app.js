require("dotenv").config();

const express = require("express");
const cors = require("cors");

// Configurar cabeceras y cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

const app = express();
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))

if (process.env.NODE_ENV === 'production'){
  app.use(express.static(__dirname+'/site'))
  app.use('*',(req,res)=>{
    res.sendFile(__dirname + '/site/index.html')
  })
}

// rutas
app.use("/api",require("./src/routes/routes"));

// DB
const mongoose = require("mongoose");
mongoose.connect(process.env.URI_DB)
  .then(() => console.log("Conexión OK con DB"))
  .catch(err => console.error(err));

const port = process.env.PORT;
app.listen(port, () => 
  console.log(`La aplicación esta escuchando en http://127.0.0.1:${port}`)
)
