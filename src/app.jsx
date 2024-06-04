import MainMenu from "./mainMenu";
import Game from "./game";
import { useStore } from "./store";

export default () => {
  const isGameRunning = useStore((state) => state.isGameRunning);
  const gameKey = useStore((state) => state.gameKey);
  const players = useStore((state) => state.players);

  return (
    <main className="center min-h-screen bg-navy-700 p-6">
      {isGameRunning ? <Game players={players} key={gameKey} /> : <MainMenu />}
    </main>
  );
};
