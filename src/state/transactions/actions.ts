import { createAction } from '@reduxjs/toolkit';
import { TransactionReceipt } from '@ethersproject/providers';

export enum TokenType {
  SINGLE = 'single',
  MULTIPLE = 'multiple',
}

export interface TransactionsListItemBase {
  chainId: number;
  hash: string;
  receipt?: TransactionReceipt;
  tokenId?: string | null;
  dropped?: boolean;
  copiesNumber?: string | null;
}

export interface TransactionListItemSingle extends TransactionsListItemBase {
  type: TokenType.SINGLE;
}

export interface TransactionListItemMultiple extends TransactionsListItemBase {
  type: TokenType.MULTIPLE;
}

export type TransactionsListItem = TransactionListItemSingle | TransactionListItemMultiple;

export const addTransaction = createAction<TransactionsListItem>('transactions/addTransaction');

export const finalizeTransaction = createAction<{
  chainId: number;
  hash: string;
  receipt: any;
  dropped: boolean;
  tokenId: string | null;
  copiesNumber?: string | null;
}>('transactions/finalizeTransaction');
