
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-brand-card shadow-md">
      <div className="container mx-auto px-4 md:px-6 py-4">
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wider">
          Dashboard de Reparos
        </h1>
        <p className="text-brand-text-secondary">SLA 24 Horas</p>
      </div>
    </header>
  );
};

export default Header;
