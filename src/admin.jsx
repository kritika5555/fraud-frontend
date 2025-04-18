// components/AdminLayout.jsx
import { useState } from 'react';
import { BarChart2, Users, ShieldAlert } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';

export default function AdminLayout() {
    const location = useLocation();

    const menuItems = [
        { name: 'Dashboard', icon: BarChart2, path: '/admin/dashboard' },
        { name: 'Users', icon: Users, path: '/admin/users' },
        { name: 'Fraud Reports', icon: ShieldAlert, path: '/admin/fraud-reports' },
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md">
                <div className="p-4 font-bold text-xl border-b">Admin Panel</div>
                <nav className="mt-4">
                    {menuItems.map(item => {
                        const active = location.pathname.startsWith(item.path);
                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`flex items-center px-4 py-2 text-sm font-medium ${active ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                <item.icon className="w-5 h-5 mr-3" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* Main content */}
            <main className="flex-1 p-6 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
}
