import { createBrowserRouter } from "react-router";
import SplashScreen from "./pages/SplashScreen";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfileSetupPage from "./pages/ProfileSetupPage";
import HomePage from "./pages/HomePage";
import DailyViewPage from "./pages/DailyViewPage";
import SummaryPage from "./pages/SummaryPage";
import SettingsPage from "./pages/SettingsPage";
import CheckStartPage from "./pages/CheckStartPage";
import WangDiagnosisPage from "./pages/WangDiagnosisPage";
import WenDiagnosisPage from "./pages/WenDiagnosisPage";
import QieDiagnosisPage from "./pages/QieDiagnosisPage";
import WenQuestionPage from "./pages/WenQuestionPage";
import CheckResultPage from "./pages/CheckResultPage";
import CompanionChatPage from "./pages/CompanionChatPage";
import CompanionSummaryPage from "./pages/CompanionSummaryPage";
import CompanionGoodbyePage from "./pages/CompanionGoodbyePage";
import DesignSystemDemo from "./components/DesignSystemDemo";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: SplashScreen,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/register",
    Component: RegisterPage,
  },
  {
    path: "/profile-setup",
    Component: ProfileSetupPage,
  },
  {
    path: "/home",
    Component: HomePage,
  },
  {
    path: "/daily-view",
    Component: DailyViewPage,
  },
  {
    path: "/summary",
    Component: SummaryPage,
  },
  {
    path: "/settings",
    Component: SettingsPage,
  },
  {
    path: "/design-system",
    Component: DesignSystemDemo,
  },
  {
    path: "/check-start",
    Component: CheckStartPage,
  },
  {
    path: "/check/wang",
    Component: WangDiagnosisPage,
  },
  {
    path: "/check/wen",
    Component: WenDiagnosisPage,
  },
  {
    path: "/check/qie",
    Component: QieDiagnosisPage,
  },
  {
    path: "/check/wen-question",
    Component: WenQuestionPage,
  },
  {
    path: "/check/result",
    Component: CheckResultPage,
  },
  {
    path: "/companion",
    Component: CompanionChatPage,
  },
  {
    path: "/companion/summary",
    Component: CompanionSummaryPage,
  },
  {
    path: "/companion/goodbye",
    Component: CompanionGoodbyePage,
  },
]);