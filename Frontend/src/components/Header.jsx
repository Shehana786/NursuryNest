import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from '../Context/CartContext';
import '../Styles/Global.css';

const Header = ({ user, setUser }) => {
  const { cartItems } = useCart();
  const navigate = useNavigate();
console.log(user);
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <img className="logo" src="/assests/logo.png" alt="Logo" />
      <NavLink className="nav-link" to="/" end>Home</NavLink>
      <NavLink className="nav-link" to="/Catalog">Catalog</NavLink>
      <NavLink className="nav-link" to="/caretips">Care Tips</NavLink>
      <NavLink className="nav-link" to="/carecalender">Care Calendar</NavLink>

      {user ? (
        <button className="nav-link logout-btn" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <NavLink className="nav-link" to="/login">Login</NavLink>
      )}

      <NavLink className="nav-link cart-link" to="/Cart">
        Cart
        {cartItems.length > 0 && (
          <span className="cart-badge">{cartItems.length}</span>
        )}
      </NavLink>
    </nav>
  );
};

export default Header;
