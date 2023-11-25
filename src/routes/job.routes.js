const express = require('express');
const router = express.Router();
const jobController = require('../controllers/job.controllers');
const { getProfile } = require('../middleware/getProfile');

router.get('/unpaid', getProfile, jobController.getUnpaidJobs);
router.post('/:job_id/pay', getProfile, jobController.payJob);


module.exports = router;
