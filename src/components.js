import Home from './pages/Home';
import JobSupport from './pages/JobSupport';
import TechInDailyLife from './pages/TechInDailyLife';
import ResumeBuilder from './pages/ResumeBuilder';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import UserInformation from './pages/UserInformation';
import PDFPage from './pages/PDFPage';
import TechUsedInClassAndWork from './pages/TechUsedInClassAndWork';
import TechSafetyAndPrivacy from './pages/TechSafetyAndPrivacy';
import FinanceAndManagement from './pages/FinancaAndManagement';
import ForgotPassword from './pages/ForgotPassword';
import AddYoutubeVideos from './pages/AddYoutubeVideos';
import HelpManager from './pages/HelpManager';
import Quiz from './pages/Quiz';
import Help from './pages/QuestionsPage';
import QuestionDisplay from './Layouts/Main/FAQ/QuestionDisplay/index';

const components = {
	home: Home,
	login: Login,
	signUp: SignUp,
	forgotPassword: ForgotPassword,
	techInDailyLife: TechInDailyLife,
	techInClassAndWork: TechUsedInClassAndWork,
	techSafetyAndPrivacy: TechSafetyAndPrivacy,
	financeAndManagement: FinanceAndManagement,
	quiz: Quiz,
	help: Help,
	questionDisplay: QuestionDisplay,
	jobSupport: JobSupport,
	resumeBuilder: ResumeBuilder,
	userInformation: UserInformation,
	generateResume: PDFPage,
	addYoutubeVideos: AddYoutubeVideos,
	helpManager: HelpManager,
};

export default components;
