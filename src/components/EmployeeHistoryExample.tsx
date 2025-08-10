import React from 'react';
import EmploymentHistory from '../pages/Employees/components/EmploymentHistory';

/**
 * Example component demonstrating how to use the Employee History functionality
 * with the new vw_employee_history API
 */
const EmployeeHistoryExample: React.FC = () => {
    // Example employee ID from your vw_employee_history table
    const exampleEmployeeId = "378b9040ffff4c9085f0e4810f7c5100"; // ralph anthony fuentes

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Employee History Timeline Example</h1>
            
            <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">API Integration Details:</h2>
                <div className="bg-gray-100 p-4 rounded">
                    <p><strong>Endpoint:</strong> POST /api/v1/employee-history/view</p>
                    <p><strong>Base URL:</strong> http://localhost:3000/api/v1/employee-history/view</p>
                    <p><strong>Employee ID:</strong> {exampleEmployeeId}</p>
                </div>
            </div>

            <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Data Mapping:</h2>
                <div className="bg-blue-50 p-4 rounded">
                    <ul className="list-disc list-inside space-y-1">
                        <li><strong>Job Title:</strong> current_position_name</li>
                        <li><strong>Position Code:</strong> current_position_code (displayed in blue)</li>
                        <li><strong>Duration:</strong> start_date to end_date (calculated)</li>
                        <li><strong>Company/Department:</strong> employment_status</li>
                        <li><strong>Change Type:</strong> change_type (hired, promoted, etc.)</li>
                    </ul>
                </div>
            </div>

            <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Features:</h2>
                <div className="bg-green-50 p-4 rounded">
                    <ul className="list-disc list-inside space-y-1">
                        <li>✅ Vertical timeline with blue circular bullets</li>
                        <li>✅ Connecting lines between timeline entries</li>
                        <li>✅ Expandable entries with chevron icons</li>
                        <li>✅ Loading states and error handling</li>
                        <li>✅ Duration calculations (months/years)</li>
                        <li>✅ Real-time data from vw_employee_history table</li>
                    </ul>
                </div>
            </div>

            {/* The actual Employee History component */}
            <div className="border rounded-lg">
                <EmploymentHistory employeeId={exampleEmployeeId} />
            </div>
        </div>
    );
};

export default EmployeeHistoryExample;
