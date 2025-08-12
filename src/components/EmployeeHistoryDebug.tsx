import React, { useState } from 'react';
import { useEmployeeHistoryView, useEmployeeHistoryByEmployee } from '../services/employee-profile/work/employee-history/use-employee-history';

const EmployeeHistoryDebug: React.FC = () => {
    const [employeeId, setEmployeeId] = useState("378b9040ffff4c9085f0e4810f7c5100");
    const [debugInfo, setDebugInfo] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const { fetchEmployeeHistory, isLoading, error: apiError } = useEmployeeHistoryView();
    const { data: queryData, isLoading: queryLoading, error: queryError } = useEmployeeHistoryByEmployee(employeeId, false);

    const testEndpoint = async () => {
        setError(null);
        setDebugInfo(null);

        try {
            console.log('Testing endpoint with employee ID:', employeeId);
            
            const response = await fetchEmployeeHistory({
                employee_ID: employeeId,
                offset: 0,
                limit: 25
            });

            setDebugInfo({
                success: true,
                data: response,
                timestamp: new Date().toISOString()
            });

        } catch (err: any) {
            setError(err.message);
            setDebugInfo({
                success: false,
                error: err,
                timestamp: new Date().toISOString()
            });
        }
    };

    const testAlternativeEndpoint = async () => {
        setError(null);
        setDebugInfo(null);

        try {
            console.log('Testing alternative endpoint with employee ID:', employeeId);
            
            // Test with a simple GET request
            const response = await fetch(`http://localhost:3000/api/v1/employee-history/employee/${employeeId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            setDebugInfo({
                success: true,
                data: data,
                timestamp: new Date().toISOString()
            });

        } catch (err: any) {
            setError(err.message);
            setDebugInfo({
                success: false,
                error: err,
                timestamp: new Date().toISOString()
            });
        }
    };

    return (
        <div className="p-6 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Employee History API Debug</h2>
            
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Employee ID:</label>
                <input
                    type="text"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="Enter employee ID"
                />
            </div>

            <div className="flex gap-4 mb-4">
                <button
                    onClick={testEndpoint}
                    disabled={isLoading}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                >
                    {isLoading ? 'Testing...' : 'Test POST /employee-history/view'}
                </button>

                <button
                    onClick={testAlternativeEndpoint}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Test GET /employee-history/employee/{employeeId}
                </button>
            </div>

            {error && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                    <strong>Error:</strong> {error}
                </div>
            )}

            {debugInfo && (
                <div className="mb-4">
                    <h3 className="font-semibold mb-2">Debug Information:</h3>
                    <div className="bg-white p-4 border rounded">
                        <pre className="text-sm overflow-auto">
                            {JSON.stringify(debugInfo, null, 2)}
                        </pre>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <h3 className="font-semibold mb-2">API Status:</h3>
                    <ul className="text-sm space-y-1">
                        <li>Mutation Loading: {isLoading ? 'Yes' : 'No'}</li>
                        <li>Mutation Error: {apiError ? 'Yes' : 'No'}</li>
                        <li>Query Loading: {queryLoading ? 'Yes' : 'No'}</li>
                        <li>Query Error: {queryError ? 'Yes' : 'No'}</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold mb-2">Environment:</h3>
                    <ul className="text-sm space-y-1">
                        <li>VITE_EMPLOYMENT_SERVICE: {import.meta.env.VITE_EMPLOYMENT_SERVICE || 'Not set'}</li>
                        <li>Base URL: {import.meta.env.VITE_EMPLOYMENT_SERVICE || 'http://localhost:3000'}</li>
                    </ul>
                </div>
            </div>

            <div className="mt-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
                <strong>Common 404 Solutions:</strong>
                <ul className="mt-2 text-sm list-disc list-inside">
                    <li>Check if the backend endpoint exists</li>
                    <li>Verify the base URL in your environment variables</li>
                    <li>Ensure the backend server is running on the correct port</li>
                    <li>Check if the route is properly registered in your backend</li>
                </ul>
            </div>
        </div>
    );
};

export default EmployeeHistoryDebug;
