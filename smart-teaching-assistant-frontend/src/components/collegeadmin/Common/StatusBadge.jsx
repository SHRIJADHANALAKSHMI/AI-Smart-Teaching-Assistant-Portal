import clsx from "clsx";
import {
  CheckCircle2,
  XCircle,
  Clock3,
  AlertCircle,
  Loader2,
} from "lucide-react";

const statusConfig = {
  Active: {
    bg: "bg-green-100",
    text: "text-green-700",
    icon: CheckCircle2,
  },

  Inactive: {
    bg: "bg-red-100",
    text: "text-red-700",
    icon: XCircle,
  },

  Pending: {
    bg: "bg-yellow-100",
    text: "text-yellow-700",
    icon: Clock3,
  },

  Approved: {
    bg: "bg-emerald-100",
    text: "text-emerald-700",
    icon: CheckCircle2,
  },

  Rejected: {
    bg: "bg-red-100",
    text: "text-red-700",
    icon: AlertCircle,
  },

  Processing: {
    bg: "bg-blue-100",
    text: "text-blue-700",
    icon: Loader2,
  },
};

export default function StatusBadge({ status }) {
  const config =
    statusConfig[status] || statusConfig.Pending;

  const Icon = config.icon;

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold",
        config.bg,
        config.text
      )}
    >
      <Icon size={16} />

      {status}
    </span>
  );
}

