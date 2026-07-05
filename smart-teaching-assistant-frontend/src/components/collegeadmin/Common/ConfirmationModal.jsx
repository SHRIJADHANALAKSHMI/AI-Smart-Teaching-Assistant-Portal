import { motion, AnimatePresence } from "framer-motion";

export default function ConfirmationModal({
  open,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) {
  return (
    <AnimatePresence>

      {open && (

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
        >

          <motion.div
            initial={{ scale: .8 }}
            animate={{ scale: 1 }}
            exit={{ scale: .8 }}
            className="bg-white rounded-3xl w-[420px] p-8 shadow-2xl"
          >

            <h2 className="text-2xl font-bold">

              {title}

            </h2>

            <p className="mt-4 text-gray-500">

              {message}

            </p>

            <div className="flex justify-end gap-4 mt-8">

              <button
                onClick={onCancel}
                className="px-5 py-2 rounded-xl border"
              >
                {cancelText}
              </button>

              <button
                onClick={onConfirm}
                className="px-5 py-2 rounded-xl bg-red-600 text-white"
              >
                {confirmText}
              </button>

            </div>

          </motion.div>

        </motion.div>

      )}

    </AnimatePresence>
  );
}