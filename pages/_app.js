import React from "react";
import Head from "next/head";
import "../styles/globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from "../components/nav";
import "../node_modules/react-image-gallery/styles/css/image-gallery.css";

const greenEach = ({ Component, cookies }) => {
  return (
    <>
     <Nav />
      <Head>
        <title>GreenEach</title>
      </Head>
      <Component />
    </>
  );
};

export default greenEach;
