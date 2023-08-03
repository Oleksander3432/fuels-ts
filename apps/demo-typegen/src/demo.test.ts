// #region Testing-with-jest-ts
import { generateTestWallet } from '@fuel-ts/wallet/test-utils';
import { ContractFactory, Provider, toHex, BaseAssetId } from 'fuels';

import { DemoContractAbi__factory } from './generated-types';
import bytecode from './generated-types/DemoContractAbi.hex';

describe('ExampleContract', () => {
  it('should return the input', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');
    const wallet = await generateTestWallet(provider, [[1_000, BaseAssetId]]);

    // Deploy
    const factory = new ContractFactory(bytecode, DemoContractAbi__factory.abi, wallet);
    const contract = await factory.deployContract();

    // Call
    const { value } = await contract.functions.return_input(1337).call();

    // Assert
    expect(value.toHex()).toEqual(toHex(1337));

    // You can also make a call using the factory
    const contractInstance = DemoContractAbi__factory.connect(contract.id, wallet);
    const { value: v2 } = await contractInstance.functions.return_input(1337).call();
    expect(v2.toHex()).toBe(toHex(1337));
  });

  it('deployContract method', async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');
    const wallet = await generateTestWallet(provider, [[1_000, BaseAssetId]]);

    // Deploy
    const contract = await DemoContractAbi__factory.deployContract(bytecode, wallet);

    // Call
    const { value } = await contract.functions.return_input(1337).call();

    // Assert
    expect(value.toHex()).toEqual(toHex(1337));
  });
});
// #endregion Testing-with-jest-ts
