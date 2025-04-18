
import { useState, useEffect, useRef } from 'react';
import { Eye, EyeOff, Upload, RefreshCw, AlertTriangle, CheckCircle, User } from 'lucide-react';
import { _axios } from './config/axios';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate()
    const [user, setUser] = useState({ username: 'John Doe', balance: 24580.75 });
    const [showBalance, setShowBalance] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [scanResult, setScanResult] = useState(null);
    const fileInputRef = useRef(null);
    const userData = JSON.parse(localStorage.getItem("user"))
    console.log("🚀 ~ Home ~ userData:", userData)

    // Fetch transactions on component mount
    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        // In a real app, this would be an API call
        setIsLoading(true);
        // Mock data - replace with actual API call
        setTimeout(() => {
            setTransactions([
                { id: 1, type: 'TRANSFER', amount: 1250.00, date: '2025-04-05', status: 'completed' },
                { id: 2, type: 'PAYMENT', amount: 89.99, date: '2025-04-03', status: 'completed' },
                { id: 3, type: 'WITHDRAWAL', amount: 300.00, date: '2025-04-01', status: 'completed' },
                { id: 4, type: 'DEPOSIT', amount: 5000.00, date: '2025-03-28', status: 'completed' },
                { id: 5, type: 'PAYMENT', amount: 125.50, date: '2025-03-25', status: 'completed' }
            ]);
            setIsLoading(false);
        }, 800);
    };

    const toggleBalanceVisibility = () => {
        setShowBalance(!showBalance);
    };

    const handleFileUpload = async (event) => {
        event.preventDefault()

        const file = event.target.files[0];
        if (!file) return;

        setIsLoading(true);

        // Create form data for API call
        const formData = new FormData();
        formData.append('qr_code', file);
        try {
            const response = await _axios.post('api/predict-fraud-from-qr/', formData)
            setScanResult(response.data)
            localStorage.setItem("data", JSON.stringify(response.data))
            if (response.data.prediction === 1) return navigate('/alert')
            if (response.data.prediction === 0) return navigate('/success')
            return response.data
        } catch {
            alert("An error occurred while processing QR")
        } finally {
            setIsLoading(false);
        }
    };


    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">{`Welcome ${userData?.first_name} !`}</h1>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => {
                                navigate("/")
                                localStorage.clear()
                            }}
                            className="p-2 rounded-full hover:bg-gray-100"
                        >
                            logout
                        </button>
                        <button
                            onClick={() => fetchTransactions()}
                            className="p-2 rounded-full hover:bg-gray-100"
                        >
                            <RefreshCw size={20} />
                        </button>
                    </div>
                </div>
            </header>

            <main className="flex-grow container mx-auto px-4 py-6 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="bg-blue-100 p-3 rounded-full">
                                <User size={32} className="text-blue-600" />
                            </div>
                            <div>
                                <h2 className="text-xl font-medium text-gray-900">{`${userData?.first_name} ${userData?.last_name}`}</h2>
                                <p className="text-gray-500">Account Profile</p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-600 font-medium">Current Balance</span>
                                <button
                                    onClick={toggleBalanceVisibility}
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    {showBalance ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-md">
                                <p className="text-2xl font-bold text-gray-900">
                                    {showBalance ? `Rs.${user.balance.toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })}` : '••••••••'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* QR Scanner Section */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">QR Code Scanner</h2>

                        <div className="flex flex-col items-center justify-center bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-6 mb-4">
                            <Upload size={48} className="text-gray-400 mb-3" />
                            <p className="text-gray-500 text-center mb-4">Upload a QR code image to scan</p>
                            <button
                                onClick={triggerFileInput}
                                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition duration-150"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Processing...' : 'Upload QR Code'}
                            </button>
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleFileUpload}
                                className="hidden"
                            />
                        </div>

                        {scanResult && (
                            <div className={`p-4 rounded-md mt-4 ${scanResult.prediction === 0
                                ? 'bg-green-50 text-green-800 border border-green-200'
                                : scanResult.prediction === 1
                                    ? 'bg-red-50 text-red-800 border border-red-200'
                                    : 'bg-yellow-50 text-yellow-800 border border-yellow-200'
                                }`}>
                                <div className="flex items-start">
                                    {scanResult.prediction === 0 ? (
                                        <div className="">
                                            Legitimate
                                            <CheckCircle size={20} className="mr-2 mt-0.5 text-green-500" />
                                        </div>
                                    ) : (
                                        <div className="">
                                            Fraud
                                            <AlertTriangle size={20} className="mr-2 mt-0.5 text-red-500" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Transactions Section */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Transactions</h2>

                        {isLoading ? (
                            <div className="flex justify-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            </div>
                        ) : transactions.length > 0 ? (
                            <ul className="divide-y divide-gray-200">
                                {transactions.map(transaction => (
                                    <li key={transaction.id} className="py-4">
                                        <div className="flex justify-between">
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{transaction.type}</p>
                                                <p className="text-sm text-gray-500">{transaction.date}</p>
                                            </div>
                                            <p className={`text-sm font-medium ${transaction.type === 'DEPOSIT' ? 'text-green-600' : 'text-gray-900'
                                                }`}>
                                                {transaction.type === 'DEPOSIT' ? '+' : '-'}
                                                Rs.{transaction.amount.toFixed(2)}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-center py-8 text-gray-500">No transactions found</p>
                        )}
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-sm text-gray-500">
                        © 2025 Fraud Detection System. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}