import { motion } from "framer-motion";
import { Mail, Clock, CheckCircle, XCircle } from "lucide-react";

const invites = [
    { name: "Dr. Anitha Kumar", email: "anitha@college.edu", status: "Pending", time: "2 hours ago" },
    { name: "Prof. Rajesh S", email: "rajesh@college.edu", status: "Accepted", time: "1 day ago" },
    { name: "Dr. Meena R", email: "meena@college.edu", status: "Pending", time: "3 days ago" },
    { name: "Prof. Karthik V", email: "karthik@college.edu", status: "Expired", time: "1 week ago" },
];

export default function PendingInvites() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-3xl shadow-lg p-6 border"
        >
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Mail className="text-orange-600" size={22} />
                </div>
                <h2 className="text-xl font-bold text-slate-800">Pending Invites</h2>
            </div>

            <div className="space-y-3">
                {invites.map((invite, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition">
                        <div>
                            <h4 className="font-semibold text-slate-800">{invite.name}</h4>
                            <p className="text-sm text-gray-500">{invite.email}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            {invite.status === "Pending" && <Clock size={16} className="text-yellow-500" />}
                            {invite.status === "Accepted" && <CheckCircle size={16} className="text-green-500" />}
                            {invite.status === "Expired" && <XCircle size={16} className="text-red-500" />}
                            <span className={`text-sm font-medium ${invite.status === "Pending" ? "text-yellow-600" :
                                    invite.status === "Accepted" ? "text-green-600" : "text-red-600"
                                }`}>
                                {invite.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
