const {
  findContractForUserById,
  getActiveContractsForUser,
} = require('../../src/services/contract.service');

// Mock the Contract model methods
jest.mock('../../src/models/model.js', () => {
  // Define mock contract data
  const mockContracts = [
    {
      id: 1,
      terms: 'bla bla bla',
      status: 'terminated',
      ClientId: 1,
      ContractorId: 5,
    },
    {
      id: 2,
      terms: 'bla bla bla',
      status: 'in_progress',
      ClientId: 1,
      ContractorId: 6,
    },
    {
      id: 3,
      terms: 'bla bla bla',
      status: 'new',
      ClientId: 2,
      ContractorId: 6,
    },
    {
      id: 4,
      terms: 'bla bla bla',
      status: 'in_progress',
      ClientId: 2,
      ContractorId: 7,
    },
  ];

  return {
    Contract: {
      findAll: jest.fn().mockReturnValue(Promise.resolve(mockContracts)),
      findOne: jest.fn((options) => {
        return Promise.resolve(
          mockContracts.find((contract) => contract.id === options.where.id)
        );
      }),
    },
  };
});

describe('Contract Service Tests', () => {
  let ContractMock;

  beforeEach(() => {
    // Importing the mocked module in the test suite
    ContractMock = require('../../src/models/model.js').Contract;
  });

  // Test for successful contract retrieval
  it('should find a contract for a user by ID', async () => {
    const mockContract = {
      id: 1,
      terms: 'bla bla bla',
      status: 'terminated',
      ClientId: 1,
      ContractorId: 5,
    };

    ContractMock.findOne.mockResolvedValue(mockContract);

    const contract = await findContractForUserById(1, 1);
    expect(contract).toBeDefined();
    expect(contract.id).toBe(1);
    expect(contract.ClientId).toBe(1);
    expect(contract.ContractorId).toBe(5);
  });

  // Test for error when contract not found
  it('should throw an error if contract is not found', async () => {
    ContractMock.findOne.mockResolvedValue(null);

    await expect(findContractForUserById(1, 1)).rejects.toThrow(
      'Contract not found'
    );
  });

  // Test for validation error when IDs are not provided
  it('should throw a validation error if IDs are not provided', async () => {
    await expect(findContractForUserById()).rejects.toThrow('Validation error');
  });

  // Test for successful retrieval of active contracts
  it('should get all active contracts for a user', async () => {
    const contracts = await getActiveContractsForUser(1);
    expect(contracts).toBeDefined();
    expect(contracts.length).toBe(4);
    expect(contracts[0].id).toBe(1);
    expect(contracts[1].id).toBe(2);
  });

  // Test for validation error when ID is not provided
  it('should throw a validation error if ID is not provided', async () => {
    await expect(getActiveContractsForUser()).rejects.toThrow(
      'Validation error'
    );
  });
});
