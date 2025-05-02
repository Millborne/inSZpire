import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "enterprisze-global-components/dist/index.css";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Teams from "./pages/Teams";
import Notifications from "./pages/Notifications";
import AnalyticsAndReport from "./pages/AnalyticsAndReport";
import EmployeeTransition from "./pages/EmployeeTransition";
import Settings from "./pages/Settings";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/teams" element={<Teams />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route
                    path="/analytics-and-report"
                    element={<AnalyticsAndReport />}
                />
                <Route
                    path="/employee-transition"
                    element={<EmployeeTransition />}
                />
                <Route path="/settings" element={<Settings />} />
            </Routes>
        </Router>
    );
}

export default App;
