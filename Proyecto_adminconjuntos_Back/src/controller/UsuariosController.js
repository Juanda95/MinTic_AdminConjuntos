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
  static async getById(request, response) {
    try {
      const id = request.params.id;
      const result = await Usuario.findOne({cedula: id});
      if (result != null) {
        response.status(200).json(result)
      } else {
        response.status(404).json();
      }
    } catch (err) {
      response.status(400).json({message: err.message})
    }
  }

  static async deleteById(request, response){
    try {
      const id = request.params.id;
      await Usuario.deleteOne({cedula: id});
      response.status(200).json();
    } catch (err) {
      response.status(400).json({message: err.message})
    }
  }

  static async create(request, response){
    try {
      const document = request.body;
      const newRestaurant = await Usuario.create(document);
      response.status(201).json(newRestaurant);
    } catch (err) {
      response.status(400).json({message: err.message})
    }
  }

  static async updateById(request, response) {
    try {
      const id = request.params.id;
      const val = request.params.val;
      const document = request.body;
      await Usuario.updateOne({"cedula": id}, {$set: {"borough": val}});
      response.status(200).json();
    } catch (err) {
      response.status(400).json({message: err.message})
    }
  }
}