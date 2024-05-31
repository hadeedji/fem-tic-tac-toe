import * as RadioGroup from "@radix-ui/react-radio-group";

import logo from "../assets/logo.svg";
import { useState } from "react";

export default () => {
  const [playerSymbol, setPlayerSymbol] = useState("cross");

  return (
    <div className="flex w-[460px] flex-col items-center space-y-[40px]">
      <img src={logo} alt="logo" />
      <div className="bg-navy-400 flex w-full flex-col items-center justify-center space-y-[24px] rounded-[15px] p-[24px] drop-shadow-[0_8px_0_#10212A]">
        <h2 className="text-silver-700 text-h-xs uppercase">
          Pick player 1's mark
        </h2>
        <div className="flex w-full flex-col items-center justify-center space-y-[17px]">
          <RadioGroup.Root
            className="bg-navy-700 flex h-[72px] w-full items-center justify-between rounded-[10px] p-[8px]"
            defaultValue="cross"
            value={playerSymbol}
            onValueChange={setPlayerSymbol}
          >
            <RadioGroup.Item
              className="data-[state='checked']:bg-silver-700 hover:bg-silver-700/5 flex h-full w-1/2 items-center justify-center rounded-[10px]"
              value="cross"
            >
              <svg
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
              className="data-[state='checked']:bg-silver-700 hover:bg-silver-700/5 flex h-full w-1/2 items-center justify-center rounded-[10px]"
              value="oval"
            >
              <svg
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
          <p className="text-silver-700 text-base uppercase">
            Remember : X goes first
          </p>
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-between space-y-[20px]">
        <button className="flex w-full items-center justify-center rounded-[15px] bg-yellow-700 p-[17px] drop-shadow-[0_8px_0_#CC8B13] hover:bg-yellow-400">
          <p className="text-h-s text-navy-700 uppercase">New game (vs cpu)</p>
        </button>
        <button className="flex w-full items-center justify-center rounded-[15px] bg-blue-700 p-[17px] drop-shadow-[0_8px_0_#118C87] hover:bg-blue-400">
          <p className="text-h-s text-navy-700 uppercase">
            New game (vs player)
          </p>
        </button>
      </div>
    </div>
  );
};
