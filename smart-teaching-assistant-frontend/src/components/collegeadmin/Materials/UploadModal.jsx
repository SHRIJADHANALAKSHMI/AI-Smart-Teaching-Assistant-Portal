export default function UploadModal({ isOpen, onClose }) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 w-full max-w-md">
                <h3 className="font-bold text-xl mb-4">Upload Material</h3>
                <p className="text-gray-500 mb-4">Upload feature coming soon.</p>
                <button onClick={onClose} className="bg-indigo-600 text-white px-6 py-2 rounded-xl">Close</button>
            </div>
        </div>
    );
}
