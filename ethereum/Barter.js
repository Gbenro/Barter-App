import web3 from "./web3";

import Barter from "./contracts/Barter.json";

export default (address) => {
  return new web3.eth.Contract(Barter.abi, address);
};
