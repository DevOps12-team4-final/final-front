import React from 'react';
import Header from './frame/Header';
import Footer from './frame/Footer';
import '../scss/Feed.scss';

function Feed() {
  return (
    <div className='feed_container'>
        <Header />

        <Footer />
    </div>
  )
}

export default Feed