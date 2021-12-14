import React, { useState } from "react";
import "./homepage.css";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { Link } from "react-router-dom";

function Homepage() {
  
  return (
    <div className="home">
      <div className="home__container">
        <div className="home__logo">
          <h1>Library Management System</h1>
        </div>
        <div className="library__desc">
          <p>A Place to Share knowledge and better understand the world</p>
        </div>
        <div className="choice__auth">
          <div className="choice__row">
              <Link to="/books"><div className="Option">Manage Books</div></Link>
              <Link to="/members"><div className="Option">Manage Members</div></Link>
          </div>
          <div className="choice__row">
              <Link to="/reports"><div className="Option">View Reports</div></Link>
              <Link to="/transaction"><div className="Option">View Transactions</div></Link>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Homepage;