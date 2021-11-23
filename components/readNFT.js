import React, { Component, useEffect } from "react";

import { Card, Image } from "semantic-ui-react";

import Barter from "../ethereum/Barter";

class ReadNFT extends Component {
  state = {
    uri: "",
    image: "",
    header: "",
    meta: "",
    link: "https://gateway.pinata.cloud/ipfs/",
  };

  getMetaFromURI = async () => {
    try {
      let response = await fetch(
        `${this.state.link}${this.state.uri.slice(7)}`,
        {
          mode: "no-cors",
        }
      );
      let responseJson = await response.json();
      let nftImage = responseJson.image;
      let ImageResponse = await fetch(`${this.state.link}${nftImage.slice(7)}`);
      // console.log("Image Link", ImageResponse);
      this.setState({ image: ImageResponse.url });
      // return ImageResponse;
    } catch (error) {
      console.error(error);
    }
  };

  renderNFT() {
    const barter = Barter(this.props.barterAddress);
    try {
      barter.methods
        .getNFTdetails(this.props.nftAddress, this.props.nftToken)
        .call()
        .then((res) => {
          this.setState({
            uri: res[2],
            header: res[0],
            meta: res[1],
          });
        });

      this.getMetaFromURI();
    } catch (error) {
      console.log(error);
    }

    return (
      <div>
        <Card style={{ marginBottom: "20px" }} color="purple">
          <Image src={this.state.image} />
          <Card.Content>
            <Card.Header>{this.state.header}</Card.Header>
            <Card.Meta>
              {this.state.meta} #{this.props.nftToken}
            </Card.Meta>
            <Card.Description>
              <a href={`https://etherscan.io/address/${this.props.nftAddress}`}>
                view on etherscan
              </a>
            </Card.Description>
          </Card.Content>
        </Card>
      </div>
    );
  }

  render() {
    return <>{this.renderNFT()}</>;
  }
}

export default ReadNFT;
