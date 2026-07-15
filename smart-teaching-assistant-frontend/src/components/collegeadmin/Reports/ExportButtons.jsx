export default function ExportButtons() {
    return (
        <div className="flex gap-3">
            <button className="bg-emerald-600 text-white px-4 py-2 rounded-[12px] font-bold shadow-sm hover:shadow-md hover:bg-emerald-700 transition">Export CSV</button>
            <button className="bg-orange-500 text-white px-4 py-2 rounded-[12px] font-bold shadow-sm hover:shadow-md hover:bg-orange-600 transition">Export PDF</button>
        </div>
    );
}
