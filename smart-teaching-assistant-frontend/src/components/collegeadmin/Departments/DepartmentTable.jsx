export default function DepartmentTable({ departments = [] }) {
    return (
        <div className="bg-white rounded-2xl shadow border overflow-hidden">
            <table className="w-full">
                <thead className="bg-slate-50">
                    <tr>
                        <th className="text-left p-4">Name</th>
                        <th className="text-left p-4">Code</th>
                        <th className="text-left p-4">HOD</th>
                        <th className="text-left p-4">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {departments.map((dept, i) => (
                        <tr key={i} className="border-t">
                            <td className="p-4">{dept.name}</td>
                            <td className="p-4">{dept.code}</td>
                            <td className="p-4">{dept.hod}</td>
                            <td className="p-4">{dept.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
