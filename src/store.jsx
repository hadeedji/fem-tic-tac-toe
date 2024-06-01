import { create } from "zustand";

export const useStore = create((set) => ({
  playerOneSymbol: "cross",
}));

export const setPlayerOneSymbol = (playerOneSymbol) =>
  useStore.setState(() => ({ playerOneSymbol }));
