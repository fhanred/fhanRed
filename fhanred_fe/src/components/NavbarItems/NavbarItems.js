import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { links } from '../../data';
import './NavbarItems.css';

function NavbarItems() {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="NavbarItems">
      <div>
        <ul>
          {links.map(({ name, icon, path }, index) => {
            return (
              <li key={index}>
                <NavLink to={path} onClick={() => setShowMenu(!showMenu)}>
                  {icon}
                  <h3>{name}</h3>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default NavbarItems;
