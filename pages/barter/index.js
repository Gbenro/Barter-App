import React, { Component } from "react";
import {
  Form,
  Button,
  Input,
  Message,
  Label,
  Grid,
  Header,
  Icon,
} from "semantic-ui-react";
import Layout from "../../components/Layout";
import web3 from "../../ethereum/web3";
import Barter from "../../ethereum/contracts/Barter.json";
import ERC721 from "../../ethereum/contracts/ERC721.json";
import barterContract from "../../ethereum/Barter";
import DisplayNFTs from "../../components/displayNFTs";

class BarterIndex extends Component {
  static async getInitialProps(props) {
    const barter = barterContract(props.query.address);

    const summary = await barter.methods.getBarterSummary().call();

    return {
      btr: barter,
      address: props.query.address,
      makerNFTArray: summary[3],
      takerNFTArray: summary[4],
      amountPaid: summary[5],
    };
  }

  state = {
    makerNftAddress: "",
    takerNftAddress: "",
    EthToDeposit: "",

    makerTokenId: "",
    takerTokenId: "",

    errorMessage: "",
    loading: false,
    EthDeposited: "",
  };

  componentDidMount() {
    this.setState({ EthDeposited: this.props.amountPaid });
  }

  onSubmitMaker = async (event) => {
    event.preventDefault();

    let arry = this.state.makerTokenId.split(",");
    this.setState({ makerTokenId: "" });
    console.log("barterIndex MakerDeposit nftAdd:", this.state.makerNftAddress);
    console.log("BarterIndex nftID:", arry);
    this.setState({ loading: true, errorMessage: "" });
    try {
      const instance = barterContract(this.props.address);

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      await instance.methods
        .makerDepositNFT(this.state.makerNftAddress, arry)
        .send({
          from: accounts[0],
        });
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }
  };

  onSubmitTaker = async (event) => {
    event.preventDefault();

    this.setState({ loading: true });
    let arry = this.state.takerTokenId.split(",");
    this.setState({ takerTokenId: "" });

    try {
      const instance = new web3.eth.Contract(Barter.abi, this.props.address);
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      await instance.methods
        .takerDepositNFT(this.state.takerNftAddress, arry)
        .send({
          from: accounts[0],
        });
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }
    this.setState({ loading: false });
  };
  onSubmitEth = async (event) => {
    event.preventDefault();
    this.setState({ loading: true });

    try {
      const instance = new web3.eth.Contract(Barter.abi, this.props.address);

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      await instance.methods.depositETH().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.EthToDeposit, "ether"),
      });
      const amount = instance.methods.amountPaid().call();
      this.setState({ EthDeposited: amount });
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }
    this.setState({ loading: false });
  };

  onApproveMaker = async (event) => {
    event.preventDefault();

    this.setState({ loading: true });
    try {
      const instance = new web3.eth.Contract(
        ERC721.abi,
        this.state.makerNftAddress
      );

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      await instance.methods.setApprovalForAll(this.props.address, true).send({
        from: accounts[0],
      });
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }
    this.setState({ loading: false });
  };
  onApproveTaker = async (event) => {
    event.preventDefault();

    this.setState({ loading: true });
    try {
      const instance = new web3.eth.Contract(
        ERC721.abi,
        this.state.takerNftAddress
      );

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      await instance.methods.setApprovalForAll(this.props.address, true).send({
        from: accounts[0],
      });
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }
    this.setState({ loading: false });
  };

  onApproveBarter = async (event) => {
    event.preventDefault();
    this.setState({ loading: true });

    try {
      const instance = new web3.eth.Contract(Barter.abi, this.props.address);
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      await instance.methods.approveBarter().send({
        from: accounts[0],
        value: web3.utils.toWei("0.01", "ether"),
      });
      this.setState({ loading: false });
    } catch (error) {
      console.log(error);
    }
    this.setState({ loading: false });
  };
  onCancelBarter = async (event) => {
    event.preventDefault();
    this.setState({ loading: true });

    try {
      const instance = new web3.eth.Contract(Barter.abi, this.props.address);
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      await instance.methods.cancelBarter().send({
        from: accounts[0],
      });
      this.setState({ loading: false });
    } catch (error) {
      console.log(error);
    }
    this.setState({ loading: false });
  };

  handleSelectorValueChange = ({ target: { value } }) => {
    this.setState({ makerTokenId: value });
  };
  handleSelectorValueChangeTaker = ({ target: { value } }) => {
    this.setState({ takerTokenId: value });
  };
  displayEthBalance() {
    const bal = web3.utils.fromWei(this.state.EthDeposited, "ether");
    return bal;
  }
  render() {
    return (
      <Layout>
        <Grid divided>
          <Grid.Row>
            <Grid.Column>
              {this.state.loading ? (
                <Message icon>
                  <Icon name="circle notched" loading />
                  <Message.Content>
                    <Message.Header>Just one second</Message.Header>
                    We are fetching that content for you.
                  </Message.Content>
                </Message>
              ) : (
                ""
              )}
              <Label
                size="large"
                color="purple"
                style={{ marginBottom: "10px" }}
              >
                Barter Address
              </Label>
              <span>{this.props.address}</span>
              <Form
                onSubmit={this.onSubmitMaker}
                error={!!this.state.errorMessage}
              >
                <Form.Field>
                  <Message
                    error
                    header="Oops"
                    content={!!this.state.errorMessage}
                  />

                  <Input
                    label="Maker NFT Address"
                    style={{ marginBottom: "10px" }}
                    value={this.state.makerNftAddress}
                    onChange={(event) =>
                      this.setState({ makerNftAddress: event.target.value })
                    }
                  />

                  <Input
                    label="Maker Token ID(s)"
                    value={this.state.makerTokenId}
                    placeholder="Separate by comma for multiple nfts of the same collection"
                    onChange={this.handleSelectorValueChange}
                  />
                </Form.Field>

                <Button
                  color="green"
                  onClick={this.onApproveMaker}
                  style={{ marginBottom: "10px" }}
                >
                  Approve Maker NFT
                </Button>
                <Button color="purple">Deposit Maker NFT</Button>
              </Form>

              <Form
                onSubmit={this.onSubmitTaker}
                error={!!this.state.errorMessage}
              >
                <Form.Field>
                  <Input
                    label="Taker NFT Address"
                    style={{ marginBottom: "10px" }}
                    value={this.state.takerNftAddress}
                    onChange={(event) =>
                      this.setState({ takerNftAddress: event.target.value })
                    }
                  />

                  <Input
                    label="Taker Token ID(s)"
                    value={this.state.takerTokenId}
                    placeholder="Separate by comma for multiple nfts of the same collection"
                    onChange={this.handleSelectorValueChangeTaker}
                  />
                </Form.Field>
                <Button
                  color="green"
                  onClick={this.onApproveTaker}
                  style={{ marginBottom: "10px" }}
                >
                  Approve Taker NFT
                </Button>
                <Button color="purple">Deposit Taker NFT!</Button>
              </Form>

              <Form
                class=""
                onSubmit={this.onSubmitEth}
                error={!!this.state.errorMessage}
              >
                <Form.Field>
                  <Input
                    style={{ marginBottom: "10px" }}
                    placeholder="Enter Eth Amount"
                    label="eth"
                    labelPosition="right"
                    value={this.state.EthtoDeposit}
                    onChange={(e) =>
                      this.setState({ EthToDeposit: e.target.value })
                    }
                  />
                </Form.Field>
                <div style={{ marginBottom: "10px" }}>
                  <Button color="purple">Deposit ETH</Button>

                  <Label>
                    Deposited:{" "}
                    {this.displayEthBalance() ? this.displayEthBalance() : ""}
                    eth
                  </Label>
                </div>
              </Form>

              <Button.Group>
                <Button onClick={this.onApproveBarter} inverted color="green">
                  Approve Barter
                </Button>
                <Button.Or />
                <Button onClick={this.onCancelBarter} inverted color="red">
                  Cancel Barter
                </Button>
              </Button.Group>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="2">
            <Grid.Column>
              <Header>Maker NFT(s)</Header>
              <DisplayNFTs
                NFTArray={this.props.makerNFTArray}
                barterAddress={this.props.address}
              />
            </Grid.Column>
            <Grid.Column>
              <Header>Taker NFT(s)</Header>
              <DisplayNFTs
                NFTArray={this.props.takerNFTArray}
                barterAddress={this.props.address}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default BarterIndex;
