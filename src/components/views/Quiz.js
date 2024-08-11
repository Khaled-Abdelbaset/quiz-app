import { useQuestions } from "../../context/QuestionsContext";
import Loader from "../helpers/Loader";
import Footer from "../quiz/Footer";
import Progress from "../quiz/Progress";
import Questions from "../quiz/Questions";
import Error from "../helpers/Error";

function Quiz() {
  const { status } = useQuestions();
  if (status === "loading") return <Loader />;
  if (status === "error") return <Error />;
  return (
    <main className="main">
      <Progress />
      <Questions />
      <Footer />
    </main>
  );
}

export default Quiz;
