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

const getActiveContractsForUser = async (profileId) => {
  if (!profileId) {
    throw new Error('Validation error');
  }

  const activeContracts = await Contract.findAll({
    where: {
      [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }],
      status: {
        [Op.ne]: 'terminated', // not equal
      },
    },
  });
  return activeContracts;
};

module.exports = {
  findContractForUserById,
  getActiveContractsForUser,
};
