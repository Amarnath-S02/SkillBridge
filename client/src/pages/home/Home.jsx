import React from "react";
import "./home.scss";
import Featured from "../../components/Featured/Featured";
import TrustedBy from "../../components/trustedBy/TrustedBy";
import Slide from "../../Slide/Slide";
import { cards, projects } from "../../data";
import CatCard from "../../components/catCard/CatCard";
import ProjectCard from "../../components/projectCard2/ProjectCard";

const Home = () => {
  return (
    <div className="home">
      <Featured />
      <TrustedBy />

      {/* Top Cards Slider */}
      <Slide slidesToShow={5} arrowsScroll={3}>
        {cards.map((card) => (
          <CatCard key={card.id} item={card} />
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

      {/* Dark Features Section */}
      <div className="features dark">
        <div className="container">
          <div className="item text-box">
            <div className="text-content">
              <h1>
                SkillBridge <i> Business</i>
              </h1>
              <h1>Empower Your Team with Tailored Solutions</h1>
              <p>
                Transform the way your business collaborates and innovates with
                SkillBridge's premium business tools.
              </p>
              <div className="title">
                <img src="./img/check3.png" alt="" />
                Connect with verified experts who specialize in your industry's
                unique needs.
              </div>
              <div className="title">
                <img src="./img/check3.png" alt="" />
                Work alongside a business consultant to find the perfect
                freelancers for your projects.
              </div>
              <div className="title">
                <img src="./img/check3.png" alt="" />
                Manage projects, track progress, and communicate effectively in
                one centralized workspace.
              </div>
              <button>Explore Business</button>
            </div>
          </div>
          <div className="item">
            <img src="./img/homepage.png" alt="" />
          </div>
        </div>
      </div>

      {/* Bottom Projects Slider
      <Slide slidesToShow={4} arrowsScroll={4}>
        {projects.map((project) => (
          <ProjectCard key={project.id} item={project} />
        ))}
      </Slide> */}
    </div>
  );
};

export default Home;
