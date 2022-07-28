import React from 'react'
import { Link } from "react-router-dom";
import BannerImage from "../assets/bannerimage.jpeg";
import "../styles/Home.css";
import CreateSouvenirs from './CreateSouvenirs';

function Home() {
  return (
    <div className = "home" style={{ backgroundImage: `url(${BannerImage})` }}>
        <div className="headerContainer" >
            <h1>Start making Souvenirs</h1>
            <p> Every Memory Counts!!</p>
            <Link to = "/CreateSouvenirs"> 
                <button>Start Now</button>
            </Link>
        </div>
    </div>
  )
}

export default Home