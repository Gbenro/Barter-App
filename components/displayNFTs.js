import React, { useEffect } from "react";
import ReadNFT from "./readNFTs";

const DisplayNFTs = ({ NFTArray, barterAddress }) => {
  const showNFTs = () => {
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

  // useEffect(() => {
  //   showNFTs();

  //   console.log("renders first time andwhen NFTArray changes @Display NFT");
  //   console.log("NFTArry", NFTArray.length);
  // }, [NFTArray.length]);

  return <>{showNFTs()}</>;
};

export default DisplayNFTs;
