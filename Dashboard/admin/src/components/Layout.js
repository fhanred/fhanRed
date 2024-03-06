// Layout.js
import React from 'react';

const Layout = ({ children }) => {
  return (
    <div>
      {/* Aquí podrías agregar un encabezado común, pie de página, etc. */}
      <div>{children}</div>
    </div>
  );
};

export default Layout;
