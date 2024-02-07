import { useEffect } from "react";

function Timer({ secondsRemaining, dispatch }) {
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(
    function () {
      const id = setInterval(() => {
        dispatch({ type: "tick" });
      }, 1000);

      return () => clearInterval(id);
    },
    [dispatch]
  );
  return (
    <p className="timer">
      {minutes < 10 && "0"}
      {minutes}: {seconds < 10 && "0"} {seconds}
    </p>
  );
}

export default Timer;
