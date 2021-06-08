import axios from './axios';

export const getEthPrice = () => {
    return axios.get(`https://api.etherscan.io/api?module=stats&action=ethprice&apikey=YWDKA574NPYT4UE9W1AYY8ZTWY1WPK2N83`);
  };