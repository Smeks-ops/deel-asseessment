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

const payJob = async (req, res) => {
  const jobId = req.params.job_id;
  const clientId = req.profile.id; // Assuming client is making the payment

  try {
    const job = await jobService.payForJob(jobId, clientId);
    res.json({
      status: 'success',
      message: 'Payment successful',
      code: 200,
      data: {
        job,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getUnpaidJobs,
  payJob,
};
