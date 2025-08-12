import React from 'react';
import EmployeeHistoryConsole from './EmployeeHistoryConsole';

/**
 * Example component showing how to integrate the Employee History Console
 * into your application for testing purposes.
 */
const EmployeeHistoryConsoleExample: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        🧪 Employee History API Testing Console
                    </h1>
                    <p className="text-gray-600">
                        Use this console to test the <code className="bg-gray-200 px-2 py-1 rounded">POST /api/v1/employee-history/view</code> endpoint
                    </p>
                </div>

                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h2 className="text-lg font-semibold text-blue-800 mb-2">📋 Instructions</h2>
                    <ol className="list-decimal list-inside space-y-1 text-blue-700">
                        <li>Enter an employee ID in the input field (default: ralph anthony fuentes)</li>
                        <li>Click "🚀 Test API" to make the API call</li>
                        <li>Watch the console output for detailed logs</li>
                        <li>View the response data in the "API Response" section</li>
                        <li>Use "🔄 Test Different Employee" to test with other employee IDs</li>
                    </ol>
                </div>

                <EmployeeHistoryConsole />

                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h2 className="text-lg font-semibold text-green-800 mb-2">✅ Expected Results</h2>
                    <p className="text-green-700">
                        Based on your Postman screenshot, you should see:
                    </p>
                    <ul className="list-disc list-inside mt-2 text-green-700 space-y-1">
                        <li><strong>Status:</strong> 200 OK</li>
                        <li><strong>Success:</strong> true</li>
                        <li><strong>Message:</strong> "Employee history view retrieved successfully"</li>
                        <li><strong>History Records:</strong> At least 1 record for the test employee</li>
                        <li><strong>Employee Data:</strong> Including employee_history_ID, employee_full_name, current_position_name, etc.</li>
                    </ul>
                </div>

                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h2 className="text-lg font-semibold text-yellow-800 mb-2">🔧 Integration Steps</h2>
                    <p className="text-yellow-700 mb-2">
                        To integrate this console into your existing application:
                    </p>
                    <ol className="list-decimal list-inside space-y-1 text-yellow-700">
                        <li>Import the console component: <code className="bg-yellow-200 px-1 rounded">import EmployeeHistoryConsole from './components/EmployeeHistoryConsole'</code></li>
                        <li>Add it to your page: <code className="bg-yellow-200 px-1 rounded">&lt;EmployeeHistoryConsole /&gt;</code></li>
                        <li>Test the API calls and verify the responses</li>
                        <li>Once confirmed working, remove the console and use the <code className="bg-yellow-200 px-1 rounded">EmploymentHistory</code> component</li>
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default EmployeeHistoryConsoleExample;
