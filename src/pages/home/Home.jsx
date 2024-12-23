import React from 'react'
import"./Home.scss"
import Featured from '../../components/Featured/Featured';
import TrustedBy from '../../components/trustedBy/TrustedBy';
import Slide from '../../Slide/Slide';
import { cards } from  "../../data";
import CatCard from '../../components/catCard/CatCard';

const Home = () => {

  return <div className='home'>
      <Featured/>
      <TrustedBy/>
      <Slide slidesToShow={5} arrowsScroll={2}>
        {cards.map(card=>(
          <CatCard key={card.id} item={card}/>
        ))}
        </Slide>

  </div>;
  
};

export default Home
