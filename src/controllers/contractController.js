const { Contract } = require('../models/model');
const { findContractById } = require('../services/contractService');

const getContractById = async (req, res) => {
  const { id } = req.params;
  try {
    const contract = await findContractById(id)
    if (!contract) return res.status(404).end();
    res.json(contract);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getContractById,
};
