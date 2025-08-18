import React from 'react';
import './Slide.scss';
import Slider from "infinite-react-carousel";

import { cards } from '../data';
import CatCard from '../components/catCard/CatCard';

const Slide = ({ slidesToShow, arrowsScroll, children  }) => {
  return (
    <div className='slide'>
      <div className='container'>
        
        <Slider slidesToShow={slidesToShow} arrowsScroll={arrowsScroll}>
        {children}
          {cards.map((card) => (
            <CatCard item={card} key={card.id} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Slide;


