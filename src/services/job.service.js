const { Job, Contract, sequelize, Profile } = require('../models/model');
const { Op, Sequelize } = require('sequelize');

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

const payForJob = async (jobId, clientId) => {
  if (!jobId || !clientId) {
    throw new Error('Validation error');
  }

  return await sequelize.transaction(async (t) => {
    const job = await Job.findOne({
      include: {
        model: Contract,
        where: { ClientId: clientId, status: 'in_progress' },
      },
      where: { id: jobId, paid: { [Op.not]: true } },
      transaction: t,
    });

    if (!job) throw new Error('Job not found or already paid');

    const client = await Profile.findOne({
      where: { id: clientId },
      transaction: t,
    });
    if (!client) throw new Error('Client not found');
    if (client.balance < job.price) throw new Error('Insufficient balance');

    const contractor = await Profile.findOne({
      where: { id: job.Contract.ContractorId },
      transaction: t,
    });
    if (!contractor) throw new Error('Contractor not found');

    client.balance -= job.price;
    contractor.balance += job.price;

    await client.save({ transaction: t });
    await contractor.save({ transaction: t });

    job.paid = true;
    job.paymentDate = new Date();
    await job.save({ transaction: t });

    return {
      job,
      client, // attach the updated client to the response
    };
  });
};

module.exports = {
  getUnpaidJobsForUser,
  payForJob,
};
