
import { createContext, useContext, useState } from 'react';

const FavoritContext = createContext(null);

export function FavoritProvider({ children }) {
  const [favorit, setFavorit] = useState([]);

  const isFavorit = (id) =>
    favorit.some((p) => p.id === id);

  const toggleFavorit = (produk) => {
    setFavorit((prev) =>
      prev.some((p) => p.id === produk.id)
        ? prev.filter((p) => p.id !== produk.id)
        : [...prev, produk]
    );
  };

  const value = {
    favorit,
    isFavorit,
    toggleFavorit,
  };

  return (
    <FavoritContext.Provider value={value}>
      {children}
    </FavoritContext.Provider>
  );
}

export function useFavorit() {
  return useContext(FavoritContext);
}
