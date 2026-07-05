import { LoaderCircle } from "lucide-react";

export default function LoadingSpinner({
  text = "Loading..."
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20">

      <LoaderCircle
        size={50}
        className="animate-spin text-indigo-600"
      />

      <p className="mt-4 text-gray-500">
        {text}
      </p>

    </div>
  );
}