const express = require('express');
const router = express.Router();
const jobController = require('../controllers/job.controllers');
const { getProfile } = require('../middleware/getProfile');

router.get('/unpaid', getProfile, jobController.getUnpaidJobs);

module.exports = router;
