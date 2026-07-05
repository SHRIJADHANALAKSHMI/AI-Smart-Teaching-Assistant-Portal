export default function ProfessorDashboard() {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Professor Dashboard</h1>
                <p className="text-gray-600 mb-8">Welcome to your teaching assistant dashboard.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="font-semibold text-lg">My Subjects</h3>
                        <p className="text-3xl font-bold text-blue-600 mt-2">5</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="font-semibold text-lg">Materials Uploaded</h3>
                        <p className="text-3xl font-bold text-green-600 mt-2">23</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="font-semibold text-lg">AI Notes Generated</h3>
                        <p className="text-3xl font-bold text-purple-600 mt-2">47</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
