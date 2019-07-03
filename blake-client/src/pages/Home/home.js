import React from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

function Home(props) {

    console.log('from home: ', props.match)
  return(
    <>
    <Header />

    <h1>Homeeeee</h1>

    <Footer />
    </>
  )
}

export default Home;
