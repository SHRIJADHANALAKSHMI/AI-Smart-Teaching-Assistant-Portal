export default function ProfessorTable({ professors = [] }) {
    return (
        <div className="bg-white rounded-2xl shadow border overflow-hidden">
            <table className="w-full">
                <thead className="bg-slate-50">
                    <tr>
                        <th className="text-left p-4">Name</th>
                        <th className="text-left p-4">Email</th>
                        <th className="text-left p-4">Department</th>
                        <th className="text-left p-4">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {professors.map((p, i) => (
                        <tr key={i} className="border-t">
                            <td className="p-4">{p.name}</td>
                            <td className="p-4">{p.email}</td>
                            <td className="p-4">{p.department}</td>
                            <td className="p-4">{p.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
