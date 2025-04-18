import { useState, useRef } from 'react';
import { Eye, EyeOff, Lock, User, UserPlus, PhoneCallIcon } from 'lucide-react';
import { _axios } from './config/axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [passwordStrength, setPasswordStrength] = useState({
        score: 0,
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (name === 'password' && value) {
            checkPasswordStrength(value);
        }
    };

    const checkPasswordStrength = (password) => {
        let score = 0;
        let message = '';

        if (password.length < 8) {
            message = 'Password is too short';
        } else {
            score += 1;
        }

        if (/[A-Z]/.test(password)) score += 1;
        if (/[0-9]/.test(password)) score += 1;
        if (/[^A-Za-z0-9]/.test(password)) score += 1;

        if (score === 2) message = 'Password strength: Weak';
        if (score === 3) message = 'Password strength: Medium';
        if (score === 4) message = 'Password strength: Strong';

        setPasswordStrength({ score, message });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage('');

        if (formData.password !== formData.confirmPassword) {
            setErrorMessage('Passwords do not match');
            setIsLoading(false);
            return;
        }

        try {
            const response = await _axios.post('/register/', {
                name: `${formData.firstName} ${formData.lastName}`,
                phone: formData.phone,
                password: formData.password
            });

            navigate('/', {
                state: { message: 'Registration successful! Please sign in.' }
            });
        } catch (error) {
            setErrorMessage(
                error.response?.data?.message ||
                'Registration failed. Please try again.'
            );
        } finally {
            setIsLoading(false);
        }
    };

    const getPasswordStrengthColor = () => {
        if (passwordStrength.score === 0) return 'text-gray-400';
        if (passwordStrength.score <= 2) return 'text-red-500';
        if (passwordStrength.score === 3) return 'text-yellow-500';
        return 'text-green-500';
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <div className="flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 w-full max-w-md mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-900">
                        Create a new account
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        or{' '}
                        <Link to="/" className="font-medium text-blue-600 hover:text-blue-500">
                            Sign in to your existing account
                        </Link>
                    </p>
                </div>

                <div className="bg-white py-8 px-6 shadow rounded-lg">
                    {errorMessage && (
                        <div className="mb-4 bg-red-50 border border-red-200 text-red-800 rounded-md p-4">
                            <p className="text-sm">{errorMessage}</p>
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                                    First Name
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User size={18} className="text-gray-400" />
                                    </div>
                                    <input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        required
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="pl-10 block w-full py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        placeholder="Ram"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                                    Last Name
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User size={18} className="text-gray-400" />
                                    </div>
                                    <input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        required
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="pl-10 block w-full py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        placeholder="Limbu"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Phone Number
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <PhoneCallIcon size={18} className="text-gray-400" />
                                </div>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="text"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="pl-10 block w-full py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="+977- XXXXXXXXXX"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock size={18} className="text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="pl-10 block w-full py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="••••••••"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="text-gray-400 hover:text-gray-500 focus:outline-none"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                            {formData.password && (
                                <p className={`mt-1 text-xs ${getPasswordStrengthColor()}`}>
                                    {passwordStrength.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock size={18} className="text-gray-400" />
                                </div>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    required
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="pl-10 block w-full py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="••••••••"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <button
                                        type="button"
                                        onClick={toggleConfirmPasswordVisibility}
                                        className="text-gray-400 hover:text-gray-500 focus:outline-none"
                                    >
                                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                            {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                                <p className="mt-1 text-xs text-red-500">
                                    Passwords do not match
                                </p>
                            )}
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex justify-center items-center w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center">
                                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                                        Processing...
                                    </div>
                                ) : (
                                    <div className="flex items-center">
                                        <UserPlus size={18} className="mr-2" />
                                        Create Account
                                    </div>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="mt-8">
                    <p className="text-center text-sm text-gray-500">
                        © 2025 Fraud Detection System. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}
