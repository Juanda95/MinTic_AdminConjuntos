const Contaduria = require("../model/ContaduriaModel")

module.exports = class ContaduriaModel {
  static async getAll(request, response) {
    try {
      const result = await Contaduria.find();
      response.status(200).json(result);
    } catch (err) {
      response.status(404).json({message: err.message});
    }
  }
  static async getById(request, response) {
    try {
      const id = request.params.id;
      const result = await Contaduria.findOne({cedula: id});
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
      await Contaduria.deleteOne({cedula: id});
      response.status(200).json();
    } catch (err) {
      response.status(400).json({message: err.message})
    }
  }

  static async create(request, response){
    try {
      const document = request.body;
      const newRestaurant = await Contaduria.create(document);
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
      await Contaduria.updateOne({"cedula": id}, {$set: {"borough": val}});
      response.status(200).json();
    } catch (err) {
      response.status(400).json({message: err.message})
    }
  }
}