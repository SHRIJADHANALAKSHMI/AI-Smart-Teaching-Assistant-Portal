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

// Enterprise Accent Colors for Charts
const COLORS = ["#10B981", "#8B5CF6", "#F97316", "#F43F5E"];

export default function Charts() {
    return (
        <div className="grid lg:grid-cols-2 gap-8 w-full h-full">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-[24px] shadow-sm border border-[#E5E7EB] p-8 flex flex-col group hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all"
            >
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-[14px] font-extrabold text-slate-400 uppercase tracking-widest">Subject &amp; Professor Dist.</h2>
                </div>
                <div className="flex-1 min-h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={barData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" opacity={0.5} />
                            <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 13, fontWeight: 700 }} tickLine={false} axisLine={false} dy={10} />
                            <YAxis tick={{ fill: '#64748b', fontSize: 13, fontWeight: 700 }} tickLine={false} axisLine={false} dx={-10} />
                            <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '16px', border: '1px solid #E5E7EB', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 'bold', color: '#0f172a' }} />
                            <Bar dataKey="subjects" fill="#10B981" radius={[8, 8, 0, 0]} barSize={24} />
                            <Bar dataKey="professors" fill="#8B5CF6" radius={[8, 8, 0, 0]} barSize={24} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-[24px] shadow-sm border border-[#E5E7EB] p-8 flex flex-col group hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-50/80 to-transparent rounded-bl-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="flex justify-between items-center mb-8 relative z-10">
                    <h2 className="text-[14px] font-extrabold text-slate-400 uppercase tracking-widest">Reports Generated</h2>
                </div>
                <div className="flex-1 min-h-[300px] relative z-10">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={85}
                                outerRadius={125}
                                paddingAngle={6}
                                dataKey="value"
                                stroke="none"
                                labelLine={false}
                                label={({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
                                    const RADIAN = Math.PI / 180;
                                    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                                    const y = cy + radius * Math.sin(-midAngle * RADIAN);
                                    return (
                                        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={13} fontWeight="bold">
                                            {`${value}%`}
                                        </text>
                                    );
                                }}
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className="hover:opacity-80 transition-opacity" cursor="pointer" />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>
        </div>
    );
}
