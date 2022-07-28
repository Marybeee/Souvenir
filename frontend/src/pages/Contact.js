import React from 'react';
import BannerImage from "../assets/bannerimage.jpeg";
import "../styles/Contact.css";
function Contact() {
  return (
    <div className = "Contact" >
        <div className = "leftSide" style={{ backgroundImage: `url(${BannerImage})`}} > </div>
        <div className = "rightSide"> 
          <h1> Enter your address </h1>
          <form id = "contact-form" method= "Post">
            <label htmlfor="name" >Name</label>
            <input name="name" placeholder="Enter address" type ="text" />
            <label htmlfor="email" >Address</label>
            <input name="email" placeholder="Enter address" type ="email" />
            
            <button type = "submit">Send</button>
          </form>  
        </div>
    </div>
  )
}

export default Contact