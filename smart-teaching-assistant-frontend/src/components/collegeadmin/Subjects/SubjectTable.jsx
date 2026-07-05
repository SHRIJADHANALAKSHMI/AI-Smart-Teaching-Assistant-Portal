export default function SubjectTable({ subjects = [] }) {
    return (
        <div className="bg-white rounded-2xl shadow border overflow-hidden">
            <table className="w-full">
                <thead className="bg-slate-50">
                    <tr>
                        <th className="text-left p-4">Name</th>
                        <th className="text-left p-4">Code</th>
                        <th className="text-left p-4">Department</th>
                        <th className="text-left p-4">Professor</th>
                    </tr>
                </thead>
                <tbody>
                    {subjects.map((s, i) => (
                        <tr key={i} className="border-t">
                            <td className="p-4">{s.name}</td>
                            <td className="p-4">{s.code}</td>
                            <td className="p-4">{s.department}</td>
                            <td className="p-4">{s.professor}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
