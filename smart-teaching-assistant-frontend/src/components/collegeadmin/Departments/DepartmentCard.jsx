export default function DepartmentCard({ department }) {
    return (
        <div className="bg-white rounded-2xl shadow p-6 border">
            <h3 className="font-bold text-lg">{department?.name || "Department"}</h3>
            <p className="text-gray-500 text-sm mt-1">{department?.code || ""}</p>
        </div>
    );
}
