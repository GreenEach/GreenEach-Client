import React from 'react';
import Head from 'next/head'


import '../styles/globals.css'

const greenEach = ({ Component }) => {
  return (
    <>
      <Head>
          <title>GreenEach</title>
      </Head>
      <Component/>
    </>
  );
};

export default greenEach;
