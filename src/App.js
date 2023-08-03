import Home from "../src/pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import JobSupport from "./pages/JobSupport";
import TechInDailyLife from "./pages/TechInDailyLife";
import ResumeBuilder from "./pages/ResumeBuilder";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { AuthProvider } from "./firebase/AuthContext";
import UserInformation from "./pages/UserInformation";
import PDFPage from "./pages/PDFPage";
import TechUsedInClassAndWord from "./pages/TechUsedInClassAndWord";
import TechSafetyAndPrivacy from "./pages/TechSafetyAndPrivacy";
import FinanceAndManagement from "./pages/FinancaAndManagement";
import ForgotPassword from "./pages/ForgotPassword";
import AddYoutubeVideos from "./pages/AddYoutubeVideos";
import HelpManager from "./pages/HelpManager";
import Quiz from "./pages/Quiz";
import Help from "./pages/QuestionsPage"
import QuestionDisplay from "./Layouts/Main/FAQ/QuestionDisplay/index"
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/techInDailyLife" element={<TechInDailyLife />} />
          <Route
            path="/techInClassAndWord"
            element={<TechUsedInClassAndWord />}
          />
          <Route
            path="/techSafetyAndPrivacy"
            element={<TechSafetyAndPrivacy />}
          />
          <Route
            path="/financeAndManagement"
            element={<FinanceAndManagement />}
          />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/help" element={<Help />} />
          <Route path="/questions/:questionId" element={<QuestionDisplay />} />

          {/* protected routes */}
          <Route path="/jobSupport" element={<JobSupport />} />
          <Route path="/resumeBuilder" element={<ResumeBuilder />} />
          <Route path="/userInformation" element={<UserInformation />} />
          <Route path="/generateResume" element={<PDFPage />} />
          <Route path="/addYoutubeVideos" element={<AddYoutubeVideos />} />
          <Route path="/helpManager" element={<HelpManager />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
