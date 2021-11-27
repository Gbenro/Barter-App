import Router from "next/router";
import React, { Component } from "react";
import { Button, Message, Form, Input, Grid, Icon } from "semantic-ui-react";
import factory from "../ethereum/factory";
import { Link } from "../routes";

class BarterOptions extends Component {
  state = {
    nftAddress: "",
    errorMessage: "",
    barterAddress: "",
    loading: false,
  };

  onClickBarter = async (event) => {
    event.preventDefault();
    this.setState({ loading: true, errorMessage: "" });
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const newAddress = await factory.methods.createBarterTrade().send({
        from: accounts[0],
      });

      this.setState({ barterAddress: newAddress.events[0].address });

      Router.pushRoute(`/barter/${this.state.barterAddress}`);
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }
    this.setState({ loading: false });
  };
  onClickLoad = async (event) => {
    event.preventDefault();
    try {
      Router.pushRoute(`/barter/${this.state.barterAddress}`);
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }
  };

  render() {
    return (
      <div>
        <Form error={!!this.state.errorMessage}>
          <Form.Field>
            <Message error header="Oops" content={!!this.state.errorMessage} />
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
            <Grid>
              <Grid.Column width={5}>
                <Link route={`/barterTrade`}>
                  <a>
                    <Button
                      content="Start Barter"
                      color="purple"
                      onClick={this.onClickBarter}
                    />
                  </a>
                </Link>
              </Grid.Column>

              <Grid.Column width={4}>
                <Link route={`/barterTrade/}`}>
                  <a>
                    <Button
                      content="Load Barter"
                      inverted
                      color="purple"
                      onClick={this.onClickLoad}
                    />
                  </a>
                </Link>
              </Grid.Column>
              <Grid.Column width={7}>
                <Input
                  color="purple"
                  placeholder="Enter Barter Address"
                  value={this.state.barterAddress}
                  onChange={(event) =>
                    this.setState({ barterAddress: event.target.value })
                  }
                />{" "}
              </Grid.Column>
            </Grid>
          </Form.Field>
        </Form>
      </div>
    );
  }
}
export default BarterOptions;
