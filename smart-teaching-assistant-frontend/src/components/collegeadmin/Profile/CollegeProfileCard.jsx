export default function CollegeProfileCard({ college }) {
    return (
        <div className="bg-white rounded-2xl shadow p-6 border">
            <h3 className="font-bold text-lg">{college?.name || "College"}</h3>
            <p className="text-gray-500 text-sm mt-1">{college?.location || ""}</p>
        </div>
    );
}
