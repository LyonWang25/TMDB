import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MovieSummary } from '../api/types';

interface WatchlistStore {
  watchlist: MovieSummary[];
  favorites: MovieSummary[];
  addToWatchlist: (movie: MovieSummary) => void;
  removeFromWatchlist: (id: number) => void;
  toggleFavorite: (movie: MovieSummary) => void;
  isFavorite: (id: number) => boolean;
  isInWatchlist: (id: number) => boolean;
}

export const useWatchlistStore = create<WatchlistStore>()(
  persist(
    (set, get) => ({
      watchlist: [],
      favorites: [],
      
      addToWatchlist: (movie) => {
        if (!get().watchlist.find((m) => m.id === movie.id)) {
          set((state) => ({
            watchlist: [...state.watchlist, movie],
          }));
        }
      },

      removeFromWatchlist: (id) => {
        set((state) => ({
          watchlist: state.watchlist.filter((m) => m.id !== id),
        }));
      },

      toggleFavorite: (movie) => {
        const exists = get().favorites.find((m) => m.id === movie.id);
        if (exists) {
          set((state) => ({
            favorites: state.favorites.filter((m) => m.id !== movie.id),
          }));
        } else {
          set((state) => ({
            favorites: [...state.favorites, movie],
          }));
        }
      },

      isFavorite: (id) => get().favorites.some((m) => m.id === id),
      isInWatchlist: (id) => get().watchlist.some((m) => m.id === id),
    }),
    {
      name: "watchlist-storage",
    }
  )
);
