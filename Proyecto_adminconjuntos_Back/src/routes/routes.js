const express = require("express");
const NoticiasController = require("../controller/NoticiasController");
const UsuariosController = require("../controller/UsuariosController");
const AuthController = require("../controller/authController");
const ContaduriaController = require("../controller/ContaduriaController");

const router = express.Router();

//auth
router.post("/login", AuthController.login);

// Rutes Noticias
router.get("/Noticias/all", NoticiasController.getAll);
router.get("/Noticias/:id", NoticiasController.getById);
router.delete("/Noticias/:id", NoticiasController.deleteById);
router.post("/Noticias/", NoticiasController.create);
router.put("/Noticias/:id/:val", NoticiasController.updateById);

//Rutes Usuarios
router.get("/Usuarios/all", UsuariosController.getAll);
router.get("/Usuarios/:id", UsuariosController.getById);
router.delete("/Usuarios/:id", UsuariosController.deleteById);
router.post("/Usuarios/", UsuariosController.create);
router.put("/Usuarios/:id/:val", UsuariosController.updateById);

//Rutes Contaduria
router.get("/Contaduria/all", ContaduriaController.getAll);
router.get("/Contaduria/:id", ContaduriaController.getById);
router.delete("/Contaduria/:id", ContaduriaController.deleteById);
router.post("/Contaduria/", ContaduriaController.create);
router.put("/Contaduria/:id", ContaduriaController.updateById);
router.get(
  "/Contaduria/fecha/:fechaIni/:fechaFin",
  ContaduriaController.getByFecha
);

module.exports = router;
