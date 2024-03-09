import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';
import './NavbarItems.css';

function NavbarItems({ links }) {
  const [showMenu, setShowMenu] = useState(false);

  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="NavbarItems">
      <div className="menu-toggle" onClick={handleToggleMenu}>
        {/* Icono o texto para el botón del menú */}
        {showMenu ? <IoIosArrowBack className="closed-toggle" /> : <FaBars />}
      </div>
      {/* Renderizado condicional del menú desplegable */}
      {showMenu && (
        <div>
          <ul>
            {links.map(({ name, icon, path }, index) => (
              <li key={index}>
                <NavLink to={path} onClick={() => setShowMenu(false)}>
                  {icon}
                  <h3>{name}</h3>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default NavbarItems;
