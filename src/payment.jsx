import React, { useState } from 'react';
import { Eye, EyeOff, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const PaymentPage = () => {
    const [showBalance, setShowBalance] = useState(false);
    const transactionData = JSON.parse(localStorage.getItem("data") ?? "{}")
    const [destination, setDestination] = useState(transactionData.transaction_data.nameDest);
    const [amount, setAmount] = useState(0);
    const navigate = useNavigate()

    const [pin, setPin] = useState('');

    const handlePayment = () => {
        // Logic to handle payment submission
        console.log({ destination, amount, pin });
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md shadow-xl rounded-2xl">
                <div className="p-6 space-y-6 relative">
                    {/* User Profile Section */}
                    <div className="flex items-center space-x-4">
                        <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                            <User size={24} />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold">John Doe</h2>
                            <p className="text-sm text-gray-500">Account Profile</p>
                        </div>

                    </div>
                    <div className="absolute right-2 top-0.5 text-2xl cursor-pointer"
                        onClick={() => navigate("/home")}
                    >&times;</div>

                    {/* Current Balance */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Balance</label>
                        <div className="relative">
                            <input
                                type={showBalance ? 'text' : 'password'}
                                value="10000.00"
                                readOnly
                                className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => setShowBalance(!showBalance)}
                                className="absolute top-2.5 right-3 text-blue-600"
                            >
                                {showBalance ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Destination Account Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Destination Account</label>
                        <input
                            type="text"
                            placeholder="Enter account number"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            disabled
                        />
                    </div>

                    {/* Amount Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                        <input
                            type="number"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>



                    {/* PIN Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">PIN Code</label>
                        <input
                            type="password"
                            placeholder="Enter PIN"
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        className="w-full mt-4 p-1.5 bg-blue-600 rounded-md "
                        onClick={handlePayment}
                    >
                        Make Payment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
