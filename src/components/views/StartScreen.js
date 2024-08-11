import { useNavigate } from "react-router-dom";
import { useQuestions } from "../../context/QuestionsContext";
import Loader from "../helpers/Loader";
import Error from "../helpers/Error";

function StartScreen() {
  const navigate = useNavigate();
  const { status, numQuestions, dispatch } = useQuestions();

  function handleStartQuiz() {
    dispatch({ type: "start" });
    navigate("/quiz");
  }

  if (status === "loading") return <Loader />;
  if (status === "error") return <Error />;
  return (
    <div className="start">
      <h2>Welcome To React Quiz</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <button className="btn btn-ui" onClick={handleStartQuiz}>
        Let's Start
      </button>
    </div>
  );
}

export default StartScreen;
