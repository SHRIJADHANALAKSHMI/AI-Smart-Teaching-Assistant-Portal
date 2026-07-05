export default function ProfessorCard({ professor }) {
    return (
        <div className="bg-white rounded-2xl shadow p-6 border">
            <h3 className="font-bold text-lg">{professor?.name || "Professor"}</h3>
            <p className="text-gray-500 text-sm mt-1">{professor?.email || ""}</p>
        </div>
    );
}
