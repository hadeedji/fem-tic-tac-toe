import { useState } from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";

import logo from "../assets/logo.svg";
import Cross from "../assets/icon-x.svg?react";
import Oval from "../assets/icon-o.svg?react";

export default () => {
  const [playerSymbol, setPlayerSymbol] = useState("cross");

  return (
    <div className="m-6 flex w-full max-w-lg flex-col items-center space-y-10">
      <img src={logo} alt="logo" />
      <div className="inner-shadow-2-navy-900 flex w-full flex-col items-center justify-center rounded-2xl bg-navy-400 p-6">
        <h2 className="mb-6 text-h-xs uppercase text-silver-700">
          Pick player 1's mark
        </h2>
        <RadioGroup.Root
          className="mb-4 flex h-20 w-full items-center justify-between rounded-xl bg-navy-700 p-2"
          defaultValue="cross"
          value={playerSymbol}
          onValueChange={setPlayerSymbol}
          loop={false}
        >
          <RadioGroup.Item
            className="h-full w-1/2 rounded-xl hover:bg-silver-700/5 data-[state='checked']:bg-silver-700"
            value="cross"
          >
            <Cross
              width="32"
              height="32"
              className={`m-auto ${playerSymbol == "cross" ? "text-navy-700" : "text-silver-700"}`}
            />
          </RadioGroup.Item>
          <RadioGroup.Item
            className="h-full w-1/2 rounded-xl hover:bg-silver-700/5 data-[state='checked']:bg-silver-700"
            value="oval"
          >
            <Oval
              width="32"
              height="32"
              className={`m-auto ${playerSymbol == "oval" ? "text-navy-700" : "text-silver-700"}`}
            />
          </RadioGroup.Item>
        </RadioGroup.Root>
        <p className="text-base uppercase text-silver-700">
          Remember : X goes first
        </p>
      </div>
      <div className="w-full space-y-5">
        <button className="inner-shadow-2-yellow-900 flex w-full items-center justify-center rounded-2xl bg-yellow-700 p-4 hover:bg-yellow-400">
          <p className="text-h-s uppercase text-navy-700">New game (vs cpu)</p>
        </button>
        <button className="inner-shadow-2-blue-900 flex w-full items-center justify-center rounded-2xl bg-blue-700 p-4 hover:bg-blue-400">
          <p className="text-h-s uppercase text-navy-700">
            New game (vs player)
          </p>
        </button>
      </div>
    </div>
  );
};
