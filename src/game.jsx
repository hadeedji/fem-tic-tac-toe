import { useImmer } from "use-immer";
import { useState, useEffect } from "react";

import Cross from "../assets/icon-x.svg?react";
import CrossOutline from "../assets/icon-x-outline.svg?react";
import Oval from "../assets/icon-o.svg?react";
import OvalOutline from "../assets/icon-o-outline.svg?react";
import logo from "../assets/logo.svg";
import restart from "../assets/icon-restart.svg";

import { restartGame } from "./store";
import Modal from "./modal";

const getWinningCombo = (grid) => {
  const combos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const wins = (combo) => {
    const symbols = combo.map((i) => grid[i]);

    return symbols.every((symbol) => symbol == symbols[0] && symbol != "");
  };

  return combos.find(wins) || [];
};

export default ({ players }) => {
  const [score, updateScore] = useImmer({ X: 0, O: 0, ties: 0 });
  const [grid, updateGrid] = useImmer(Array(9).fill(""));

  const [restartModal, setRestartModal] = useState(false);
  const [roundModal, setRoundModal] = useState(false);

  const turn = grid.filter((s) => s == "").length % 2 != 0 ? "X" : "O";
  const TurnOutline = turn == "X" ? CrossOutline : OvalOutline;
  const TurnIndicator = turn == "X" ? Cross : Oval;

  const winningCombo = getWinningCombo(grid);
  const winner = winningCombo.length > 0 ? grid[winningCombo[0]] : null;

  const cpuTurn = players[turn] == "CPU";

  useEffect(() => {
    if (winner) {
      const timeoutId = setTimeout(() => {
        updateScore((score) => {
          score[winner]++;
        });

        updateGrid(() => Array(9).fill(""));
      }, 1000);

      return () => clearTimeout(timeoutId);
    }

    if (!grid.some((s) => s == "")) {
      const timeoutId = setTimeout(() => {
        updateScore((score) => {
          score.ties++;
        });

        updateGrid(() => Array(9).fill(""));
      }, 1000);

      return () => clearTimeout(timeoutId);
    }

    if (cpuTurn) {
      const timeoutId = setTimeout(() => {
        updateGrid((grid) => {
          const free = Array.from({ length: 9 }, (_, i) => i).filter(
            (i) => grid[i] == "",
          );

          const choice = free[Math.floor(Math.random() * free.length)];
          grid[choice] = turn;
        });
      }, 750);

      return () => clearTimeout(timeoutId);
    }
  }, [grid]);

  const renderSymbol = (symbol, index) => {
    if (symbol == "") {
      const colorClass = turn == "X" ? "text-blue-700" : "text-yellow-700";

      return (
        <TurnOutline
          className={`hidden size-16 group-enabled:group-hover:block ${colorClass}`}
        />
      );
    }

    const Symbol = symbol == "X" ? Cross : Oval;
    let colorClass = symbol == "X" ? "text-blue-700" : "text-yellow-700";

    if (winner && winningCombo.includes(index)) {
      colorClass = "text-navy-400";
    }

    return <Symbol className={`size-16 ${colorClass}`} />;
  };

  const boxBackground = (index) => {
    if (winner && winningCombo.includes(index)) {
      if (winner == "X") {
        return "bg-blue-400 inner-shadow-2-blue";
      } else {
        return "bg-yellow-400 inner-shadow-2-yellow";
      }
    }

    return "bg-navy-400 inner-shadow-2-navy";
  };

  return (
    <>
      <div className="flex flex-col space-y-4">
        <header className="flex items-center justify-between px-1">
          <div className="flex-1">
            <img src={logo} alt="logo" />
          </div>
          <div className="h-14 w-36 rounded-xl bg-navy-400 px-8 py-4 inner-shadow-1-navy">
            <div className="flex items-center justify-between text-silver-700">
              <TurnIndicator className="size-5" />
              <p className="text-h-xs uppercase">Turn</p>
            </div>
          </div>
          <div className="flex-1">
            <button
              onClick={() => setRestartModal(true)}
              className="center ml-auto size-14 rounded-xl bg-silver-700 inner-shadow-1-silver hover:bg-silver-400"
            >
              <img src={restart} alt="restart" />
            </button>
          </div>
        </header>

        <main className="grid grid-cols-3 grid-rows-3 gap-5">
          {grid.map((symbol, index) => (
            <button
              key={index}
              disabled={symbol != "" || winner || cpuTurn}
              className={`center group size-36 rounded-2xl ${boxBackground(index)}`}
              onClick={() => {
                updateGrid((grid) => {
                  grid[index] = turn;
                });
              }}
            >
              {renderSymbol(symbol, index)}
            </button>
          ))}
        </main>

        <footer className="center flex-row justify-between text-navy-700">
          <div className="center h-20 w-36 rounded-2xl bg-blue-700">
            <p className="text-base uppercase">X ({players.X})</p>
            <p className="text-h-m uppercase">{score.X}</p>
          </div>
          <div className="center h-20 w-36 rounded-2xl bg-silver-700">
            <p className="text-base uppercase">Ties</p>
            <p className="text-h-m uppercase">{score.ties}</p>
          </div>
          <div className="center h-20 w-36 rounded-2xl bg-yellow-700">
            <p className="text-base uppercase">O ({players.O})</p>
            <p className="text-h-m uppercase">{score.O}</p>
          </div>
        </footer>
      </div>
      <Modal
        isOpen={restartModal}
        className="space-y-8"
        onClose={() => {
          setRestartModal(false);
        }}
      >
        <h2 className="text-h-l uppercase text-silver-700">Restart game?</h2>
        <form
          className="center flex-row justify-around text-navy-700"
          method="dialog"
        >
          <button className="rounded-xl bg-silver-700 px-5 py-4 inner-shadow-1-silver hover:bg-silver-400">
            <p className="text-h-xs uppercase">No, cancel</p>
          </button>
          <button
            onClick={restartGame}
            className="rounded-xl bg-yellow-700 px-5 py-4 inner-shadow-1-yellow hover:bg-yellow-400"
          >
            <p className="text-h-xs uppercase">Yes, restart</p>
          </button>
        </form>
      </Modal>
    </>
  );
};
