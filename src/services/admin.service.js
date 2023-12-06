const { Job, Contract, Profile, sequelize } = require('../models/model');
const { Op } = require('sequelize');

const getBestProfession = async (startDate, endDate) => {
    if (!startDate || !endDate) {
        throw new Error('Validation error');
    }

  const professions = await Job.findAll({
    attributes: [
      [sequelize.fn('sum', sequelize.col('price')), 'totalEarnings'],
      [sequelize.col('Contract.Contractor.profession'), 'profession'],
    ],
    include: [
      {
        model: Contract,
        attributes: [],
        include: [
          {
            model: Profile,
            as: 'Contractor',
            attributes: [],
            where: { type: 'contractor' },
          },
        ],
      },
    ],
    where: {
      paid: true,
      paymentDate: {
        [Op.gte]: new Date(startDate),
        [Op.lte]: new Date(endDate),
      },
    },
    group: ['Contract.Contractor.profession'],
    order: [[sequelize.fn('sum', sequelize.col('price')), 'DESC']],
    limit: 1,
  });

  return professions[0];
};

module.exports = {
  getBestProfession,
};
