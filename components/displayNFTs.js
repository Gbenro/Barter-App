import React from "react";
import ReadNFT from "./readNFTs";

const DisplayNFTs = ({ NFTArray, barterAddress }) => {
  
  return (
    <>
      {NFTArray.map((nftdetail) => (
        <ReadNFT
          key={nftdetail[1]}
          nftAddress={nftdetail[0]}
          nftToken={nftdetail[1]}
          barterAddress={barterAddress}
        />
      ))}
    </>
  );
};

export default DisplayNFTs;
