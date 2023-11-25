const { Profile, Job, Contract, sequelize } = require('../models/model');
const { Op } = require('sequelize');

const depositToBalance = async (clientId, depositAmount, profileId) => {
  if (!clientId || !depositAmount || !profileId) {
    throw new Error('Validation error');
  }

  return await sequelize.transaction(async (t) => {
    const profileUser = await Profile.findOne({
      where: { id: profileId },
      transaction: t,
    });
    if (!profileUser) throw new Error('Unauthorized user');

    // Calculating 25% of profile user's total unpaid jobs
    const totalUnpaidJobsPrice = await Job.sum('price', {
      include: [
        {
          model: Contract,
          required: true,
          where: { ClientId: profileId, status: 'in_progress' },
        },
      ],
      where: { paid: false },
      transaction: t,
    });
    if (!totalUnpaidJobsPrice) throw new Error('No unpaid jobs found');

    const maxTransferAllowed = totalUnpaidJobsPrice * 0.25;
    if (depositAmount > maxTransferAllowed)
      throw new Error('Transfer exceeds the allowed limit');

    // Checking if the profile user has enough balance
    if (profileUser.balance < depositAmount)
      throw new Error('Insufficient balance');

    // Fetching the client user
    const clientUser = await Profile.findOne({
      where: { id: clientId, type: 'client' },
      transaction: t,
    });
    if (!clientUser) throw new Error('Client user not found');

    // Transferring the amount
    profileUser.balance -= depositAmount;
    clientUser.balance += depositAmount;

    await profileUser.save({ transaction: t });
    await clientUser.save({ transaction: t });

    return { profileUser, clientUser };
  });
};

module.exports = {
  depositToBalance,
};
