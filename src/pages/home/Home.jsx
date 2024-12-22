import React from 'react'
import"./home.scss"
import Featured from '../../components/Featured/Featured';
import Slide from '../../Slide/Slide';
const Home = () => {

  return <div className='home'>
      <Featured/>
      <Slide/>

  </div>;
  
};

export default Home