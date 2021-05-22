import { AppState } from '../';

export const permittedToUseWalletSelector = (state: AppState): boolean => {
  return state.app.isPermittedToUseWallet;
};

export const permittedToUseWalletAndWhiteListedSelector = (state: AppState): boolean => {
  return state.app.isPermittedToUseWallet && state.app.isWhitelisted;
};

export const transactionInMintingProcessSelector = (state: AppState): string | null => {
  return state.app.transactionInMintingProcess;
};

export const ethToUsdRateSelector = (state: AppState): number => {
  return state.app.ethToUsd;
};
