import React, { useState, useEffect } from 'react';
import { useEmployeeHistoryView } from '../services/employee-profile/work/employee-history/use-employee-history';

const EmployeeHistoryConsole: React.FC = () => {
    const [employeeId, setEmployeeId] = useState("378b9040ffff4c9085f0e4810f7c5100");
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(25);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [logs, setLogs] = useState<string[]>([]);

    const { fetchEmployeeHistory } = useEmployeeHistoryView();

    const addLog = (message: string) => {
        const timestamp = new Date().toLocaleTimeString();
        setLogs(prev => [...prev, `[${timestamp}] ${message}`]);
    };

    const clearLogs = () => {
        setLogs([]);
    };

    const testEmployeeHistory = async () => {
        setIsLoading(true);
        setError(null);
        setResult(null);
        clearLogs();

        try {
            addLog('🚀 Starting employee history API test...');
            addLog(`📤 Request Details:`);
            addLog(`   URL: POST http://localhost:3000/api/v1/employee-history/view`);
            addLog(`   Employee ID: ${employeeId}`);
            addLog(`   Offset: ${offset}`);
            addLog(`   Limit: ${limit}`);

            const requestBody = {
                employee_ID: employeeId,
                offset: offset,
                limit: limit
            };

            addLog(`📦 Request Body: ${JSON.stringify(requestBody, null, 2)}`);

            const response = await fetchEmployeeHistory(requestBody);

            addLog('✅ API call successful!');
            addLog(`📥 Response Status: 200 OK`);
            addLog(`📊 Response Details:`);
            addLog(`   Success: ${response.success}`);
            addLog(`   Message: ${response.message}`);
            addLog(`   History Records: ${response.data?.history?.length || 0}`);

            if (response.data?.history?.length > 0) {
                addLog('📋 History Records:');
                response.data.history.forEach((record: any, index: number) => {
                    addLog(`   ${index + 1}. ${record.employee_full_name} - ${record.current_position_name} (${record.start_date})`);
                });
            }

            setResult(response);
            addLog('🎉 Test completed successfully!');

        } catch (err: any) {
            addLog('❌ API call failed!');
            addLog(`💥 Error: ${err.message}`);
            addLog(`🔍 Error Details: ${JSON.stringify(err, null, 2)}`);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const testWithDifferentEmployee = async () => {
        // Test with a different employee ID
        const testEmployeeId = "1599cdaa078c48e38388c83e10cf2fee"; // john john edit 11 cagaanan
        setEmployeeId(testEmployeeId);
        addLog(`🔄 Switching to test employee: ${testEmployeeId}`);
        
        // Wait a moment then test
        setTimeout(() => {
            testEmployeeHistory();
        }, 100);
    };

    const testWithEmptyResponse = async () => {
        // Test with an employee that might not have history
        const testEmployeeId = "test-employee-with-no-history";
        setEmployeeId(testEmployeeId);
        addLog(`🔄 Testing with employee that might have no history: ${testEmployeeId}`);
        
        setTimeout(() => {
            testEmployeeHistory();
        }, 100);
    };

    return (
        <div className="p-6 bg-gray-900 text-white rounded-lg font-mono">
            <h2 className="text-xl font-bold mb-4 text-green-400">🖥️ Employee History API Console</h2>
            
            {/* Request Configuration */}
            <div className="mb-6 p-4 bg-gray-800 rounded">
                <h3 className="text-lg font-semibold mb-3 text-blue-400">📋 Request Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Employee ID:</label>
                        <input
                            type="text"
                            value={employeeId}
                            onChange={(e) => setEmployeeId(e.target.value)}
                            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                            placeholder="Enter employee ID"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Offset:</label>
                        <input
                            type="number"
                            value={offset}
                            onChange={(e) => setOffset(Number(e.target.value))}
                            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Limit:</label>
                        <input
                            type="number"
                            value={limit}
                            onChange={(e) => setLimit(Number(e.target.value))}
                            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                        />
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="mb-6 flex flex-wrap gap-2">
                <button
                    onClick={testEmployeeHistory}
                    disabled={isLoading}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                >
                    {isLoading ? '⏳ Testing...' : '🚀 Test API'}
                </button>
                <button
                    onClick={testWithDifferentEmployee}
                    disabled={isLoading}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    🔄 Test Different Employee
                </button>
                <button
                    onClick={testWithEmptyResponse}
                    disabled={isLoading}
                    className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:opacity-50"
                >
                    📭 Test Empty Response
                </button>
                <button
                    onClick={clearLogs}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                    🗑️ Clear Logs
                </button>
            </div>

            {/* Console Logs */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-yellow-400">📺 Console Output</h3>
                <div className="bg-black p-4 rounded h-64 overflow-y-auto">
                    {logs.length === 0 ? (
                        <div className="text-gray-500">No logs yet. Click "Test API" to start...</div>
                    ) : (
                        logs.map((log, index) => (
                            <div key={index} className="text-sm mb-1">
                                {log}
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Error Display */}
            {error && (
                <div className="mb-6 p-4 bg-red-900 border border-red-600 text-red-200 rounded">
                    <h3 className="font-semibold mb-2">❌ Error</h3>
                    <div className="text-sm">{error}</div>
                </div>
            )}

            {/* Response Display */}
            {result && (
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 text-green-400">📥 API Response</h3>
                    <div className="bg-gray-800 p-4 rounded">
                        <div className="mb-2">
                            <span className="text-green-400">Status:</span> 200 OK
                        </div>
                        <div className="mb-2">
                            <span className="text-green-400">Success:</span> {result.success ? '✅ Yes' : '❌ No'}
                        </div>
                        <div className="mb-2">
                            <span className="text-green-400">Message:</span> {result.message}
                        </div>
                        <div className="mb-4">
                            <span className="text-green-400">Records Found:</span> {result.data?.history?.length || 0}
                        </div>
                        
                        <details className="text-sm">
                            <summary className="cursor-pointer text-blue-400 hover:text-blue-300">
                                📄 View Full JSON Response
                            </summary>
                            <pre className="mt-2 p-3 bg-gray-900 rounded overflow-auto text-xs">
                                {JSON.stringify(result, null, 2)}
                            </pre>
                        </details>
                    </div>
                </div>
            )}

            {/* API Information */}
            <div className="text-sm text-gray-400">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <strong>Endpoint:</strong> POST /api/v1/employee-history/view
                    </div>
                    <div>
                        <strong>Base URL:</strong> http://localhost:3000/api/v1
                    </div>
                    <div>
                        <strong>Content-Type:</strong> application/json
                    </div>
                    <div>
                        <strong>Status:</strong> {isLoading ? '⏳ Testing...' : error ? '❌ Failed' : result ? '✅ Success' : '🔄 Ready'}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeHistoryConsole;
