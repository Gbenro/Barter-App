import React, { Component } from "react";
import { Card, Grid, Header } from "semantic-ui-react";
import Layout from "../../components/Layout";
import Barter from "../../ethereum/Barter";
import web3 from "../../ethereum/web3";
import DisplayNFTs from "../../components/displayNFTs";

class BarterShow extends Component {
  static async getInitialProps(props) {
    const barter = Barter(props.query.address);

    const summary = await barter.methods.getBarterSummary().call();
    console.log("show getInitprops Summarry:", summary);
    return {
      barter: barter,
      barterAddress: summary[0],
      makerAddress: summary[1],
      takerAddress: summary[2],
      makerNFTArray: summary[3],
      takerNFTArray: summary[4],
      amountPaid: summary[5],
      barterCompleted: summary[6],
    };
  }

  renderCards() {
    const {
      barterAddress,
      makerAddress,
      takerAddress,
      makerNFTArray,
      takerNFTArray,
      amountPaid,
      barterCompleted,
    } = this.props;

    const items = [
      {
        header: "Barter Address",
        description: barterAddress,
        style: { overflowWrap: "break-word" },
        color: "purple",
      },
      {
        header: "Maker Address",
        description: makerAddress,
        style: { overflowWrap: "break-word" },
        color: "purple",
      },
      {
        header: "Taker Address",
        description: takerAddress,
        style: { overflowWrap: "break-word" },
        color: "purple",
      },
      {
        header: "Eth Deposited",
        description: web3.utils.fromWei(amountPaid, "ether") + " eth",
        color: "purple",
      },
      {
        header: "Barter Completed",
        description: barterCompleted ? "True" : "False",
        color: "purple",
      },
    ];
    return (
      <Grid columns="2">
        <Grid.Row>
          <Grid.Column>
            <Card.Group fluid="true" items={items} />
          </Grid.Column>
        </Grid.Row>

        <Grid.Column>
          <Header>Maker NFT(s)</Header>
          <DisplayNFTs
            barterAddress={this.props.barterAddress}
            NFTArray={this.props.makerNFTArray}
          />
        </Grid.Column>

        <Grid.Column>
          <Header>Taker NFT(s)</Header>
          <DisplayNFTs
            barterAddress={this.props.barterAddress}
            NFTArray={this.props.takerNFTArray}
          />
        </Grid.Column>
      </Grid>
    );
  }

  render() {
    return (
      <Layout>
        <h3>Show barter</h3>
        {this.renderCards()}
      </Layout>
    );
  }
}

export default BarterShow;
