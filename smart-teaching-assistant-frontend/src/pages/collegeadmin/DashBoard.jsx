import { BookOpen, Building2, GraduationCap, Loader2, Mail, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCollegeAdmin } from "../../context/CollegeAdminContext";

export default function DashBoard() {
    const navigate = useNavigate();
    const { profile, stats, loading, error, departments, professors } = useCollegeAdmin();
    const cards = [
        ["Departments", stats.totalDepartments, Building2, "/collegeadmin/departments"],
        ["Subjects", stats.totalSubjects, BookOpen, "/collegeadmin/subjects"],
        ["Active professors", stats.totalProfessors, GraduationCap, "/collegeadmin/professors"],
        ["Pending invitations", stats.pendingInvites, Mail, "/collegeadmin/professors"]
    ];
    return <section className="space-y-7"><header className="rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white shadow-lg"><h1 className="text-3xl font-extrabold">Welcome, {profile.name}</h1><p className="mt-2 text-emerald-50">Live data from the Smart Teaching Assistant backend.</p><button onClick={() => navigate("/collegeadmin/departments")} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 font-bold text-emerald-700"><Plus size={17} />Manage departments</button></header>{error && <div className="rounded-xl bg-red-50 p-4 text-red-700">{error}</div>}<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{cards.map(([title, value, Icon, path]) => <button key={title} onClick={() => navigate(path)} className="rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm hover:border-emerald-300 hover:shadow"><Icon className="text-emerald-600" /><p className="mt-5 text-sm font-semibold text-slate-500">{title}</p><p className="mt-1 text-3xl font-extrabold text-slate-900">{loading ? <Loader2 className="inline animate-spin" /> : value}</p></button>)}</div><div className="grid gap-6 lg:grid-cols-2"><article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h2 className="text-lg font-bold">Departments</h2><ul className="mt-4 space-y-3">{departments.slice(0, 5).map((department) => <li key={department.id} className="flex justify-between border-b border-slate-100 pb-3"><span>{department.name}</span><span className="text-sm font-bold text-emerald-700">{department.status}</span></li>)}{!loading && !departments.length && <li className="text-slate-500">No departments yet.</li>}</ul></article><article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h2 className="text-lg font-bold">Recent invitations</h2><ul className="mt-4 space-y-3">{professors.slice(0, 5).map((invite) => <li key={invite.id} className="border-b border-slate-100 pb-3"><p className="font-semibold">{invite.name}</p><p className="text-sm text-slate-500">{invite.email} · {invite.status}</p></li>)}{!loading && !professors.length && <li className="text-slate-500">No invitations yet.</li>}</ul></article></div></section>;
}
