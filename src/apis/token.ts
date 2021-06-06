import { TokenType } from 'state/transactions/actions';
import axios from './axios';
import { putOnSaleAbi } from 'abis/buy_and_sell';

export type Token = {
  TokenID: string;
  id: string;
  price?: string;
  status?: string;
  metadata: {
    status: string;
    type: string;
    payload: {
      name: string;
      description: string;
      copiesCount: number;
      royalties: number;
      file: string;
      cover?: string;
    };
    walletHash: string;
    tx_hash: string;
    thumbnail: string;
  };
};

export type PutOnSaleParams = {
  id: string;
  tx_hash: string;
  price: string;
  copiesOnSale?: number;
  offerIndex?: number;
};
export type getTokensProps = { sort?: string; walletHash?: string; status?: string };

export const getTokens = (): Promise<Token[]> => {
  return axios.get('/products');
};

export const getToken = (id: string): Promise<Token> => {
  return axios.get(`/products/${id}`);
};

export const putTokenOnSaleAPI = async ({
  id,
  tx_hash,
  price,
  copiesOnSale,
  offerIndex,
}: PutOnSaleParams): Promise<void> => {
  return axios.put(`/products/${id}`, { status: 'waitForSale', tx_hash, price, copiesOnSale, offerIndex });
};
