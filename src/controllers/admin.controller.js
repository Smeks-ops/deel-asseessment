const adminService = require('../services/admin.service');

const getBestProfession = async (req, res) => {
  const { start, end } = req.query;
  try {
    const bestProfession = await adminService.getBestProfession(start, end);
    if (!bestProfession) {
      return res
        .status(404)
        .json({ message: 'No profession found in the given date range' });
    }
    res.json({
      message: 'Best profession found',
      status: 'success',
      code: 200,
      data: {
        bestProfession,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
};

const getBestClients = async (req, res) => {
  const { start, end } = req.query;

  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 2; // default limit is set to 2

    const bestClients = await adminService.getBestClients(start, end, limit);
    if (!bestClients) {
      return res
        .status(404)
        .json({ message: 'No clients found in the given date range' });
    }
    res.json({
      message: 'Best clients found',
      status: 'success',
      code: 200,
      data: {
        bestClients,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  getBestProfession,
  getBestClients,
};
