import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./views/Header";
import Quiz from "./views/Quiz";
import Start from "./views/StartScreen";
import Result from "./views/FinishScreen";
import NotFound from "./helpers/NotFound";

function App() {
  return (
    <div className="app">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route index element={<Start />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/result" element={<Result />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
