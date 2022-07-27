import React from 'react'
import { Link } from "react-router-dom";
import BannerImage from "../assets/bannerimage.jpeg";
import "../styles/Home.css";

function Home() {
  return (
    <div className = "home">
        <div className="headerContainer" style={{ backgroundImage: `url(${BannerImage})` }}>
            <h1>Start making Souvenirs</h1>
            <p> Every Memory Counts!!</p>
            <Link to = "/createSouvenirs">
                <button>Start Now</button>
            </Link>
        </div>
    </div>
  )
}

export default Home