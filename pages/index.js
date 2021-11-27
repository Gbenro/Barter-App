import React, { Component } from "react";
import { Card, Button, Icon } from "semantic-ui-react";
import factory from "../ethereum/factory";
import Layout from "../components/Layout";
import BarterOptions from "../components/BarterOptions";
import { Link } from "../routes";

class BarterIndex extends Component {
  static async getInitialProps() {
    const barters = await factory.methods.getAllDeployedBarterTrades().call();
    return { barters };
  }

  renderBarters() {
    const items = [...this.props.barters]
      .reverse()
      //.slice(Math.max(this.props.barters.length - 10, 0))
      .map((address) => {
        return {
          header: address,
          description: (
            <Link
              route={`/view/${address}`}
              // href={`/view/${address}`}
              // as={`/view/${address}`}
            >
              <a>
                <Button animated color="purple">
                  <Button.Content visible color="purple">
                    View Barter
                  </Button.Content>
                  <Button.Content hidden>
                    <Icon name="handshake" />
                  </Button.Content>
                </Button>
              </a>
            </Link>
          ),
          fluid: true,
          color: "purple",
          style: { overflowWrap: "break-word" },
        };
      });
    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <div>
          <BarterOptions />

          <h3>Recent Barters</h3>

          {this.renderBarters()}
        </div>
      </Layout>
    );
  }
}

export default BarterIndex;
