const express = require('express');
const { getProfile } = require('../middleware/getProfile');
const contractController = require('../controllers/contract.controller');

const router = express.Router();

router.get('/:id', getProfile, contractController.getContractById);
router.get('/', getProfile, contractController.getActiveContracts);

module.exports = router;
