import { Web3Provider, ExternalProvider } from "@ethersproject/providers";

export function getLibrary(provider: ExternalProvider): Web3Provider {
  return new Web3Provider(provider);
}
