export default function SubjectCard({ subject }) {
    return (
        <div className="bg-white rounded-2xl shadow p-6 border">
            <h3 className="font-bold text-lg">{subject?.name || "Subject"}</h3>
            <p className="text-gray-500 text-sm mt-1">{subject?.code || ""}</p>
        </div>
    );
}
