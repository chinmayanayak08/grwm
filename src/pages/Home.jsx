import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main style={{padding: '1rem'}}>
        <h2>Home</h2>
        <p>Welcome to the Get Ready With Me starter page.</p>
      </main>
      <Footer />
    </>
  );
}
