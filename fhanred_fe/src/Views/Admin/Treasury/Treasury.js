import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { tesoreriaLinks } from '../../../data';
import "./Treasury.css"

function Treasury() {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="clients-container">
      {tesoreriaLinks.map(({ name, icon, path }, index) => {
        return (
          <div key={index} className="client-item">
            <NavLink to={path} onClick={() => setShowMenu(!showMenu)}>
            <span className="icon">
                {icon}
              </span>
              <h3>{name}</h3>
            </NavLink>
          </div>
        );
      })}
    </div>
  );
}

export default Treasury
