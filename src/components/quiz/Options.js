import { useQuestions } from "../../context/QuestionsContext";

function Options({ question }) {
  const { answer, dispatch } = useQuestions();
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {question.options.length > 0 &&
        question.options.map((option, i) => {
          return (
            <button
              key={option}
              className={`btn btn-option ${i === answer ? "answer" : ""}  ${
                hasAnswered
                  ? i === question.correctOption
                    ? "correct"
                    : "wrong"
                  : ""
              }`}
              disabled={hasAnswered}
              onClick={() => dispatch({ type: "newAnswer", payload: i })}
            >
              {option}
            </button>
          );
        })}
    </div>
  );
}

export default Options;
