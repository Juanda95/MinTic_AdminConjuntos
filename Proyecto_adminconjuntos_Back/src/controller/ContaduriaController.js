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
}