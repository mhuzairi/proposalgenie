import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <nav className="navbar" aria-label="Main Navigation">
      <ul className="navbar__list">
        <li className="navbar__item">
          <Link className="navbar__link" to="/">Home</Link>
        </li>
        <li className="navbar__item">
          <Link className="navbar__link" to="/proposals">Proposals</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar; 