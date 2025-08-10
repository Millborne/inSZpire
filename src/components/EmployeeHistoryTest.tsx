import React, { useState } from 'react';
import { useEmployeeHistoryView } from '../services/employee-profile/work/employee-history/use-employee-history';

const EmployeeHistoryTest: React.FC = () => {
    const [employeeId, setEmployeeId] = useState("378b9040ffff4c9085f0e4810f7c5100");
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const { fetchEmployeeHistory } = useEmployeeHistoryView();

    const testEmployeeHistory = async () => {
        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            console.log('🧪 Testing employee history API...');
            const response = await fetchEmployeeHistory({
                employee_ID: employeeId,
                offset: 0,
                limit: 25
            });

            console.log('✅ Employee history test successful:', response);
            setResult(response);
        } catch (err: any) {
            console.error('❌ Employee history test failed:', err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-6 bg-blue-50 rounded-lg border">
            <h2 className="text-xl font-bold mb-4">🧪 Employee History API Test</h2>
            
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

            <button
                onClick={testEmployeeHistory}
                disabled={isLoading}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 mb-4"
            >
                {isLoading ? 'Testing...' : 'Test Employee History API'}
            </button>

            {error && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                    <strong>Error:</strong> {error}
                </div>
            )}

            {result && (
                <div className="mb-4">
                    <h3 className="font-semibold mb-2">✅ Success!</h3>
                    <div className="bg-green-100 p-4 border rounded">
                        <p><strong>Message:</strong> {result.message}</p>
                        <p><strong>History Records:</strong> {result.data?.history?.length || 0}</p>
                        <details className="mt-2">
                            <summary className="cursor-pointer font-medium">View Full Response</summary>
                            <pre className="text-xs mt-2 overflow-auto bg-white p-2 rounded">
                                {JSON.stringify(result, null, 2)}
                            </pre>
                        </details>
                    </div>
                </div>
            )}

            <div className="text-sm text-gray-600">
                <p><strong>Endpoint:</strong> POST /api/v1/employee-history/view</p>
                <p><strong>Base URL:</strong> http://localhost:3000/api/v1</p>
                <p><strong>Status:</strong> {isLoading ? 'Testing...' : error ? 'Failed' : result ? 'Success' : 'Ready'}</p>
            </div>
        </div>
    );
};

export default EmployeeHistoryTest;
