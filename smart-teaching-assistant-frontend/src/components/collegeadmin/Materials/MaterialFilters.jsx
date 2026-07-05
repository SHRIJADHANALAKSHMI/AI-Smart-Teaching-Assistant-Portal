export default function MaterialFilters({ onFilter }) {
    return (
        <div className="flex gap-4 mb-6">
            <select className="border rounded-xl px-4 py-2">
                <option>All Types</option>
                <option>PDF</option>
                <option>PPTX</option>
                <option>DOCX</option>
            </select>
            <select className="border rounded-xl px-4 py-2">
                <option>All Departments</option>
                <option>CSE</option>
                <option>ECE</option>
                <option>MECH</option>
            </select>
        </div>
    );
}
