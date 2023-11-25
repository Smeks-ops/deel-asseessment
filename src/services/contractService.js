const { Contract } = require('../models/model');
const { Op } = require('sequelize');

const findContractForUserById = async (id, profileId) => {
  if (!id || !profileId) {
    throw new Error('Validation error');
  }

  const contract = await Contract.findOne({
    where: {
      id,
      [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }],
    },
  });

  if (!contract) {
    throw new Error('Contract not found');
  }

  return contract;
};

module.exports = {
  findContractForUserById,
};
