import { useEffect } from "react";
import { useQuestions } from "../../context/QuestionsContext";

function Timer() {
  const { dispatch, secRemaining } = useQuestions();
  const min = Math.floor(secRemaining / 60);
  const sec = secRemaining % 60;

  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);

      return () => clearInterval(id);
    },
    [dispatch]
  );
  
  return (
    <div className="timer">
      {min < 10 ? `0${min}` : min}:{sec < 10 ? `0${sec}` : sec}
    </div>
  );
}

export default Timer;
