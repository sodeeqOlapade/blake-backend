import React from 'react';
import Header from '../../components/header/header';

function Home(props) {

    console.log('from home: ', props.match)
  return(
    <>
    <Header />

    <h1>Homeeeee</h1>
    </>
  )
}

export default Home;
