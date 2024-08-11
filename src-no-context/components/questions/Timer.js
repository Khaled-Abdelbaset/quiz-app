import { useEffect } from "react";


function Timer({ dispatch, secRemaining }) {
  const min = Math.floor(secRemaining / 60);
  const sec = secRemaining % 60;
  useEffect(() => {
    const timerId = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);
    return () => clearInterval(timerId);
  }, [dispatch]);
  return (
    <div className="timer">
      {min < 10 ? `0${min}` : min}:{sec < 10 ? `0${sec}` : sec}
    </div>
  );
}

export default Timer;
