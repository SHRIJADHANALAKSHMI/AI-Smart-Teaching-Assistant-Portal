export default function ReportTable({ reports = [] }) {
    return (
        <div className="bg-white rounded-2xl shadow border overflow-hidden">
            <table className="w-full">
                <thead className="bg-slate-50">
                    <tr>
                        <th className="text-left p-4">Report</th>
                        <th className="text-left p-4">Type</th>
                        <th className="text-left p-4">Date</th>
                        <th className="text-left p-4">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map((r, i) => (
                        <tr key={i} className="border-t">
                            <td className="p-4">{r.title}</td>
                            <td className="p-4">{r.type}</td>
                            <td className="p-4">{r.date}</td>
                            <td className="p-4">{r.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
