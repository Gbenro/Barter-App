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
    //console.log("Barter Address", props.query.address);
    const barter = await barterContract(props.query.address);

    const summary = await barter.methods.getBarterSummary().call();
    console.log("makerAddress", summary[1]);
    console.log("takerAddress", summary[2]);
    return {
      btr: barter,
      address: props.query.address,
      makerAddress: summary[1],
      takerAddress: summary[2],
      makerNFTArray: summary[3],
      takerNFTArray: summary[4],
      amountPaid: summary[5],
    };
  }

  state = {
    nftAddress: "",
    nftTokenId: "",

    makerNftAddress: "",
    takerNftAddress: "",
    EthToDeposit: "",

    makerTokenId: "",
    takerTokenId: "",

    errorMessage: "",
    loading: false,
    EthDeposited: "",
  };

  onDepositNFT = async (event) => {
    event.preventDefault();
    let arry = this.state.nftTokenId.split(",");
    this.setState({ nftTokenId: "" });
    this.setState({ loading: true, errorMessage: "" });
    const emptyAddress = /^0x0+$/.test(this.props.takerAddress);
    console.log("empty address", emptyAddress);
    console.log("taker address", this.props.takerAddress);
    console.log("maker address", this.props.makerAddress);
    try {
      const instance = new web3.eth.Contract(Barter.abi, this.props.address);
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("account", accounts[0]);
      if (accounts[0].toLowerCase() === this.props.makerAddress.toLowerCase()) {
        await instance.methods
          .makerDepositNFT(this.state.nftAddress, arry)
          .send({
            from: accounts[0],
          });
      } else {
        if (
          accounts[0].toLowerCase() == this.props.takerAddress.toLowerCase() ||
          emptyAddress
        ) {
          await instance.methods
            .takerDepositNFT(this.state.nftAddress, arry)
            .send({
              from: accounts[0],
            });
        }
      }
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }
  };

  onApproveNFT = async (event) => {
    event.preventDefault();

    this.setState({ loading: true });

    try {
      const instance = new web3.eth.Contract(ERC721.abi, this.state.nftAddress);
      const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      await instance.methods.setApprovalForAll(this.props.address, true).send({
        from: account,
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
      const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      await instance.methods.approveBarter().send({
        from: account,
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
      const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      await instance.methods.cancelBarter().send({
        from: account,
      });
      this.setState({ loading: false });
    } catch (error) {
      console.log(error);
    }
    this.setState({ loading: false });
  };
  onSubmitEth = async (event) => {
    event.preventDefault();
    this.setState({ loading: true });

    try {
      const instance = new web3.eth.Contract(Barter.abi, this.props.address);

      const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      await instance.methods.depositETH().send({
        from: account,
        value: web3.utils.toWei(this.state.EthToDeposit, "ether"),
      });
      const amount = instance.methods.amountPaid().call();
      this.setState({ EthDeposited: web3.utils.toWei(amount, "ether") });
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }
    this.setState({ loading: false });
  };

  handleSelectorValueChange = ({ target: { value } }) => {
    this.setState({ nftTokenId: value });
  };

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
                onSubmit={this.onDepositNFT}
                error={this.state.errorMessage}
              >
                <Form.Field>
                  <Message
                    error
                    header="Oops"
                    content={this.state.errorMessage}
                  />

                  <Input
                    label="NFT Address"
                    style={{ marginBottom: "10px" }}
                    value={this.state.nftAddress}
                    onChange={(event) =>
                      this.setState({ nftAddress: event.target.value })
                    }
                  />

                  <Input
                    label="NFT Token ID(s)"
                    value={this.state.nftTokenId}
                    placeholder="Separate by comma for multiple nfts of the same collection"
                    onChange={this.handleSelectorValueChange}
                  />
                </Form.Field>

                <Button
                  color="green"
                  onClick={this.onApproveNFT}
                  style={{ marginBottom: "10px" }}
                >
                  Approve NFT
                </Button>
                <Button color="purple">Deposit NFT</Button>
              </Form>

              <Form
                class=""
                onSubmit={this.onSubmitEth}
                error={this.state.errorMessage}
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
                    Deposited:
                    {this.state.EthDeposited}
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
