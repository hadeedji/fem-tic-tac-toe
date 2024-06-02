import { useImmer } from "use-immer";
import { useState } from "react";

import Cross from "../assets/icon-x.svg?react";
import CrossOutline from "../assets/icon-x-outline.svg?react";
import Oval from "../assets/icon-o.svg?react";
import OvalOutline from "../assets/icon-o-outline.svg?react";
import logo from "../assets/logo.svg";
import restart from "../assets/icon-restart.svg";

import { restartGame } from "./store";
import Modal from "./modal";

const getWinner = (grid) => {
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

  const winningCombo = combos.find(wins);

  if (winningCombo) {
    return grid[winningCombo[0]];
  }

  return "";
};

export default ({ players: _players }) => {
  const [score, updateScore] = useImmer({ X: 0, O: 0, ties: 0 });

  const [grid, updateGrid] = useImmer(Array(9).fill(""));
  const [modal, setModal] = useState(false);

  const turn = grid.filter((s) => s == "").length % 2 != 0 ? "X" : "O";
  const TurnOutline = turn == "X" ? CrossOutline : OvalOutline;
  const TurnIndicator = turn == "X" ? Cross : Oval;

  const winner = getWinner(grid);
  if (winner) {
    updateScore((score) => {
      score[winner]++;
    });

    updateGrid(() => Array(9).fill(""));
  }

  const renderSymbol = (symbol) => {
    if (symbol == "") {
      let colorClass = turn == "X" ? "text-blue-700" : "text-yellow-700";

      return (
        <TurnOutline
          className={`hidden size-16 group-hover:block ${colorClass}`}
        />
      );
    }

    let Symbol = symbol == "X" ? Cross : Oval;
    let colorClass = symbol == "X" ? "text-blue-700" : "text-yellow-700";

    return <Symbol className={`size-16 ${colorClass}`} />;
  };

  return (
    <>
      <div className="flex flex-col space-y-4">
        <header className="flex items-center justify-between px-1">
          <div className="flex-1">
            <img src={logo} alt="logo" />
          </div>
          <div className="h-14 w-36 rounded-xl bg-navy-400 px-8 py-4 inner-shadow-1-navy-900">
            <div className="flex items-center justify-between text-silver-700">
              <TurnIndicator className="size-5" />
              <p className="text-h-xs uppercase">Turn</p>
            </div>
          </div>
          <div className="flex-1">
            <button
              onClick={() => setModal(true)}
              className="ml-auto flex size-14 items-center justify-center rounded-xl bg-silver-700 inner-shadow-1-silver-900 hover:bg-silver-400"
            >
              <img src={restart} alt="restart" />
            </button>
          </div>
        </header>

        <main className="grid grid-cols-3 grid-rows-3 gap-5">
          {grid.map((symbol, index) => (
            <button
              key={index}
              disabled={symbol != ""}
              className="group flex size-36 items-center justify-center rounded-2xl bg-navy-400 inner-shadow-2-navy-900"
              onClick={() => {
                updateGrid((grid) => {
                  grid[index] = turn;
                });
              }}
            >
              {renderSymbol(symbol)}
            </button>
          ))}
        </main>

        <footer className="flex items-center justify-between text-navy-700">
          <div className="flex h-20 w-36 flex-col items-center justify-center rounded-2xl bg-blue-700">
            <p className="text-base uppercase">X ({_players.X})</p>
            <p className="text-h-m uppercase">{score.X}</p>
          </div>
          <div className="flex h-20 w-36 flex-col items-center justify-center rounded-2xl bg-silver-700">
            <p className="text-base uppercase">Ties</p>
            <p className="text-h-m uppercase">{score.ties}</p>
          </div>
          <div className="flex h-20 w-36 flex-col items-center justify-center rounded-2xl bg-yellow-700">
            <p className="text-base uppercase">O ({_players.O})</p>
            <p className="text-h-m uppercase">{score.O}</p>
          </div>
        </footer>
      </div>
      <Modal
        isOpen={modal}
        className="space-y-8"
        onClose={() => {
          setModal(false);
        }}
      >
        <h2 className="text-h-l uppercase text-silver-700">Restart game?</h2>
        <form
          className="flex items-center justify-around text-navy-700"
          method="dialog"
        >
          <button className="rounded-xl bg-silver-700 px-5 py-4 inner-shadow-1-silver-900 hover:bg-silver-400">
            <p className="text-h-xs uppercase">No, cancel</p>
          </button>
          <button
            onClick={restartGame}
            className="rounded-xl bg-yellow-700 px-5 py-4 inner-shadow-1-yellow-900 hover:bg-yellow-400"
          >
            <p className="text-h-xs uppercase">Yes, restart</p>
          </button>
        </form>
      </Modal>
    </>
  );
};
