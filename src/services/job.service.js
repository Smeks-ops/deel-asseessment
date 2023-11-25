const { Job, Contract } = require('../models/model');
const { Op } = require('sequelize');

const getUnpaidJobsForUser = async (profileId) => {
  if (!profileId) {
    throw new Error('Validation error');
  }
  return await Job.findAll({
    include: [
      {
        model: Contract,
        where: {
          [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }],
          status: 'in_progress', // Only active contracts
        },
      },
    ],
    where: {
      paid: {
        [Op.not]: true, // Only unpaid jobs
      },
    },
  });
};

module.exports = {
  getUnpaidJobsForUser,
};
