import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "enterprisze-global-components/dist/index.css";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Notifications from "./pages/Notifications";
import AnalyticsAndReport from "./pages/AnalyticsAndReport";
import EmployeeTransition from "./pages/EmployeeTransition";
import Settings from "./pages/Settings";
import Home from "./pages/Home";
import Summary from "./pages/Employees/pages/Summary";
import Personal from "./pages/Employees/pages/Personal";
import Documents from "./pages/Employees/pages/Documents";
import Work from "./pages/Employees/pages/Work";
import Log from "./pages/Employees/pages/Log";
import Compensation from "./pages/Employees/pages/Compensation";
import Payslip from "./pages/Employees/pages/Payslip";
import HoofTrails from "./pages/Employees/pages/HoofTrails";
import EmployeeList from "./pages/Employees/pages/EmployeeList";
import NotFound from "./pages/NotFound";
import Accounts from "./pages/Settings/pages/Accounts";
import Tags from "./pages/Settings/pages/Tags";
import Positions from "./pages/Settings/pages/Positions";
import JobTitle from "./pages/Settings/pages/JobTitle";
import Teams from "./pages/Teams/index";
import SpecificTeam from "./pages/Teams/pages/SpecificTeam";
import ChangePassword from "./pages/ChangePassword";

import { useSharedAuth } from "./hooks/authentication/useSharedAuth";
import SecuritySettings from "./pages/SecuritySettings";
import SecurityConfiguration from "./pages/SecuritySettings/pages/SecurityConfiguration";
import TwoFactorAuthentication from "./pages/SecuritySettings/pages/2FactorAuthentication";
import ActiveSessionManagement from "./pages/SecuritySettings/pages/ActiveSessionManagement";
import EmailVerification from "./pages/SecuritySettings/pages/EmailVerification";
import HoofTrail from "./pages/SecuritySettings/pages/HoofTrail";
import MillComponents from "./components/examples/millcomponents";
import KassyComponents from "./components/KassyComponents";

function App() {
  // const {
  //   user,
  //   isAuthenticated,
  //   loading,
  //   error,
  //   logout,
  //   source,
  //   hasAuth
  //   } = useSharedAuth();

  //   // Console log to check current user
  //   console.log('Current user:', user);
  //   console.log('Authentication status:', { isAuthenticated, hasAuth, source });

  //   if (loading) {
  //       return (
  //       <div className="flex items-center justify-center min-h-screen bg-gray-50">
  //           <div className="text-center">
  //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
  //           <p className="text-gray-600">Checking authentication...</p>
  //           </div>
  //       </div>
  //       );
  //   }

  //   if (!hasAuth) {
  //       return (
  //         <div className="flex items-center justify-center min-h-screen bg-gray-50">
  //           <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
  //             <div className="text-center mb-6">
  //               <h2 className="text-2xl font-bold text-gray-900 mb-2">
  //                 Authentication Required
  //               </h2>
  //               <p className="text-gray-600">
  //                 Please log in through the main portal to access HRMSZ.
  //               </p>
  //             </div>

  //             <div className="space-y-4">
  //               <button
  //                 onClick={() => (window.location.href = "http://localhost:5172")}
  //                 className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
  //               >
  //                 Go to Main Portal
  //               </button>

  //               <div className="text-center">
  //                 <button
  //                   onClick={() => window.location.reload()}
  //                   className="text-sm text-blue-600 hover:text-blue-800 underline"
  //                 >
  //                   Retry Authentication
  //                 </button>
  //               </div>
  //             </div>

  //             {error && (
  //               <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
  //                 <p className="text-red-700 text-sm">{error}</p>
  //               </div>
  //             )}
  //           </div>
  //         </div>
  //       );
  //     }

  return (
    <Router>
      <Routes>
        <Route path="/home/*" element={<Home />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="employees" element={<EmployeeList />} />
          <Route path="employees/:employee_ID/*" element={<Employees />}>
            <Route path="summary" element={<Summary />} />
            <Route path="personal" element={<Personal />} />
            <Route path="documents" element={<Documents />} />
            <Route path="work" element={<Work />} />
            <Route path="log" element={<Log />} />
            <Route path="compensation" element={<Compensation />} />
            <Route path="payslip" element={<Payslip />} />
            <Route path="hoof-trails" element={<HoofTrails />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="teams" element={<Teams />} />
          <Route path="teams/:id/specificteam" element={<SpecificTeam />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="analytics-and-report" element={<AnalyticsAndReport />} />
          <Route path="employee-transition" element={<EmployeeTransition />} />
          <Route path="settings/*" element={<Settings />}>
            <Route path="accounts" element={<Accounts mode="all-accounts" />} />
            <Route
              path="accounts/archived"
              element={<Accounts mode="archived" />}
            />
            <Route path="tags" element={<Tags mode="all-tags" />} />
            <Route
              path="tags/archived-tags"
              element={<Tags mode="archived" />}
            />
            <Route
              path="positions"
              element={<Positions mode="all-positions" />}
            />
            <Route
              path="positions/archived-positions"
              element={<Positions mode="archived" />}
            />
            <Route
              path="job-title"
              element={<JobTitle mode="all-job-titles" />}
            />
            <Route
              path="job-title/job-title-archived"
              element={<JobTitle mode="archived" />}
            />
          </Route>
          <Route path="security-settings/*" element={<SecuritySettings />}>
            <Route
              path="security-configuration"
              element={<SecurityConfiguration />}
            />
            <Route
              path="2-factor-authentication"
              element={<TwoFactorAuthentication />}
            />
            <Route
              path="active-session-management"
              element={<ActiveSessionManagement />}
            />
            {/* <Route path="data-privacy" element={<DataPrivacy />} /> */}
            <Route path="email-verification" element={<EmailVerification />} />
            <Route path="hoof-trail" element={<HoofTrail />} />
          </Route>
          <Route path="*" element={<NotFound />} />
          {/* Catch-all route for 404 */}
        </Route>
        <Route path="change-password" element={<ChangePassword />} />
        <Route path="/" element={<Navigate to="/home/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/home/dashboard" replace />} />

        <Route path="mill" element={<MillComponents />} />
        <Route path="kassy" element={<KassyComponents />} />
      </Routes>
    </Router>
  );
}

export default App;
