import { useRouter } from "next/router";
import React, { useState } from "react";
import { Button, Message, Form, Input, Grid, Icon } from "semantic-ui-react";
import factory from "../ethereum/factory";
import { Link } from "../routes";

const BarterOptions = () => {
  const router = useRouter();
  // const [nftAddress, setNftAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [barterAddress, setBarterAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const onClickBarter = async (event) => {
    event.preventDefault();

    setLoading(true);
    setErrorMessage("");
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const newAddress = await factory.methods.createBarterTrade().send({
        from: accounts[0],
      });
      console.log("new barter address", newAddress.events[0].address);
      setBarterAddress(newAddress.events[0].address);
      console.log("barter Address set", barterAddress);
    
        router.push( `/barter/${barterAddress}`);

    } catch (error) {
      setErrorMessage(error.message);
    }
    setLoading(false);
  };
  const onClickLoad = async (event) => {
    event.preventDefault();

    try {
      router.push(`/barter/[p${barterAddress}]`, `/barter/${barterAddress}`);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
      <Form error={!!errorMessage}>
        <Form.Field>
          <Message error header="Oops" content={!!errorMessage} />
          {loading ? (
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
                    onClick={onClickBarter}
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
                    onClick={onClickLoad}
                  />
                </a>
              </Link>
            </Grid.Column>
            <Grid.Column width={7}>
              <Input
                color="purple"
                placeholder="Enter Barter Address"
                value={barterAddress}
                onChange={(event) => setBarterAddress(event.target.value)}
              />{" "}
            </Grid.Column>
          </Grid>
        </Form.Field>
      </Form>
    </div>
  );
};
export default BarterOptions;
