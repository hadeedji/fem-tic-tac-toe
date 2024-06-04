import * as RadioGroup from "@radix-ui/react-radio-group";
import { useState } from "react";

import logo from "../assets/logo.svg";
import Cross from "../assets/icon-x.svg?react";
import Oval from "../assets/icon-o.svg?react";

import { setIsGameRunning, updatePlayers } from "./store";

export default () => {
  const [playerOneSymbol, setPlayerOneSymbol] = useState("X");
  const playerTwoSymbol = playerOneSymbol == "X" ? "O" : "X";

  const startGame = (playerTwo) => {
    updatePlayers({
      [playerOneSymbol]: "P1",
      [playerTwoSymbol]: playerTwo,
    });

    setIsGameRunning(true);
  };

  return (
    <div className="center w-full max-w-lg space-y-10">
      <img src={logo} alt="logo" />
      <div className="center w-full rounded-2xl bg-navy-400 p-6 inner-shadow-2-navy">
        <h2 className="mb-6 text-h-xs uppercase text-silver-700">
          Pick player 1's mark
        </h2>
        <RadioGroup.Root
          className="mb-4 flex h-20 w-full items-center justify-between rounded-xl bg-navy-700 p-2"
          value={playerOneSymbol}
          onValueChange={setPlayerOneSymbol}
          loop={false}
        >
          {[
            ["X", Cross],
            ["O", Oval],
          ].map(([value, Symbol]) => (
            <RadioGroup.Item
              className="group h-full w-1/2 rounded-xl hover:bg-silver-700/5 data-[state='checked']:bg-silver-700"
              key={value}
              value={value}
            >
              <Symbol
                width="32"
                height="32"
                className="m-auto text-silver-700 group-data-[state='checked']:text-navy-700"
              />
            </RadioGroup.Item>
          ))}
        </RadioGroup.Root>
        <p className="text-base uppercase text-silver-700">
          Remember : X goes first
        </p>
      </div>
      <div className="w-full space-y-5">
        <button
          onClick={() => startGame("CPU")}
          className="center w-full rounded-2xl bg-yellow-700 p-4 inner-shadow-2-yellow hover:bg-yellow-400"
        >
          <p className="text-h-s uppercase text-navy-700">New game (vs cpu)</p>
        </button>
        <button
          onClick={() => startGame("P2")}
          className="center w-full rounded-2xl bg-blue-700 p-4 inner-shadow-2-blue hover:bg-blue-400"
        >
          <p className="text-h-s uppercase text-navy-700">
            New game (vs player)
          </p>
        </button>
      </div>
    </div>
  );
};
