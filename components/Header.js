import React, { useEffect, useState } from "react";
import { Button, Menu } from "semantic-ui-react";
import { Link } from "../routes";

const Header = () => {
  const initailInfo = {
    text: "connect",
    connected: false,
  };

  const [info, setInfo] = useState(initailInfo);

  const init = async () => {
    if (window.ethereum?.isMetaMask) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const networkId = await window.ethereum.request({
        method: "net_version",
      });
      if (networkId == 4) {
        setInfo({
          connected: true,

          text: accounts[0],
        });
      } else {
        setInfo({
          ...initailInfo,
          text: "Connect Rinkeby Test Network",
        });
      }
    } else {
      setInfo({
        ...initailInfo,
        text: "Please Install metamask",
      });
    }
  };

  useEffect(() => {
    init();
    initOnChange();
  }, []);

  const truncate = (str) => {
    const len = str.length;
    return len > 10
      ? str.substring(0, 4) + "..." + str.substring(len - 4, len)
      : str;
  };

  const initOnChange = () => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
      window.ethereum.on("ChainChanged", () => {
        window.location.reload();
      });
    }
  };

  return (
    <Menu style={{ marginTop: "10px" }}>
      <Link route="/">
        <a className="item">Home</a>
      </Link>
      <Link route="/howto">
        <a className="item">How To Use</a>
      </Link>
      <Link route="/">
        <a
          href="https://youthful-pike-dfc3f5.netlify.app/"
          className="item"
          target="_blank"
          rel="noreferrer noopener"
        >
          Mint
        </a>
      </Link>

      <Menu.Menu position="right">
        <Menu.Item>
          <Button color="purple" onClick={init}>
            {info.connected ? truncate(info.text) : info.text}
          </Button>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default Header;
