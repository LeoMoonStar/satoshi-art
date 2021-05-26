import axios from './axios';

type CurrencyType = {
  currency: string;
};

export const getCurrency = async (): Promise<string> => {
  const { currency }: CurrencyType = await axios.get('et-hto-us-dcurrency');

  return currency;
};
