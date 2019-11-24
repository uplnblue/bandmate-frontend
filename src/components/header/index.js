import React from 'react';
import './index.css';
import { NavLink } from 'react-router-dom';


function Header() {
  return (
    <header className="Header">
      <nav className="navbar navbar-light bg-light">
        <NavLink to="/about" className="navbar-brand">BandMate</NavLink>
        <NavLink to="/listen" className="navbar-brand">Listen</NavLink>
        <NavLink to="/analytics" className="navbar-brand">Analytics</NavLink>
      </nav>
    </header>
  );
}

export default Header;
