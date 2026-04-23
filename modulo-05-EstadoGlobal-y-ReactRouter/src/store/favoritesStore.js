import { create } from "zustand";

export const useFavoritesStore = create((set, get) => ({
  //"set" para acutalizar el estado y "get" para recuperar el estado

  // Estado
  favorites: [],

  // Acciones
  addFavorite: (jobId) => {
    set((state) => ({
      favorites: state.favorites.includes(jobId)
        ? state.favorites
        : [...state.favorites, jobId],
    }));
  },

  removeFavorite: (jobId) => {
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== jobId), //filtramos los favoritos que sean diferentes al jobId, y el favorito del jobId lo va a borrar
    }));
  },

  isFavorite: (jobId) => {
    return get().favorites.includes(jobId);
  },

  toggleFavorite: (jobId) => {
    const { addFavorite, removeFavorite, isFavorite } = get();
    const isFav = isFavorite(jobId);
    isFav ? removeFavorite(jobId) : addFavorite(jobId);
  },

  countFavorites: () => get().favorites.length,
}));
