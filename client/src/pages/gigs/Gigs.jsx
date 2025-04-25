import React, { useRef, useState } from "react";
import "./Gigs.scss";
import GigCard from "../../components/gigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";
import Skeleton from "react-loading-skeleton"; // Import Skeleton component
import "react-loading-skeleton/dist/skeleton.css"; // Import skeleton styles

function Gigs() {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const minRef = useRef();
  const maxRef = useRef();

  const { search } = useLocation();

  // Build query string with filters
  const getQueryParams = () => {
    const params = new URLSearchParams(search);

    if (minPrice !== "") params.set("min", minPrice);
    if (maxPrice !== "") params.set("max", maxPrice);
    if (sort) params.set("sort", sort);

    return `?${params.toString()}`;
  };

  // Determine if filters or sort are applied
  const isFilterOrSortApplied = () => {
    return minPrice !== "" || maxPrice !== "" || sort !== "sales";
  };

  // Fetch gigs with React Query
  const { isLoading, error, data } = useQuery({
    queryKey: ["gigs", sort, minPrice, maxPrice, search],
    queryFn: async () => {
      const finalQuery = getQueryParams();
      const endpoint = `/gigs/getSortedGigs${finalQuery}`;
      console.log("🔍 Fetching gigs from:", endpoint);
      const res = await newRequest.get(endpoint);
      return res.data;
    },
  });

  const apply = () => {
    const min = minRef.current.value;
    const max = maxRef.current.value;
    setMinPrice(min);
    setMaxPrice(max);
  };

  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">SkillBridge {">"} </span>
        <h1>Explore Services</h1>

        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input ref={minRef} type="number" placeholder="Min" />
            <input ref={maxRef} type="number" placeholder="Max" />
            <button onClick={apply}>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">Sort by</span>
            <span className="sortType">
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img
              src="./img/down.png"
              alt="Sort"
              onClick={() => setOpen(!open)}
            />
            {open && (
              <div className="rightMenu">
                <span onClick={() => setSort("createdAt")}>Newest</span>
                <span onClick={() => setSort("sales")}>Best Selling</span>
              </div>
            )}
          </div>
        </div>

        <div className="cards">
          {isLoading
            ? (
              <>
                {/* Skeleton loader for the cards */}
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="gig-card">
                    <Skeleton height={200} width={300} />
                    <Skeleton width={200} />
                    <Skeleton width={150} />
                  </div>
                ))}
              </>
            )
            : error
            ? `Error: ${error.message}`
            : data.map((gig) => <GigCard key={gig._id} item={gig} />)}
        </div>
      </div>
    </div>
  );
}

export default Gigs;
