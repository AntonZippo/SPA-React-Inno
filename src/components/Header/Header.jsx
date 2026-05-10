import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const cart = useSelector((state) => state.cart);
  const cartCount = cart.length;

  return (
    <div className="header">
      <h2>Products things company</h2>
      <Link to="/home" className="home-link">
        Home
      </Link>
      <Link to="/cart" className="cart-link">
        🛒 Cart : {cartCount}
      </Link>
      <div className="autorize">
        <Link to="/login">
          <button>Sign In</button>
        </Link>
        <Link to="/login">
          <button>Registration</button>
        </Link>
      </div>
    </div>
  );
}

export default Header;
