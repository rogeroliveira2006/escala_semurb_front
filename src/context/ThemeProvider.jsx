import React, { createContext, useContext, useEffect, useState } from 'react';

const ContextoProvedorTema = createContext({
  tema: 'light',
  setTema: () => null,
});

export function ThemeProvider({ children, temaPadrao = 'light', chaveArmazenamento = 'vite-ui-theme' }) {
  const [tema, setTema] = useState(() => localStorage.getItem(chaveArmazenamento) || temaPadrao);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (tema === 'system') {
      const temaSistema = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(temaSistema);
    } else {
      root.classList.add(tema);
    }
  }, [tema]);

  const valor = {
    tema,
    setTema: (novoTema) => {
      localStorage.setItem(chaveArmazenamento, novoTema);
      setTema(novoTema);
    },
  };

  return (
    <ContextoProvedorTema.Provider value={valor}>
      {children}
    </ContextoProvedorTema.Provider>
  );
}

export const useTheme = () => {
  const contexto = useContext(ContextoProvedorTema);
  if (contexto === undefined) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }
  return contexto;
};