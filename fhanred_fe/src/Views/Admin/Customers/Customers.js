import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { clientsLinks } from '../../../data';
import './Customers.css';

function Customers() {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="clients-container">
      {clientsLinks.map(({ name, icon, path }, index) => {
        return (
          <div key={index} className="client-item">
            <NavLink to={path} onClick={() => setShowMenu(!showMenu)}>
              {icon}
              <h3>{name}</h3>
            </NavLink>
          </div>
        );
      })}
    </div>
  );
}

export default Customers;
