import React, { useEffect, useRef, useState } from "react";
import "./Gigs.scss";
import GigCard from "../../components/gigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";
import { MessageSquare } from "lucide-react"; 

function Gigs() {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const minRef = useRef();
  const maxRef = useRef();

  const { search } = useLocation();

  // ✅ Debug: Check URL parameters
  console.log("Current Search Params:", search);

  // ✅ Build query dynamically
  const getQueryParams = () => {
    let query = `${search}`;
    if (minPrice !== "") query += `&min=${minPrice}`;
    if (maxPrice !== "") query += `&max=${maxPrice}`;
    if (sort) query += `&sort=${sort}`;
    return query;
  };
  

  // ✅ Debug: Log the query before fetching
  console.log("Final API Query:", `/gigs${getQueryParams()}`);

  // ✅ Fetch gigs with filtering
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs", sort, minPrice, maxPrice],
    queryFn: async () => {
      console.log("Fetching data from:", `/gigs${getQueryParams()}`);
      const res = await newRequest.get(`/gigs${getQueryParams()}`);
      return res.data;
    },
    enabled: true, // Ensure query runs initially
  });

  useEffect(() => {
    console.log("Re-fetching data...");
    refetch();
  }, [sort, minPrice, maxPrice]); // ✅ Runs when filters change

  // ✅ Button Click Handler
  const apply = () => {
    const min = minRef.current.value;
    const max = maxRef.current.value;
  
    // ✅ Debugging
    console.log("Applying Filters - Min:", min, "Max:", max); 
  
    // ✅ Update state so useEffect triggers re-fetch
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
            <button onClick={apply}>Apply</button> {/* ✅ Now debuggable */}
          </div>
          <div className="right">
            <span className="sortBy">Sort by</span>
            <span className="sortType">{sort === "sales" ? "Best Selling" : "Newest"}</span>
            <img src="./img/down.png" alt="Sort" onClick={() => setOpen(!open)} />
            {open && (
              <div className="rightMenu">
                <span onClick={() => setSort("createdAt")}>Newest</span>
                <span onClick={() => setSort("sales")}>Best Selling</span>
              </div>
            )}
          </div>
        </div>

        <div className="cards">
          {isLoading ? "Loading..."
            : error ? `Error: ${error.message}`
            : data.map((gig) => <GigCard key={gig._id} item={gig} />)}
        </div>
      </div>
    </div>
  );
}

export default Gigs;
