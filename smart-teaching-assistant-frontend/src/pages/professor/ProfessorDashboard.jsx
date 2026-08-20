import { useEffect, useState } from "react";
import { Activity, BookOpen, Calendar, CheckCircle, Clock, Loader2, UploadCloud } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getDashboardStats } from "../../service/professorDashboardService";
import { getMySchedules } from "../../service/scheduleService";

export default function ProfessorDashboard() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [stats, setStats] = useState({ totalSubjects: 0, studentsImpacted: 0, aiGenerations: 0, pendingReviews: 0 });
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    useEffect(() => { Promise.all([getDashboardStats(), getMySchedules()]).then(([statData, scheduleData]) => { setStats(statData); setSchedules(scheduleData); }).catch((requestError) => setError(requestError.message || "Unable to load dashboard.")).finally(() => setLoading(false)); }, []);
    const cards = [["Subjects", stats.totalSubjects, BookOpen, "/professor/subjects"], ["AI-processed chapters", stats.aiGenerations, Activity, "/professor/subjects"], ["Pending tasks", stats.pendingReviews, Clock, "/professor/dashboard"]];
    return <section className="space-y-7"><header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><h1 className="text-3xl font-extrabold text-slate-900">Welcome, {user?.name || "Professor"}</h1><p className="mt-2 text-slate-500">Your dashboard is populated from the live workspace data.</p></div><button onClick={() => navigate("/professor/upload")} className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-bold text-white"><UploadCloud size={18} />Upload material</button></header>{error && <div className="rounded-xl bg-red-50 p-4 text-red-700">{error}</div>}<div className="grid gap-4 md:grid-cols-3">{cards.map(([title, value, Icon, path]) => <button key={title} onClick={() => navigate(path)} className="rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm hover:border-orange-300"><Icon className="text-orange-500" /><p className="mt-5 text-sm font-semibold text-slate-500">{title}</p><p className="mt-1 text-3xl font-extrabold text-slate-900">{loading ? <Loader2 className="animate-spin" /> : value}</p></button>)}</div><article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex items-center justify-between"><h2 className="text-lg font-bold">My schedule</h2><button onClick={() => navigate("/professor/subjects")} className="text-sm font-bold text-orange-600">View subjects</button></div>{loading ? <Loader2 className="mx-auto my-12 animate-spin text-orange-500" /> : schedules.length ? <ul className="mt-4 divide-y divide-slate-100">{schedules.map((schedule) => <li className="flex items-center gap-4 py-4" key={schedule.id}><Calendar className="text-slate-400" /><div className="flex-1"><p className="font-bold text-slate-900">{schedule.title}</p><p className="text-sm text-slate-500">{schedule.description}</p></div><span className="text-sm text-slate-500">{schedule.time}</span>{schedule.status === "completed" && <CheckCircle className="text-emerald-500" />}</li>)}</ul> : <p className="py-10 text-center text-slate-500">No scheduled work yet.</p>}</article></section>;
}
