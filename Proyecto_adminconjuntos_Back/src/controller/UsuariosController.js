const Usuario = require("../model/UsuariosModel")

module.exports = class UsuariosModel {
  static async getAll(request, response) {
    try {
      const result = await Usuario.find();
      response.status(200).json(result);
    } catch (err) {
      response.status(404).json({message: err.message});
    }
  }
}