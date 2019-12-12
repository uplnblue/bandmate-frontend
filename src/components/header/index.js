import React from 'react';
import './index.css';
import { NavLink } from 'react-router-dom';


function Header() {
  return (
    <header className="Header">
      <nav className="navbar navbar-light bg-light">
        <NavLink to="/listen" className="navbar-brand">BandMate</NavLink>
      </nav>
    </header>
  );
}

export default Header;
