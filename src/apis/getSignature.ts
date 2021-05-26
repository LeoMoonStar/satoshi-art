import Web3 from 'web3';
import getWeb3 from '../pages/ConnectWallet/Wallets/getWeb3';
import axios from 'axios';
import { createLoginAsCookies } from './cookie';

export const signChallenge = async () => {
  const web3 = await getWeb3();
  const accounts = await web3.eth.getAccounts();

  const challendgeRes = await fetch(process.env.REACT_APP_API_NEWURL + `/api/public/auth/${accounts}`);

  const challenge = await challendgeRes.json();

  let sig;

  // web3.currentProvider.send(
  //     {
  //         method: "eth_signTypedData",
  //         params: [challenge.challenge, accounts[0]],
  //         from: accounts[0]
  //     },
  //     (_: any, res: any) => {

  //         sig = res.result
  //         axios.get(process.env.REACT_APP_API_NEWURL + `/api/public/auth/${challenge.challenge[1].value}/${res.result}/${accounts[0]}`)
  //         .then(signatureRes => { console.log("9999999", signatureRes) })
  //         .catch(err => console.log("11111111",err))
  //     }
  // )
  web3.currentProvider.send(
    {
      method: 'eth_signTypedData',
      params: [challenge.challenge, accounts[0]],
      from: accounts[0],
    },
    (error: any, res: any) => {
      axios
        .get(`http://localhost:4000/api/public/auth/${challenge.challenge[1].value}/${res.result}/${accounts}`)
        .then(() => console.log('1111111'))
        .catch(err => console.log(err));
    }
  );

  // while( true){
  //     if(sig){
  //         console.log("xxxxx", sig)
  //         break
  //     }
  // }
};

const getSignature = async (challenge: any, result: any, accounts: any) => {
  /*axios.get(process.env.REACT_APP_API_NEWURL + `/api/public/auth/${challenge}/${result}/${accounts}`)
                .then(signatureRes => { console.log("9999999", signatureRes) })
                .catch(err => console.log("11111111",err))
            console.log("xxxxxxxx")
            // const signatureRes = await fetch(process.env.REACT_APP_API_NEWURL + `/api/public/auth/${challenge.challenge[1].value}/${res.result}/${accounts[0]}`)
            // const recovered = await signatureRes.json()
            // console.log("9999999", recovered)
            // if (signatureRes.status == 200 && recovered.data.recover === accounts) {
            //     console.log("Signature verified")
            //     // createLoginAsCookies({ id: signatureRes.data.id, metamask_address: signatureRes.data.metamaskId, token: signatureRes.data.token })
            // } else {
            //     console.log("Signature not verified")
            // }*/
};
