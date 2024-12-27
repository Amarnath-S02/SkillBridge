import React from 'react';
import"./home.scss"
import Featured from '../../components/Featured/Featured';
import TrustedBy from '../../components/trustedBy/TrustedBy';
import Slide from '../../Slide/Slide';
import { cards } from  "../../data";
import { projects } from "../../data";

import CatCard from '../../components/catCard/CatCard';
import ProjectCard from '../../components/projectCard2/ProjectCard';

const Home = () => {

  return <div className='home'>
      <Featured/>
      <TrustedBy/>
      <Slide slidesToShow={5} arrowsScroll={3}>
        {cards.map(card=>(
          <CatCard key={card.id} item={card}/>
        ))}
        </Slide>
        <div className="features">
          <div className="container">
            <div className="item">
            <h1>A whole world of freelance at your fingertips</h1>
            <div className="title">
              <img src="./img/check2.png" alt="" />
              The best for every budget
            </div>
            <p>
              Find high-quality services at every price point. No hourly rates,
              just project-based pricing.
            </p>
            <div className="title">
              <img src="./img/check2.png" alt="" />
              Quality work done quickly
            </div>
            <p>
              Find the right freelancer to begin working on your project within
              minutes.
            </p>
            <div className="title">
              <img src="./img/check2.png" alt="" />
              Protected payments, every time
            </div>
            <p>
              Always know what you'll pay upfront. Your payment isn't released
              until you approve the work.
            </p>
            <div className="title">
              <img src="./img/check2.png" alt="" />
              24/7 support
            </div>
            <p>
              Find high-quality services at every price point. No hourly rates,
              just project-based pricing.
            </p>
          </div>
          <div className="item">
            <video src="./img/video.mp4" controls />
          </div>
        </div>
      </div>
      <div className="features dark">
  <div className="container">
    <div className="item">
      <h1>
        SkillBridge <i> Business</i>
      </h1>
      <h1>
        A business solution designed for <i> teams</i>
      </h1>
      <p>
        Enhance your workflow with a personalized set of tools and perks designed for businesses
      </p>
      <div className="title">
        <img src="./img/check3.png" alt="" />
        Connect with freelancers who have a proven track record in business
      </div>

      <div className="title">
        <img src="./img/check3.png" alt="" />
        Receive expert recommendations for the best talent from a customer success manager
      </div>

      <div className="title">
        <img src="./img/check3.png" alt="" />
        Streamline collaboration and maximize efficiency within a single unified workspace
      </div>
      <button>Explore Business</button>
    </div>
    <div className="item">
      <img
        src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_2.0/v1/attachments/generic_asset/asset/d9c17ceebda44764b591a8074a898e63-1599597624768/business-desktop-870-x2.png"
        alt=""
      />
    </div>
  </div>
</div>
<Slide slidesToShow={4} arrowsScroll={4}>
        {projects.map(card=>(
          <ProjectCard key={card.id} item={card}/>
        ))}
        </Slide>


  </div>;
  
};

export default Home
