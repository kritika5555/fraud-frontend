// pages/admin/Users.jsx
export default function Users() {
    const users = [
        { id: 1, name: 'Alice Doe', email: 'alice@example.com' },
        { id: 2, name: 'Bob Smith', email: 'bob@example.com' },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Users</h1>
            <table className="w-full bg-white rounded shadow overflow-hidden">
                <thead className="bg-gray-100 text-left">
                    <tr>
                        <th className="p-3">Name</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u => (
                        <tr key={u.id} className="border-t">
                            <td className="p-3">{u.name}</td>
                            <td className="p-3">{u.email}</td>
                            <td className="p-3 space-x-2">
                                <button className="text-blue-600 hover:underline">Edit</button>
                                <button className="text-red-600 hover:underline">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
