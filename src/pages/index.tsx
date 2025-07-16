import Head from "next/head";
import React from "react";
import { Layout } from 'components'

const Home: React.FC = () => {
    return (
      <div>
        <Head>
          <title>NX</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        
        <Layout />
      </div>
  );

}

export default Home;
