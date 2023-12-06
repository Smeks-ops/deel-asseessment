const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { getProfile } = require('../middleware/getProfile');

router.get('/best-profession', getProfile, adminController.getBestProfession);
router.get('/best-clients', getProfile, adminController.getBestClients);

module.exports = router;
