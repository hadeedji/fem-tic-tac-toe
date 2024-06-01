import * as RadioGroup from "@radix-ui/react-radio-group";

import logo from "../assets/logo.svg";
import { useState } from "react";

export default () => {
  const [playerSymbol, setPlayerSymbol] = useState("cross");

  return (
    <div className="m-5 flex w-full max-w-lg flex-col items-center space-y-10">
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
            <svg
              className="m-auto"
              width="32"
              height="32"
              viewBox="0 0 64 64"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z"
                fill={playerSymbol != "cross" ? "#A8BFC9" : "#1A2A33"}
              />
            </svg>
          </RadioGroup.Item>
          <RadioGroup.Item
            className="h-full w-1/2 rounded-xl hover:bg-silver-700/5 data-[state='checked']:bg-silver-700"
            value="oval"
          >
            <svg
              className="m-auto"
              width="32"
              height="32"
              viewBox="0 0 64 64"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z"
                fill={playerSymbol != "oval" ? "#A8BFC9" : "#1A2A33"}
              />
            </svg>
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
