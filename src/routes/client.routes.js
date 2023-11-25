const express = require('express');
const router = express.Router();
const clientController = require('../controllers/client.controller');
const { getProfile } = require('../middleware/getProfile');

router.post('/balances/deposit/:userId', getProfile, clientController.depositBalance);

module.exports = router;
