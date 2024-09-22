import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <div className="gpt3__navbar">
      <div className="gpt3__navbar-links">
        <div className="gpt3__navbar-links_logo">
          <Link to="/">OTP Connect</Link>
        </div>
      </div>

      <div className="gpt3__navbar-sign">
        <button type="button" className="navbar_my_nft_button_add">
          <Link to="/">Contact List</Link>
        </button>
        <button type="button" className="navbar_my_nft_button_add">
          <Link to="/messages">Send Messages</Link>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
