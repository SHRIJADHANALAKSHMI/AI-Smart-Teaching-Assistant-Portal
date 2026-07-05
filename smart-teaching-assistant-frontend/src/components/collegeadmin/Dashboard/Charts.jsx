import { motion } from "framer-motion";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";

const barData = [
    { name: "CSE", subjects: 45, professors: 25 },
    { name: "ECE", subjects: 38, professors: 20 },
    { name: "MECH", subjects: 32, professors: 18 },
    { name: "CIVIL", subjects: 28, professors: 15 },
    { name: "EEE", subjects: 35, professors: 22 },
    { name: "IT", subjects: 40, professors: 23 },
];

const pieData = [
    { name: "Semester Reports", value: 45 },
    { name: "Activity Logs", value: 25 },
    { name: "Department Details", value: 20 },
    { name: "General Exports", value: 10 },
];

const COLORS = ["#1E3A8A", "#10B981", "#0EA5E9", "#F59E0B"];

export default function Charts() {
    return (
        <div className="grid lg:grid-cols-2 gap-6 w-full h-full">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-slate-800/50 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 flex flex-col"
            >
                <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Subject & Professor Distribution</h2>
                <div className="flex-1 min-h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={barData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                            <XAxis dataKey="name" tick={{ fill: '#64748B' }} tickLine={false} axisLine={false} />
                            <YAxis tick={{ fill: '#64748B' }} tickLine={false} axisLine={false} />
                            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                            <Bar dataKey="subjects" fill="#1E3A8A" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="professors" fill="#10B981" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white dark:bg-slate-800/50 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 flex flex-col"
            >
                <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Reports Generated Overview</h2>
                <div className="flex-1 min-h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={70}
                                outerRadius={100}
                                paddingAngle={5}
                                dataKey="value"
                                stroke="none"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>
        </div>
    );
}
