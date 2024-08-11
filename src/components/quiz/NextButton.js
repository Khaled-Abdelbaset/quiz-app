import { useNavigate } from "react-router-dom";
import { useQuestions } from "../../context/QuestionsContext";

function NextButton() {
  const navigate = useNavigate();
  const { dispatch, answer, index, numQuestions } = useQuestions();

  function handleFinishQuiz() {
    dispatch({ type: "finished" });
    navigate("/result");
  }

  if (answer === null) return null;
  if (index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  if (index === numQuestions - 1)
    return (
      <button className="btn btn-ui" onClick={handleFinishQuiz}>
        Finish
      </button>
    );
}

export default NextButton;
