export default () => {
  return (
    <>
      <h1 className="text-4xl font-extrabold">React + Express + Tailwind</h1>
      <button
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        onClick={() => {
          fetch("/api")
            .then((response) => response.text())
            .then((data) => alert(data));
        }}
      >
        Click me!
      </button>
    </>
  );
};
