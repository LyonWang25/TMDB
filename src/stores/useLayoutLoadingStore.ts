import { create } from 'zustand';

interface LayoutLoadingState {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useLayoutLoadingStore = create<LayoutLoadingState>((set) => ({
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
}));
