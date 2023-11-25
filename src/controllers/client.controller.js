const clientService = require('../services/client.service');

const depositBalance = async (req, res) => {
  const profileId = req.profile.id; // from getProfile middleware
  const userId = req.params.userId;
  const { amount } = req.body; // Assuming the deposit amount is sent in the request body

  try {
    const updatedClient = await clientService.depositToBalance(
      userId,
      amount,
      profileId
    );
    res.json({
      message: 'Deposit successful',
      status: 'success',
      code: 200,
      data: {
        updatedClient,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  depositBalance,
};
