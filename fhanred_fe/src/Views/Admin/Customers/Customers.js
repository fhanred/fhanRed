import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { clientsLinks } from '../../../data';
import './Customers.css';
import { useDispatch } from 'react-redux';
import { getUsers } from '../../../Redux/Actions/actions';

function Customers() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  
  return (
    <div className="clients-container">
      {clientsLinks.map(({ name, icon, path }, index) => {
        return (
          <div key={index} className="client-item">
            <NavLink to={path} onClick={() => setShowMenu(!showMenu)} >
            <span >
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

export default Customers;
