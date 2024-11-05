import create from 'zustand';

export const usePlanets = create((set) => ({
  planets: [],
  removePlanet: () => {
    set((state) => ({
      ...state,
      planets: [],
    }));
  },
  setPlanets: (planet) => {
    set((state) => ({
      planets: [...state.planets, planet],
    }));
  },
}));
