import React, { useEffect, useState } from "react";

import { Card, Image } from "semantic-ui-react";

import Barter from "../ethereum/Barter";

const ReadNFT = ({ nftAddress, nftToken, barterAddress }) => {
  const [uri, setUri] = useState("");
  const [image, setImage] = useState("");
  const [header, setHeader] = useState("");
  const [meta, setMeta] = useState("");
  const [link, setLink] = useState("https://gateway.pinata.cloud/ipfs/");
  const [NftAddress, setNftAddress] = useState(nftAddress);
  const [NftToken, setNftToken] = useState(nftToken);
  const [BarterAddress, setBaterAddress] = useState(barterAddress);

  const getNFTDetails = () => {
    const barter = Barter(BarterAddress);
    console.log("Barter Loadeding");
    try {
      barter.methods
        .getNFTdetails(NftAddress, NftToken)
        .call()
        .then((res) => {
          setUri(res[2]);
          setHeader(res[0]);
          setMeta(res[1]);
          console.log("Barter Loaded success w/ URI", uri);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchImage = async () => {
    console.log("Data", uri);
    let jsonData = ` ${link}${uri.slice(7)}`;
    console.log("Json Data", jsonData);

    try {
      let dataIpfs = await fetch(jsonData);
      console.log("DataIPFS", dataIpfs);
      let dataipfsJson = await dataIpfs.json();
      console.log("DataIPFSJson", dataipfsJson);
      let ImageIPFS = dataipfsJson.image;
      console.log("ImageIPFS", ImageIPFS);

      let imageLink = ` ${link}${ImageIPFS.slice(7)}`;
      console.log("ImageLink", imageLink);
      setImage(imageLink);
    } catch (error) {}
  };

  useEffect(() => {
    getNFTDetails();
    fetchImage();
  });

  return (
    <div>
      <Card style={{ marginBottom: "20px" }} color="purple">
        <Image src={image} alt="NFT Jpeg" />

        <Card.Content>
          <Card.Header>{header}</Card.Header>
          <Card.Meta>
            {meta} #{NftToken}
          </Card.Meta>
          <Card.Description>
            <a
              href={`https://rinkeby.etherscan.io/token/${NftAddress}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              view on etherscan
            </a>
          </Card.Description>
        </Card.Content>
      </Card>
    </div>
  );
};

export default ReadNFT;
