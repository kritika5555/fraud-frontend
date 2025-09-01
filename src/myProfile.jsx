import { LogOut, Shield, Lock, Smartphone, Activity, Info, FileText, Fingerprint, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function UserProfile() {
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <button
                className="mb-4 flex items-center text-blue-600 hover:text-blue-800 transition"
                onClick={() => navigate('/home')}
                aria-label="Go to Home"
            >
                <Home size={28} />
                <span className="ml-2 font-medium hidden sm:inline">Home</span>
            </button>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h1>

            {/* Profile Card */}
            <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow mb-8">
                <img
                    src="https://newprofilepic.photo-cdn.net//assets/images/article/profile.jpg?90af0c8"
                    alt="Profile"
                    className="w-20 h-20 rounded-full mb-3"
                />
                <h2 className="text-xl font-semibold text-gray-900">{user?.first_name} {user?.last_name}</h2>
                <p className="text-gray-500">{user?.phone_number || "+91-XXXXXX7890"}</p>
            </div>

            {/* Settings Sections */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Profile Information Section */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Profile Information</h3>
                    <ul className="space-y-4 text-gray-700">
                        <li className="flex items-center space-x-3 cursor-pointer hover:text-blue-600">
                            <Info size={18} /> <span>My Information</span>
                        </li>
                        <li className="flex items-center space-x-3 cursor-pointer hover:text-blue-600">
                            <FileText size={18} /> <span>Terms and Conditions</span>
                        </li>
                        <li className="flex items-center space-x-3 cursor-pointer text-red-600 hover:text-red-800">
                            <LogOut size={18} /> <span>Logout</span>
                        </li>
                    </ul>
                </div>

                {/* Security Settings Section */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Security Settings</h3>
                    <ul className="space-y-4 text-gray-700">
                        <li className="flex items-center space-x-3 cursor-pointer hover:text-blue-600">
                            <Lock size={18} /> <span>Change Password</span>
                        </li>
                        <li className="flex items-center space-x-3 cursor-pointer hover:text-blue-600">
                            <Fingerprint size={18} /> <span>Setup Biometrics</span>
                        </li>
                        <li className="flex items-center space-x-3 cursor-pointer hover:text-blue-600">
                            <Smartphone size={18} /> <span>Change Phone Number</span>
                        </li>
                        <li className="flex items-center space-x-3 cursor-pointer hover:text-blue-600">
                            <Activity size={18} /> <span>Transaction Analytics</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
