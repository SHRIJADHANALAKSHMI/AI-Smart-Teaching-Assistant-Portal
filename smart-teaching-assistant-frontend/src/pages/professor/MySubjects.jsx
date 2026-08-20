import { useEffect, useMemo, useState } from "react";
import { BookOpen, Loader2, Plus, Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createSubject } from "../../service/subjectService";
import { getProfessorSubjects } from "../../service/professorService";
import { getCurrentUser } from "../../service/authService";

export default function MySubjects() {
    const navigate = useNavigate();
    const [subjects, setSubjects] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [name, setName] = useState("");
    const [saving, setSaving] = useState(false);
    const refresh = async () => { setLoading(true); setError(""); try { setSubjects(await getProfessorSubjects()); } catch (requestError) { setError(requestError.message || "Unable to load subjects."); } finally { setLoading(false); } };
    useEffect(() => { refresh(); }, []);
    const visibleSubjects = useMemo(() => subjects.filter((subject) => subject.name.toLowerCase().includes(search.toLowerCase())), [subjects, search]);
    const createWorkspace = async (event) => { event.preventDefault(); const departmentId = getCurrentUser()?.departmentId; if (!departmentId) { setError("Your account does not have a department assignment."); return; } setSaving(true); setError(""); try { const created = await createSubject(departmentId, { name }); setSubjects((current) => [created, ...current]); setName(""); setModalOpen(false); } catch (requestError) { setError(requestError.message || "Unable to create subject."); } finally { setSaving(false); } };
    return <section className="space-y-7"><header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><h1 className="text-3xl font-extrabold text-slate-900">My subjects</h1><p className="mt-2 text-slate-500">Your department’s live subject catalog and workspaces.</p></div><button onClick={() => setModalOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-bold text-white hover:bg-orange-600"><Plus size={18} />Create subject</button></header>{error && <div className="rounded-xl bg-red-50 p-4 text-red-700">{error}</div>}<div className="relative max-w-lg"><Search size={18} className="absolute left-3 top-3 text-slate-400"/><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search subjects" className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4" /></div>{loading ? <div className="p-12"><Loader2 className="mx-auto animate-spin text-orange-500" /></div> : <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{visibleSubjects.map((subject) => <button key={subject.id} onClick={() => navigate(`/professor/workspace/${subject.id}/overview`)} className="rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:border-orange-300 hover:shadow"><BookOpen className="text-orange-500" /><h2 className="mt-5 text-lg font-bold text-slate-900">{subject.name}</h2><p className="mt-2 text-sm text-slate-500">Status: {subject.status}</p><span className="mt-6 inline-block font-bold text-orange-600">Open workspace →</span></button>)}{!visibleSubjects.length && <p className="rounded-2xl border border-dashed p-12 text-center text-slate-500 md:col-span-2 xl:col-span-3">No subjects found.</p>}</div>}{modalOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 p-4"><form onSubmit={createWorkspace} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"><div className="flex items-center justify-between"><h2 className="text-xl font-bold">Create subject</h2><button type="button" onClick={() => setModalOpen(false)}><X /></button></div><label className="mt-5 block text-sm font-semibold">Subject name<input required value={name} onChange={(event) => setName(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 p-3" /></label><button disabled={saving} className="mt-6 w-full rounded-xl bg-orange-500 py-3 font-bold text-white disabled:opacity-60">{saving ? "Creating…" : "Create workspace"}</button></form></div>}</section>;
}
