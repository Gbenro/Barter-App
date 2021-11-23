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
    try {
      barter.methods
        .getNFTdetails(NftAddress, NftToken)
        .call()
        .then((res) => {
          setUri(res[2]);
          setHeader(res[0]);
          setMeta(res[1]);
        });
    } catch (error) {
      console.log(error);
    }
  };

  //   const getMetaFromURI = async () => {
  //     try {
  //       console.log("URI", uri);
  //       let response = await fetch(`${link}${uri.slice(7)}`, {
  //         mode: "no-cors",
  //       });
  //       let responseJson = await response.json();
  //       let nftImage = responseJson.image;
  //       console.log("Json response", responseJson);
  //       let ImageResponse = await fetch(`${link}${nftImage.slice(7)}`);
  //       let ImageRes = ImageRes.image;
  //       console.log("Image Link", ImageResponse.url);
  //       console.log("Image Link2", ImageRes);
  //       setImage(ImageResponse.url);
  //       console.log(image);
  //       // return ImageResponse;
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  const fetchImage = async (data) => {
    console.log("Data", data);
    try {
      let response = await fetch(data, {
        mode: "no-cors",
      });
      console.log("Response:", response);
      let responseJson = await response.json();
      console.log("ResponseJson", responseJson);
      let nftImage = responseJson.image;
      let ImageResponse = await fetch(`${link}${nftImage.slice(7)}`);
      let ImageRes = ImageResponse.url;
      setImage(ImageRes);
    } catch (error) {}
    return image;
  };

  useEffect(() => {
    // getMetaFromURI();
    getNFTDetails();
  });

  return (
    <div>
      <Card style={{ marginBottom: "20px" }} color="purple">
        <Image src={fetchImage(`${link}${uri.slice(7)}`)} alt="NFT Jpeg" />

        {console.log("iMAGE Link", `${link}${uri.slice(7)}`)}
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
