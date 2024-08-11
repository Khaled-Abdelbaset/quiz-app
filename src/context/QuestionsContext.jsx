import { createContext, useContext, useEffect, useReducer } from "react";

const BASE_URL = "http://localhost:8000";

const QuestionsContext = createContext();

const SECONDS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        questions: action.payload,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secRemaining: state.questions.length * SECONDS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        answer: null,
        index: state.index + 1,
      };
    case "finished":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };
    case "tick":
      return {
        ...state,
        secRemaining: state.secRemaining - 1,
        status: state.secRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error();
  }
}

function QuestionsProvider({ children }) {
  const [
    { questions, status, index, answer, points, highscore, secRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions?.length;
  const maxPoints = questions?.reduce((prev, cur) => prev + cur.points, 0);

  useEffect(() => {
    fetch(`${BASE_URL}/questions`)
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecieved", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <QuestionsContext.Provider
      value={{
        questions,
        numQuestions,
        status,
        index,
        answer,
        points,
        maxPoints,
        highscore,
        secRemaining,

        dispatch,
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
}

function useQuestions() {
  const context = useContext(QuestionsContext);
  if (!context) {
    throw new Error("CitiesContext must be used within CityProvider");
  }
  return context;
}

export { QuestionsProvider, useQuestions };
