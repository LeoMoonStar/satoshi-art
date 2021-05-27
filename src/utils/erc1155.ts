import { Interface } from 'ethers/lib/utils';
import { ethers } from 'ethers';
import Satoshi1155 from 'abis/SatoshiART1155.json';
import ERC1155Engine from 'abis/ERC1155Engine.json';
import { getKeyValue } from 'utils/helpers';
import { NetworkData } from './erc721';

export const Satoshi1155ABI = Satoshi1155.abi;

export const Engine1155ABI = ERC1155Engine.abi;

export const use1155SmartContractNetworkData = (chainId?: number): NetworkData => {
  return getKeyValue(Satoshi1155.networks)(chainId as any);
};

export const use1155EngineSmartContractNetworkData = (chainId?: number): NetworkData => {
  return getKeyValue(ERC1155Engine.networks)(chainId as any);
};

export function use1155EthersUtils(): Interface {
  return new ethers.utils.Interface(Satoshi1155ABI);
}
