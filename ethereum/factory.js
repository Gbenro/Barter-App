import web3 from "./web3";
import BarterFactory from "./contracts/BarterFactory.json";

const instance = new web3.eth.Contract(
  BarterFactory.abi,
  BarterFactory.address
);

export default instance;
