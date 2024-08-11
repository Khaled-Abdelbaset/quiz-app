import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./views/Header";
import Quiz from "./views/Quiz";
import Home from "./views/Home";
import Result from "./views/Result";
import NotFound from "./helpers/NotFound";

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/result" element={<Result />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
