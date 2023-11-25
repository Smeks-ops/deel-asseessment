const { Contract } = require('../models/model');

const findContractById = async (id) => {
    return await Contract.findOne({ where: { id } });
};

module.exports = {
    findContractById,
};
