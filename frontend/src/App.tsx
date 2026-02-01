import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ConfirmationPage from "./pages/ConfirmationPage";
import HomePage from "./pages/HomePage";
import QuotePage from "./pages/QuotePage";
import UserDataPage from "./pages/UserDataPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quote" element={<QuotePage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/user-data" element={<UserDataPage />} />
      </Routes>
    </Router>
  );
}

export default App;
