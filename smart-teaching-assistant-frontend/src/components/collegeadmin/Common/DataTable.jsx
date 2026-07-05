export default function DataTable({ columns = [], data = [] }) {
    return (
        <div className="bg-white rounded-2xl shadow-lg border overflow-hidden">
            <table className="w-full">
                <thead className="bg-slate-50">
                    <tr>
                        {columns.map((col, i) => (
                            <th key={i} className="text-left p-4 font-semibold text-slate-700">{col.header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, i) => (
                        <tr key={i} className="border-t hover:bg-slate-50">
                            {columns.map((col, j) => (
                                <td key={j} className="p-4 text-gray-600">{col.render ? col.render(row) : row[col.key]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
