export default function LoadingSpinner() {
    return (
        <div className="flex justify-center items-center p-8">
            <div className="h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
}
