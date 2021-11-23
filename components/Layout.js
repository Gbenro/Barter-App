import React from "react";
import { Container } from "semantic-ui-react";
import Head from "next/head";
import Header from "./Header";

const Layout = (props) => {
  return (
    <React.StrictMode>
      <Container text>
        <style>
          {`
      html, body {
    
            background:linear-gradient(-45deg,#704106,#ece6f1,#d9cde2  );
     
            background-size:400% 400%;
            postion:relative;
      }
      `}
        </style>
        <Head>
          <link
            async
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
          />
        </Head>

        <Header />
        {props.children}
      </Container>
    </React.StrictMode>
  );
};
export default Layout;
