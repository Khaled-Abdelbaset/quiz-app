import { useNavigate } from "react-router-dom";
import { useQuestions } from "../../context/QuestionsContext";
import { useEffect } from "react";

function Result() {
  const navigate = useNavigate();
  const { status, dispatch, maxPoints, points, highscore } = useQuestions();
  const percent = (points / maxPoints) * 100;
  let emoji;

  switch (percent) {
    case percent === 100:
      emoji = "🥇";
      break;
    case percent >= 80 && percent < 100:
      emoji = "🥉";
      break;
    case percent >= 50 && percent < 80:
      emoji = "🥈";
      break;
    case percent > 0 && percent < 50:
      emoji = "🎉";
      break;
    default:
      emoji = "🤦‍♂️";
  }

  function handleRestartQuiz() {
    dispatch({ type: "restart" });
    navigate("/");
  }

  useEffect(() => {
    if (status === "ready") navigate("/");
  }, [status, navigate]);

  return (
    <>
      <p className="result">
        {emoji} Your Score <strong>{points}</strong> out of {maxPoints} (
        {Math.ceil(percent)}%)
      </p>
      <p className="highscore">High Score: {highscore} Points</p>
      <button className="btn btn-ui" onClick={handleRestartQuiz}>
        Restart Quiz
      </button>
    </>
  );
}

export default Result;
