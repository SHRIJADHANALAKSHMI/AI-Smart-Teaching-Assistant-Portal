export default function Footer() {
  return (
    <footer className="border-t bg-white px-8 py-4">

      <div className="flex flex-col md:flex-row justify-between items-center">

        <p className="text-sm text-gray-500">
          © 2026 AI Smart Teaching Assistant Portal.
        </p>

        <div className="flex gap-6 mt-2 md:mt-0">

          <button className="text-gray-500 hover:text-indigo-600">
            Privacy
          </button>

          <button className="text-gray-500 hover:text-indigo-600">
            Terms
          </button>

          <button className="text-gray-500 hover:text-indigo-600">
            Support
          </button>

        </div>

      </div>

    </footer>
  );
}