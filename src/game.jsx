import { useImmer } from "use-immer";
import { useState, useEffect } from "react";

import Cross from "../assets/icon-x.svg?react";
import CrossOutline from "../assets/icon-x-outline.svg?react";
import Oval from "../assets/icon-o.svg?react";
import OvalOutline from "../assets/icon-o-outline.svg?react";
import logo from "../assets/logo.svg";
import restart from "../assets/icon-restart.svg";

import { restartGame, setIsGameRunning } from "./store";
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

const GridButton = ({ onClick, symbol, turn, disabled, won }) => {
  const Symbol = symbol == "X" ? Cross : Oval;
  let symbolColor = symbol == "X" ? "text-blue-700" : "text-yellow-700";

  const SymbolOutline = turn == "X" ? CrossOutline : OvalOutline;
  let outlineColor = turn == "X" ? "text-blue-700" : "text-yellow-700";

  let background = "bg-navy-400 inner-shadow-2-navy";

  if (won) {
    symbolColor = "text-navy-400";
    background =
      symbol == "X"
        ? "bg-blue-400 inner-shadow-2-blue"
        : "bg-yellow-400 inner-shadow-2-yellow";
  }

  return (
    <button
      onClick={onClick}
      className={`center group size-24 rounded-2xl sm:size-36 ${background}`}
      disabled={symbol != "" || disabled}
    >
      {symbol == "" ? (
        <SymbolOutline
          className={`hidden size-16 sm:group-enabled:group-hover:block ${outlineColor}`}
        />
      ) : (
        <Symbol className={`size-10 sm:size-16 ${symbolColor}`} />
      )}
    </button>
  );
};

export default ({ players }) => {
  const initialScore = {
    X: {
      value: 0,
      display: `X (${players.X})`,
      bg: "bg-blue-700",
    },
    ties: {
      value: 0,
      display: "ties",
      bg: "bg-silver-700",
    },
    O: {
      value: 0,
      display: `O (${players.O})`,
      bg: "bg-yellow-700",
    },
  };

  const [grid, updateGrid] = useImmer(Array(9).fill(""));
  const [scores, updateScores] = useImmer(initialScore);

  const [restartModal, setRestartModal] = useState(false);
  const [roundModal, setRoundModal] = useState(false);

  const turn = grid.filter((s) => s == "").length % 2 != 0 ? "X" : "O";
  const cpuTurn = players[turn] == "CPU";
  const TurnIndicator = turn == "X" ? Cross : Oval;

  const winningCombo = getWinningCombo(grid);
  const winner = winningCombo.length > 0 ? grid[winningCombo[0]] : null;

  const gridFull = !grid.some((s) => s == "");
  const roundOver = gridFull || winner;
  const tied = gridFull && !winner;

  useEffect(() => {
    if (roundOver) {
      const timeoutId = setTimeout(() => {
        setRoundModal(true);
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

  const nextRound = () => {
    updateScores((score) => {
      if (winner) {
        score[winner].value++;
      } else {
        score.ties.value++;
      }
    });

    updateGrid(() => Array(9).fill(""));
  };

  return (
    <>
      <div className="flex flex-col space-y-4">
        <header className="flex items-center justify-between px-1">
          <div className="flex-1">
            <img src={logo} alt="logo" />
          </div>
          <div className="center h-14 w-24 flex-row rounded-xl bg-navy-400 px-4 py-2 inner-shadow-1-navy sm:w-36 sm:px-8 sm:py-4">
            <div className="flex w-full items-center justify-between text-silver-700">
              <TurnIndicator className="size-4 sm:size-5" />
              <p className="text-base uppercase sm:text-h-xs">Turn</p>
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
            <GridButton
              symbol={symbol}
              disabled={cpuTurn || winner}
              won={winner && winningCombo.includes(index)}
              turn={turn}
              onClick={() =>
                updateGrid((grid) => {
                  grid[index] = turn;
                })
              }
            />
          ))}
        </main>

        <footer className="center flex-row justify-between text-navy-700">
          {Object.values(scores).map((score) => (
            <div
              className={`center h-16 w-24 rounded-2xl sm:h-20 sm:w-36 ${score.bg}`}
            >
              <p className="text-base uppercase">{score.display}</p>
              <p className="text-h-m uppercase">{score.value}</p>
            </div>
          ))}
        </footer>
      </div>
      <Modal
        isOpen={restartModal}
        className="space-y-8"
        onClose={() => setRestartModal(false)}
      >
        <h2 className="text-center text-h-m uppercase text-silver-700 sm:text-h-l">
          Restart game?
        </h2>
        <form
          className="center flex-row space-x-4 text-navy-700"
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
      <Modal
        className="center"
        isOpen={roundModal}
        onClose={() => setRoundModal(false)}
      >
        {(() => {
          if (tied) {
            return (
              <h2 className="text-center text-h-m uppercase text-silver-700 sm:text-h-l">
                Round tied
              </h2>
            );
          }

          const HeadingSymbol = winner == "X" ? Cross : Oval;
          const headingColor =
            winner == "X" ? "text-blue-700" : "text-yellow-700";

          return (
            <>
              <p className="text-center text-base text-silver-700 sm:text-h-xs">
                {players[winner]} wins!
              </p>
              <div
                className={`mt-4 flex items-center space-x-2 sm:space-x-6 ${headingColor}`}
              >
                <HeadingSymbol className="sm:size-18 size-[28px]" />
                <h2 className="text-center text-h-m uppercase sm:text-h-l">
                  Takes the round
                </h2>
              </div>
            </>
          );
        })()}
        <form
          className="center mt-6 flex-row space-x-4 text-navy-700"
          method="dialog"
        >
          <button
            onClick={() => setIsGameRunning(false)}
            className="rounded-xl bg-silver-700 px-5 py-4 inner-shadow-1-silver hover:bg-silver-400"
          >
            <p className="text-h-xs uppercase">Quit</p>
          </button>
          <button
            onClick={nextRound}
            className="rounded-xl bg-yellow-700 px-5 py-4 inner-shadow-1-yellow hover:bg-yellow-400"
          >
            <p className="text-h-xs uppercase">Next round</p>
          </button>
        </form>
      </Modal>
    </>
  );
};
