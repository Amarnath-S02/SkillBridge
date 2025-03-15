import React from "react";
import "./Blog.scss";

const blogs = [
  {
    id: 1,
    category: "FREELANCING",
    title: "How to Land Your First Client on SkillBridge",
    description: "Learn strategies to attract your first client and build trust.",
    image: "./img/blog1.jpg",
  },
  {
    id: 2,
    category: "REMOTE WORK",
    title: "Top 5 Tools Every Freelancer Should Use",
    description: "Boost productivity with these must-have tools for freelancers.",
    image: "./img/blog2.jpg",
  },
  {
    id: 3,
    category: "CAREER GROWTH",
    title: "How to Price Your Services on SkillBridge",
    description: "Find the perfect balance between affordability and profitability.",
    image: "./img/blog3.jpg",
  },
  {
    id: 4,
    category: "DESIGN & DEVELOPMENT",
    title: "Why a Strong Portfolio Matters in Freelancing",
    description: "Showcasing your best work can help you land high-paying projects.",
    image: "./img/blog4.jpg",
  },
  {
    id: 5,
    category: "FREELANCE SUCCESS",
    title: "How to Maintain Work-Life Balance as a Freelancer",
    description: "Manage your time effectively while working remotely.",
    image: "./img/blog5.jpg",
  },
  {
    id: 6,
    category: "MARKETING",
    title: "The Power of Personal Branding for Freelancers",
    description: "Build a strong online presence to attract more clients.",
    image: "./img/blog6.jpg",
  },
];

function Blog() {
  return (
    <div className="blog">
      <div className="blog-container">
        {blogs.map((blog) => (
          <div className="blog-card" key={blog.id}>
            <img src={blog.image} alt={blog.title} className="blog-image" />
            <p className="blog-category">{blog.category}</p>
            <h3 className="blog-title">{blog.title}</h3>
            <p className="blog-description">{blog.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blog;
