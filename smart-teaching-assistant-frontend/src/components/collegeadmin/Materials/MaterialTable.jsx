export default function MaterialTable({ materials = [] }) {
    return (
        <div className="bg-white rounded-2xl shadow border overflow-hidden">
            <table className="w-full">
                <thead className="bg-slate-50">
                    <tr>
                        <th className="text-left p-4">Title</th>
                        <th className="text-left p-4">Subject</th>
                        <th className="text-left p-4">Type</th>
                        <th className="text-left p-4">Size</th>
                    </tr>
                </thead>
                <tbody>
                    {materials.map((m, i) => (
                        <tr key={i} className="border-t">
                            <td className="p-4">{m.title}</td>
                            <td className="p-4">{m.subject}</td>
                            <td className="p-4">{m.type}</td>
                            <td className="p-4">{m.size}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
