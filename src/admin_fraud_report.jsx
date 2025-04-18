// pages/admin/FraudReports.jsx
import { useState } from 'react';

export default function FraudReports() {
    const [search, setSearch] = useState('');

    const reports = [
        { id: 1, title: 'Fake Bank QR', reporter: 'Alice', date: '2025-04-15' },
        { id: 2, title: 'Phishing Page', reporter: 'John', date: '2025-04-14' },
    ];

    const filtered = reports.filter(r =>
        r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.reporter.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Fraud Reports</h1>

            <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search reports..."
                className="w-full p-2 mb-4 border rounded-md"
            />

            <table className="w-full bg-white rounded shadow overflow-hidden">
                <thead className="bg-gray-100 text-left">
                    <tr>
                        <th className="p-3">Title</th>
                        <th className="p-3">Reporter</th>
                        <th className="p-3">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.map(r => (
                        <tr key={r.id} className="border-t">
                            <td className="p-3">{r.title}</td>
                            <td className="p-3">{r.reporter}</td>
                            <td className="p-3">{r.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
