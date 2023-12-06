const SequelizeMock = require('sequelize-mock');
const dbMock = new SequelizeMock();

// Mocking individual contract instances
const contract1 = dbMock.define('Contract', {
  id: 1,
  terms: 'bla bla bla',
  status: 'terminated',
  ClientId: 1,
  ContractorId: 5,
});

const contract2 = dbMock.define('Contract', {
  id: 2,
  terms: 'bla bla bla',
  status: 'in_progress',
  ClientId: 1,
  ContractorId: 6,
});

const contract3 = dbMock.define('Contract', {
  id: 3,
  terms: 'bla bla bla',
  status: 'new',
  ClientId: 2,
  ContractorId: 6,
});

const contract4 = dbMock.define('Contract', {
  id: 4,
  terms: 'bla bla bla',
  status: 'in_progress',
  ClientId: 2,
  ContractorId: 7,
});

// Mocking the Contract model's behavior
const ContractMock = dbMock.define('Contract');

// Mocking 'findAll' method to return all mock contracts
ContractMock.findAll.mockReturnValue([
  contract1,
  contract2,
  contract3,
  contract4,
]);

// Mocking 'findOne' method for specific cases
ContractMock.findOne.mockImplementation((options) => {
  if (options.where.id === 1) {
    return contract1;
  } else if (options.where.id === 2) {
    return contract2;
  } else if (options.where.id === 3) {
    return contract3;
  } else if (options.where.id === 4) {
    return contract4;
  } else {
    return null;
  }
});

module.exports = ContractMock;
