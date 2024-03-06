// Dashboard.js
import React from 'react';

const Dashboard = ({ children }) => {
  return (
    <div>
      {/* Aquí puedes agregar un menú de navegación, barra lateral, etc. */}
      <div>{children}</div>
    </div>
  );
};

export default Dashboard;
