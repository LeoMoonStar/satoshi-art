import Web3 from "web3";

// const getWeb3 = () =>
//   new Promise((resolve, reject) => {
//     window.addEventListener("load", () => {
//       let web3 = window.web3;

//       if (typeof web3 !== "undefined") {
//         web3 = new Web3("HTTP://127.0.0.1:7545");
//         resolve(web3);
//       } else {
//         reject("No web3 instance injected, make sure MetaMask is installed.");
//       }
//     });
//   });

const getWeb3 = () => {
  return new Promise((resolve, reject) => {
    window.addEventListener("load", async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          // ask user permission to access his accounts
          await window.ethereum.request({ method: "eth_requestAccounts" });
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      } else {
        reject("Must install MetaMask");
      }
    });
  });
};

export default getWeb3;