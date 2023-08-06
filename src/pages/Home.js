import React from "react";
import Layout from "../components/Layout";
import Feeds from "../components/Feeds";

const Home = () => {
  return (
    <Layout>
      <Feeds />
      <div className="h-12"></div>
    </Layout>
  );
};

export default Home;
