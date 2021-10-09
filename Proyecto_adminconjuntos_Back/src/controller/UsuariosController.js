const Usuario = require("../model/UsuariosModel");

module.exports = class UsuariosModel {
  static async getAll(request, response) {
    try {
      const result = await Usuario.find();
      response.status(200).json(result);
    } catch (err) {
      response.status(404).json({ message: err.message });
    }
  }
  static async getById(request, response) {
    try {
      const id = request.params.id;
      const result = await Usuario.findOne({ cedula: id });
      if (result != null) {
        response.status(200).json(result);
      } else {
        response.status(404).json();
      }
    } catch (err) {
      response.status(400).json({ message: err.message });
    }
  }

  static async deleteById(request, response) {
    try {
      const id = request.params.id;
      await Usuario.deleteOne({ cedula: id });
      response.status(200).json();
    } catch (err) {
      response.status(400).json({ message: err.message });
    }
  }

  static async create(request, response) {
    try {
      if (!request.body.cedula || !request.body.password) {
        response.json({
          success: false,
          msg: "El usuario y la contraseña son obligatorios!",
        });
      } else {
        const newUsuario = new Usuario (request.body)
        newUsuario.save(function(err){
          if(err) return response.json({success: false,msg:'la cedula del usuario ya existe!'})
          return response.json({success: true,msg:'usuario registrado!'})
        })
      }
    } catch (err) {
      response.status(400).json({ message: err.message });
    }
  }

  static async updateById(request, response) {
    try {
      const id = request.params.id;
      const val = request.params.val;
      const document = request.body;
      await Usuario.updateOne({ cedula: id }, { $set: { borough: val } });
      response.status(200).json();
    } catch (err) {
      response.status(400).json({ message: err.message });
    }
  }
};
