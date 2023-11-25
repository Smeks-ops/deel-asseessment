const jobService = require('../services/job.service');

const getUnpaidJobs = async (req, res) => {
  try {
    const profileId = req.profile.id;
    const jobs = await jobService.getUnpaidJobsForUser(profileId);
    res.json({
      status: 'success',
      code: 200,
      data: {
        jobs,
      },
      message: 'Unpaid jobs fetched successfully',
    });
  } catch (error) {
    if (error.message === 'Validation error') {
      res.status(400).json({ message: 'Profile id is required' });
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

module.exports = {
  getUnpaidJobs,
};
