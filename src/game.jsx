import logo from "../assets/logo.svg";
import restart from "../assets/icon-restart.svg";

import Cross from "../assets/icon-x.svg?react";
import Oval from "../assets/icon-o.svg?react";
import CrossOutline from "../assets/icon-x-outline.svg?react";
import OvalOutline from "../assets/icon-o-outline.svg?react";

export default () => {
  const grid = ["", "X", "O", "X", "O", "X", "", "O", "X"];

  const renderSymbol = (symbol) => {
    let Component;
    let colorClass;

    if (symbol == "X") {
      Component = Cross;
      colorClass = "text-blue-700";
    } else if (symbol == "O") {
      Component = Oval;
      colorClass = "text-yellow-700";
    } else {
      return (
        <CrossOutline
          className={`hidden size-16 text-blue-700 group-hover:block`}
        />
      );
    }

    return <Component className={`size-16 ${colorClass}`} />;
  };

  return (
    <div className="flex flex-col space-y-4">
      <header className="flex items-center justify-between px-1">
        <div className="flex-1">
          <img src={logo} alt="logo" />
        </div>
        <div className="h-14 w-36 rounded-xl bg-navy-400 px-8 py-4 inner-shadow-1-navy-900">
          <div className="flex items-center justify-between text-silver-700">
            <Cross className="size-5" />
            <p className="text-h-xs uppercase">Turn</p>
          </div>
        </div>
        <div className="flex-1">
          <button className="ml-auto flex size-14 items-center justify-center rounded-xl bg-silver-700 inner-shadow-1-silver-900 hover:bg-silver-400">
            <img src={restart} alt="restart" />
          </button>
        </div>
      </header>

      <main className="grid grid-cols-3 grid-rows-3 gap-5">
        {grid.map((symbol) => (
          <button
            disabled={symbol != ""}
            className="group flex size-36 items-center justify-center rounded-2xl bg-navy-400 inner-shadow-2-navy-900"
          >
            {renderSymbol(symbol)}
          </button>
        ))}
      </main>

      <footer className="flex items-center justify-between text-navy-700">
        <div className="flex h-20 w-36 flex-col items-center justify-center rounded-2xl bg-blue-700">
          <p className="text-base uppercase">X (you)</p>
          <p className="text-h-m uppercase">14</p>
        </div>
        <div className="flex h-20 w-36 flex-col items-center justify-center rounded-2xl bg-silver-700">
          <p className="text-base uppercase">Ties</p>
          <p className="text-h-m uppercase">32</p>
        </div>
        <div className="flex h-20 w-36 flex-col items-center justify-center rounded-2xl bg-yellow-700">
          <p className="text-base uppercase">O (cpu)</p>
          <p className="text-h-m uppercase">11</p>
        </div>
      </footer>
    </div>
  );
};
