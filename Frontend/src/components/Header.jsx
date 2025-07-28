import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import "../Styles/Global.css";

const Header = ({ user, setUser }) => {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <img className="logo" src="/assests/logo.png" alt="Logo" />
      <div className="nav-links">
        <NavLink className="nav-link" to="/" end>
          Home
        </NavLink>
        <NavLink className="nav-link" to="/catalog">
          Catalog
        </NavLink>
        <NavLink className="nav-link" to="/caretips">
          Care Tips
        </NavLink>
        <NavLink className="nav-link" to="/carecalendar">
          Care Calendar
        </NavLink>
      </div>

      <div className="nav-actions">
        {user ? (
          <button className="nav-link logout-btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>
        )}

        <NavLink className="nav-link cart-link" to="/cart">
          Cart
          {cartItems.length > 0 && <span className="cart-badge">{cartItems.length}</span>}
        </NavLink>
      </div>
    </nav>
  );
};

export default Header;
