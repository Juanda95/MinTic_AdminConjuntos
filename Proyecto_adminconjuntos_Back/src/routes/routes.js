const express = require("express");
const NoticiasController = require("../controller/NoticiasController");
const UsuariosController = require("../controller/UsuariosController");
const ContaduriaController = require("../controller/ContaduriaController");

const router = express.Router();

// Rutes Noticias
router.get("/Noticias/all", NoticiasController.getAll);
// router.get("/Noticias/:id", NoticiasController.getById);
// router.get("/Noticias/:param1/:param2", NoticiasController.getP12);
// router.delete("/Noticias/:id", NoticiasController.deleteById);
// router.post("/Noticias/", NoticiasController.create);
// router.put("/Noticias/:id/:val", NoticiasController.updateById);
// router.put("Noticias/:id", NoticiasController.replaceById);

//Rutes Usuarios
router.get("/Usuarios/all", UsuariosController.getAll);

//Rutes Usuarios
router.get("/Contaduria/all", ContaduriaController.getAll);

module.exports = router;
