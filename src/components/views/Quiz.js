import { useQuestions } from "../../context/QuestionsContext";
import Loader from "../helpers/Loader";
import Footer from "../quiz/Footer";
import Progress from "../quiz/Progress";
import Questions from "../quiz/Questions";
import Error from "../helpers/Error";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Quiz() {
  const navigate = useNavigate();
  const { status } = useQuestions();

  useEffect(() => {
    if (status === "ready") navigate("/");
  }, [status, navigate]);

  if (status === "loading") return <Loader />;
  if (status === "error") return <Error />;

  return (
    <div className="quiz">
      <Progress />
      <Questions />
      <Footer />
    </div>
  );
}

export default Quiz;
