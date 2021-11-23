import React from "react";
import { Container, Header } from "semantic-ui-react";
import Layout from "../components/Layout";

const HowTo = () => {
  return (
    <Layout>
      <Container text>
        <Header>How to Barter.</Header>
        <h3> Starting a Barter</h3>
        <p>
          To Start, click on <b>Start barter</b> on the homepage. This will start a new
          barter contract for you. MetaMask will open up and ask you to confirm
          the transaction. Once the transaction is mined, you will be directed
          the barter page. You should copy the barter Address for your barter
          counterpart.
        </p>

        <p>
          The <b>Maker</b> is the one that started the barter contract. While
          the <b>Taker </b>
          the counterpart joining the Barter Trade.
        </p>
        <h3> Approving NFT</h3>
        <p>
          Once the barter page has loaded. You need to first <b>approve</b> this
          contract to hold your NFT. To Approve, just enter your NFT contract
          address click approve, then sign the transaction on metamask.
        </p>
        <h3> Depositing NFT(s)</h3>
        <p>
          Once you have approved your NFT. You can enter the token ID(s). If you
          are depositing multiple NFTs from the same collection, just separte
          the token Ids by comma(i.e. 2,77,902). <br /> <b>Note:</b> You can
          only deposit multiple NFT(s) if they are of the same collection. If
          you want to deposit multiple NFT(s) of different collections, you will
          have the approve each NFT collection first.
        </p>
        <h3> Depositing Eth</h3>
        <p>
          If either party negotiated to pay some Eth along with the barter.
          Enter the amout to deposit, click the deposit Eth button then confirm
          the transaction on metamask. The Eth deposited will be displayed.
          <br />
          <b>Note:</b> Only one party can deposit Eth to the barter.
        </p>

        <h3> Approving Barter</h3>
        <p>
          Once both the Maker and Taker have deposited their NFT(s). The NFTs
          image, name ,token Id and symbol will be displayed for you to see. You
          can view the NFT address on etherscan
          <br />
          <b>
            Please make sure it is what you are expecting as Barterplace Meerkat
            is not responsible if you get the wrong NFT(s)
          </b>
          <br /> Once both party is happy with the NFTs. You can click on
          approve barter. Once Both party has approved the barter, the exchange
          will be made.
        </p>

        <h3> Cancelling Barter</h3>
        <p>
          If either party decides for any reason not to go ahead with the
          barter. You can click Cancel Barter. All NFTs will be returned to
          thier respective owners.
          <br />
          <b>Note:</b>NFTs will be returned even if one party has approved the
          Barter Trade. Both the maker and the taker has to approve before
          exchange can be made.
        </p>
        <br />
        <br />
        <br />
      </Container>
    </Layout>
  );
};

export default HowTo;
