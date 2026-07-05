export default function ExportButtons() {
    return (
        <div className="flex gap-3">
            <button className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700">Export CSV</button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700">Export PDF</button>
        </div>
    );
}
