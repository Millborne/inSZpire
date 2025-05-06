import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "enterprisze-global-components/dist/index.css";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Teams from "./pages/Teams";
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

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/home/*" element={<Home />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="employees" element={<EmployeeList />} />
                    <Route path="employees/:id/*" element={<Employees />}>
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
                    <Route path="notifications" element={<Notifications />} />
                    <Route
                        path="analytics-and-report"
                        element={<AnalyticsAndReport />}
                    />
                    <Route
                        path="employee-transition"
                        element={<EmployeeTransition />}
                    />
                    <Route path="settings" element={<Settings />} />
                    <Route path="*" element={<NotFound />} />
                    {/* Catch-all route for 404 */}
                </Route>
                <Route path="*" element={<>Go to .../home/dashboard</>} />
            </Routes>
        </Router>
    );
}

export default App;
