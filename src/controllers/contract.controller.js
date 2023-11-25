const {
  findContractForUserById,
  getActiveContractsForUser,
} = require('../services/contract.service');

const getContractById = async (req, res) => {
  const { id } = req.params;

  const profileId = req.profile.id; // from getProfile middleware

  try {
    const contract = await findContractForUserById(id, profileId);
    res.json({
      status: 'success',
      code: 200,
      data: {
        contract,
      },
      message: 'Contract fetched successfully',
    });
  } catch (error) {
    if (error.message === 'Validation error') {
      res
        .status(400)
        .json({ message: 'Contract id and profile id are required' });
    } else if (error.message === 'Contract not found') {
      res.status(404).json({ message: 'Contract not found' });
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

const getActiveContracts = async (req, res) => {
  try {
    const profileId = req.profile.id;
    const contracts = await getActiveContractsForUser(profileId);
    res.json({
      status: 'success',
      code: 200,
      data: {
        contracts,
      },
      message: 'Contracts fetched successfully',
    });
  } catch (error) {
    if (error.message === 'Validation error') {
      res
        .status(400)
        .json({ message: 'Contract id and profile id are required' });
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

module.exports = {
  getContractById,
  getActiveContracts,
};
