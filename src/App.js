import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import AuthForPartners from "./pages/AuthForPartners/AuthForPartners";
import AuthForDevelopers from "./pages/AuthForDevelopers/AuthForDevelopers";
import Home from "./pages/Home/Home";
import Candidate from "./components/Candidate/Candidate";
import Calendar from "./components/Calendar/Calendar";
import ReportForm from "./components/ReportForm/ReportForm";
import FreeDevelopers from "./components/UI/FreeDevelopers/FreeDevelopers";
import { TicketFullScreen } from "./components/UI/TicketFullScreen/TicketFullScreen";
import { ProfileCalendar } from "./components/ProfileCalendar/ProfileCalendar";
import FormPage from "./pages/FormPage/FormPage.js";
import SingleReportPage from "./pages/SingleReportPage/SingleReportPage";
import { QuizPage } from "./pages/quiz/QuizPage";
import { QuizReportPage } from "./pages/quiz/QuizReportPage";
import { Profile } from "./pages/Profile/Profile.js";
import { Summary } from "./pages/Summary/Summary";
import { ViewReport } from "./pages/ViewReport/ViewReport";
import { Tracker } from "./pages/Tracker/Tracker";
import { Payouts } from "./pages/Payouts/Payouts";
import { PartnerSettings } from "./pages/PartnerSettings/PartnerSettings";
import { PartnerRequests } from "./pages/PartnerRequests/PartnerRequests";
import { PartnerAddRequest } from "./pages/PartnerAddRequest/PartnerAddRequest";
import { PartnerBid } from "./pages/PartnerBid/PartnerBid";
import { PartnerCategories } from "./pages/PartnerСategories/PartnerСategories";
import { PartnerTreaties } from "./pages/PartnerTreaties/PartnerTreaties";
import { PartnerEmployees } from "./pages/PartnerEmployees/PartnerEmployees";
import { AuthForCandidate } from "./pages/AuthForCandidate/AuthForCandidate";
import { RegistrationForCandidate } from "./pages/RegistrationForCandidate/RegistrationForCandidate";
import { ProfileCandidate } from "./pages/ProfileCandidate/ProfileCandidate";
import { PassingTests } from "./pages/quiz/PassingTests";
import "./assets/global.scss";
import "./fonts/stylesheet.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FREQUENTLY_ASKED_QUESTIONS_ROUTE, FREQUENTLY_ASKED_QUESTION_ROUTE } from "./constants/router-path";
import { FrequentlyAskedQuestions } from "./pages/FrequentlyAskedQuestions/FrequentlyAskedQuestions";
import { FrequentlyAskedQuestion } from "./pages/FrequentlyAskedQuestion/FrequentlyAskedQuestion";


const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/authdev" element={<AuthForDevelopers />} />
          <Route exact path="/auth" element={<AuthForPartners />} />          
          <Route exact path={FREQUENTLY_ASKED_QUESTIONS_ROUTE} element={<FrequentlyAskedQuestions />}/>
          <Route exact path={FREQUENTLY_ASKED_QUESTION_ROUTE+'/:id'} element={<FrequentlyAskedQuestion />} />     
        
          <Route exact path="/worker/:id" element={<FreeDevelopers />} />
          <Route
            exact
            path="/tracker/:id"
            element={<TicketFullScreen />}
          ></Route>
          <Route exact path="/auth-candidate" element={<AuthForCandidate />} />
          <Route
            exact
            path="/registration-candidate"
            element={<RegistrationForCandidate />}
          />

          <Route exact path="/candidate/:id" element={<Candidate />} />
          <Route exact path="/candidate/:id/form" element={<FormPage />} />
          <Route path="/:userId/calendar" element={<Calendar />} />

          <Route exact path="/report" element={<ReportForm />} />
          <Route path="/report/:id" element={<SingleReportPage />} />

          <Route exact path="quiz">
            <Route index element={<QuizPage />} />
            <Route exact path="test" element={<PassingTests />} />
            <Route exact path="report" element={<QuizReportPage />} />
          </Route>

          <Route exact path="profile">
            <Route index element={<Profile />} />
            <Route exact path="catalog" element={<Home />} />
            <Route exact path="calendar" element={<ProfileCalendar />} />
            <Route exact path="summary" element={<Summary />} />
            <Route exact path="view" element={<ViewReport />} />
            <Route exact path="tracker" element={<Tracker />} />
            <Route exact path="payouts" element={<Payouts />} />
            <Route exact path="settings" element={<PartnerSettings />} />
            <Route exact path="requests" element={<PartnerRequests />} />
            <Route exact path="add-request" element={<PartnerAddRequest />} />
            <Route exact path="edit-request" element={<PartnerAddRequest />} />
            <Route exact path="bid" element={<PartnerBid />} />
            <Route exact path="categories" element={<PartnerCategories />} />
            <Route exact path="treaties" element={<PartnerTreaties />} />
            <Route
              exact
              path="categories/employees"
              element={<PartnerEmployees />}
            />
          </Route>
          <Route exact path="profile-candidate/:id">
            <Route index element={<ProfileCandidate />} />
          </Route>

          {/* <Route path="*" element={<Navigate to="/auth" replace />} /> */}
        </Routes>
      </Router>
    </>
  );
};

export default App;
