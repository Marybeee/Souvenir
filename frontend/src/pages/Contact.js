import React from 'react';
import BannerImage from "../assets/bannerimage.jpeg";
import "../styles/Contact.css";
import { useNavigate } from "react-router-dom";
// import Grid from "@mui/icons-material"
function Contact() {

    let history = useNavigate();
  return (
    
    <div className = "Contact" >
        
        
        <div className = "leftSide" style={{ display: "flex" }} > 
            <button className = "button" style={{ marginLeft: "auto" }} >  Connect </button> 
        </div>
        <div className = "rightSide" > 
          <h1 className= "header"> Enter your address </h1>
          <form id = "form" method= "Post">
            <label htmlfor="address" >Address</label>
            <input name="address" placeholder="Enter address" type ="address" />
            
            <button type = "submit" onClick={() => {history.push("/success");}}>Send</button>
            
          </form>  
        </div>
    </div>
  )
}

export default Contact