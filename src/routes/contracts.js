const express = require('express');
const { getProfile } = require('../middleware/getProfile');
const contractController = require('../controllers/contractController');

const router = express.Router();

router.get('/:id', getProfile, contractController.getContractById);

module.exports = router;
