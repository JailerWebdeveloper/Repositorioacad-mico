// En un archivo separado (por ejemplo, FiltroContext.js)
import React, { createContext, useState, useContext } from 'react';

const FiltroContext = createContext();

const FiltroProvider = ({ children }) => {
  const [filtro, setFiltro] = useState('');
  const [filtroType, setFiltroType] = useState("Titulo"); // Puedes establecer el valor predeterminado según tus necesidades
  const [filtrofecha, setFiltrofecha] = useState(""); // Puedes establecer el valor predeterminado según tus necesidades

  return (
    <FiltroContext.Provider value={{ filtro, setFiltro , setFiltroType , filtroType ,filtrofecha, setFiltrofecha }}>
      {children}
    </FiltroContext.Provider>
  );
};

const useFiltro = () => {
  const context = useContext(FiltroContext);
  if (!context) {
    throw new Error('useFiltro debe usarse dentro de FiltroProvider');
  }
  return context;
};

export { FiltroProvider, useFiltro };
