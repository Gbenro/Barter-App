import { useState } from "react";
import { Button, Form, Input, Label, Message, Icon } from "semantic-ui-react";
import Meerkat from "../ethereum/Meerkat";
import Layout from "../components/Layout";
const WhiteList = () => {
  const [inputVal, setInputVal] = useState("");
  const [whitelisted, setWhitelisted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onWhitelist = async () => {
    setLoading(true);
    const meerkat = Meerkat();

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("InputVal", inputVal);
      await meerkat.methods.addWhitelist(inputVal).send({
        from: accounts[0],
      });
      setWhitelisted(true);
    } catch (error) {
      setErrorMessage(error.message);
    }
    setLoading(false);
  };

  return (
    <Layout>
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
      <Form onSubmit={onWhitelist} error={errorMessage}>
        <Form.Field>
          <Input
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Enter address for Whitelisting"
            style={{ marginBottom: "10px", marginTop: "10px" }}
          />

          <Button color="purple">Whitelist</Button>

          {/* <Label>whitelisted:{whitelisted}</Label> */}
        </Form.Field>
      </Form>
    </Layout>
  );
};
export default WhiteList;
