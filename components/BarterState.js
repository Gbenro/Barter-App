import { useState } from "react";
import Barter from "../ethereum/Barter";

const BarterState = async (address) => {
  const [bState, setBState] = useState("");
  const barter = Barter(address);

  const stateRes = await barter.methods.projectState().call();

  console.log("State result", stateRes);
  if (stateRes == 0) {
    setBState("Barter Initiated");
  } else if (stateRes == 1) {
    setBState("Maker Deposited NFT");
  } else if (stateRes == 2) {
    setBState("Taker Deposited NFT");
  } else if (stateRes == 3) {
    setBState("Maker Cancelled Barter");
  } else if (stateRes == 4) {
    setBState("Taker Cancelled Barter");
  } else if (stateRes == 5) {
    setBState("Maker Approved Barter");
  } else if (stateRes == 6) {
    setBState("Taker Approved Barter");
  } else if (stateRes == 7) {
    setBState("Barter Completed");
  }

  return bState;
};

export default BarterState;
