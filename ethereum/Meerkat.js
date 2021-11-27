import web3 from "./web3";

import Meerkat from "./contracts/Meerkat.json";

export default () => {
  return new web3.eth.Contract(
    Meerkat.abi,
    "0xbeDc6AeDfb03173A57148576a068c5D1F8cffdd1"
  );
};
