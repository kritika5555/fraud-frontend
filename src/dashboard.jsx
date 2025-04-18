// pages/admin/Dashboard.jsx
import { useState } from 'react';

export default function Dashboard() {
    const [search, setSearch] = useState('');

    const topFrauds = [
        { id: 1, name: 'Fake Shop QR', reports: 45 },
        { id: 2, name: 'Phishing QR', reports: 31 },
        { id: 3, name: 'QR Scam - PayLater', reports: 20 },
    ];

    const filtered = topFrauds.filter(fraud => fraud.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

            <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-white p-6 rounded-lg shadow text-center">
                    <p className="text-gray-600">Total Frauds</p>
                    <h2 className="text-3xl font-semibold">452</h2>
                </div>
                <div className="bg-white p-6 rounded-lg shadow text-center">
                    <p className="text-gray-600">Frauds Today</p>
                    <h2 className="text-3xl font-semibold">12</h2>
                </div>
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search top frauds..."
                    className="w-full p-2 border rounded-md"
                />
            </div>

            <div className="bg-white p-4 rounded shadow">
                <h2 className="text-lg font-semibold mb-2">Top Reported Frauds</h2>
                <ul>
                    {filtered.map(item => (
                        <li key={item.id} className="flex justify-between py-2 border-b last:border-b-0">
                            <span>{item.name}</span>
                            <span className="font-semibold">{item.reports}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
