import React from 'react';
import styles from './dashboard.module.css';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Sidenav from '../../components/sidenav/sidenav';

function Dashboard() {
  return (
    <>
      <Header />
      <section className={styles.mainSection}>
        <Sidenav />


       <div className = {styles.dashboardMain}>


       </div>
      </section>
      <Footer />
    </>
  );
}

export default Dashboard;
