export const MAINNET_NETWORK_ID = 1;
export const ROPSTEN_NETWORK_ID = 3;
export const RINKEBY_NETWORK_ID = 4;
export const GOERLI_NETWORK_ID = 5;
export const KOVAN_NETWORK_ID = 42;

type Network = {
  [id: string]: {
    EXPLORER: string;
    RPC_URI: string;
    name: string;
    accepted: boolean;
    testnet: boolean;
  };
};

const Networks: Network = {
  [MAINNET_NETWORK_ID]: {
    EXPLORER: 'https://etherscan.io',
    RPC_URI: process.env.REACT_APP_HTTP_PROVIDER as string,
    name: 'Ethereum Mainnet',
    accepted: true,
    testnet: false,
  },
  [ROPSTEN_NETWORK_ID]: {
    EXPLORER: 'https://ropsten.etherscan.io',
    RPC_URI: 'https://ropsten.infura.io/v3/' + process.env.REACT_APP_INFURA_KEY,
    name: 'Ethereum Testnet Ropsten',
    accepted: process.env.REACT_APP_SPECIAL_MODE !== 'production',
    testnet: true,
  },
  [RINKEBY_NETWORK_ID]: {
    EXPLORER: 'https://rinkeby.etherscan.io',
    RPC_URI: 'https://rinkeby.infura.io/v3/' + process.env.REACT_APP_INFURA_KEY,
    name: 'Ethereum Testnet Rinkeby',
    accepted: false,
    testnet: true,
  },
  [GOERLI_NETWORK_ID]: {
    EXPLORER: 'https://goerli.etherscan.io',
    RPC_URI: 'https://goerli.infura.io/v3/' + process.env.REACT_APP_INFURA_KEY,
    name: 'Ethereum Testnet Göerli',
    accepted: false,
    testnet: true,
  },
  [KOVAN_NETWORK_ID]: {
    EXPLORER: 'https://kovan.etherscan.io',
    RPC_URI: 'https://kovan.infura.io/v3/' + process.env.REACT_APP_INFURA_KEY,
    name: 'Ethereum Testnet Kovan',
    accepted: false,
    testnet: true,
  },
};

export default Networks;
