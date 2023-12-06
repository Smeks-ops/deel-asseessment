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

const getBestClients = async (startDate, endDate, limit) => {
  if (!startDate || !endDate || !limit) {
    throw new Error('Validation error');
  }

  const bestClients = await Job.findAll({
    attributes: [
      [sequelize.fn('sum', sequelize.col('price')), 'totalPaid'],
      [sequelize.literal('`Contract->Client`.`firstName`'), 'firstName'],
      [sequelize.literal('`Contract->Client`.`lastName`'), 'lastName'],
    ],
    include: [
      {
        model: Contract,
        attributes: [],
        include: [
          {
            model: Profile,
            as: 'Client',
            attributes: ['firstName', 'lastName'],
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
    group: [
      'Contract.Client.id',
      'Contract->Client.id',
      'Contract->Client.firstName',
      'Contract->Client.lastName',
    ],
    order: [[sequelize.fn('sum', sequelize.col('price')), 'DESC']],
    limit: limit,
  });

  return bestClients.map((client) => ({
    id: client.get('clientId'),
    fullName: `${client.get('firstName')} ${client.get('lastName')}`,
    paid: client.get('totalPaid'),
  }));
};

module.exports = {
  getBestProfession,
  getBestClients,
};
