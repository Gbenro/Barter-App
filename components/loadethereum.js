import BarterFactory from "../ethereum/contracts/BarterFactory.json";
import Web3 from "web3";
import { useState, useEffect } from "react";

const InitialInfo = {
  connected: false,
  status: null,
  account: null,
  contract: null,
};
const LoadEthereum = () => {
  const [info, setInfo] = useState(InitialInfo);

  const init = async () => {
    if (window.ethereum?.isMetaMask) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const networkId = await window.ethereum.request({
        method: "net_version",
      });
      if (networkId == 4) {
        let web3 = new Web3(window.ethereum);
        setInfo({
          ...InitialInfo,
          connected: true,
          account: accounts[0],
          contract: new web3.eth.Contract(
            BarterFactory.abi,
            BarterFactory.address
          ),
        });
      } else {
        setInfo({
          ...InitialInfo,
          status: "you need to be on the Rinkeby Test Network",
        });
      }
    } else {
      setInfo(...InitialInfo, { status: "you need MetaMask" });
    }
  };

  const initOnChange = () => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
      window.ethereum.on("ChainChanged", () => {
        window.location.reload();
      });
    }
  };

  const getDrops = async () => {
    info.contract.methods
      .deployedBarterTrades(2)
      .call()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadBarter = async () => {};

  useEffect(() => {
    init();
    initOnChange();
  }, []);
  return (
    <div>
      <button onClick={() => getDrops()}>get Deployed BarterTrades</button>
    </div>
  );
};

export default LoadEthereum;
