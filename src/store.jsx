import { produce } from "immer";
import { create } from "zustand";

export const useStore = create((set) => ({
  isGameRunning: false,
  gameKey: 0,
  players: {
    X: "",
    O: "",
  },
}));

export const setIsGameRunning = (isGameRunning) =>
  useStore.setState(() => ({ isGameRunning }));

export const updatePlayers = (players) =>
  useStore.setState(() => ({ players }));

export const restartGame = () =>
  useStore.setState(({ gameKey }) => ({
    gameKey: 1 - gameKey,
  }));
