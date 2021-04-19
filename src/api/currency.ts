import axios from 'axios'

export const getCurrency = async (): Promise<string> => {
    const response = await axios.get(
        `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${process.env.REACT_APP_ETHERSCAN_KEY}`
    )
    return response.data.result.ethusd
}
