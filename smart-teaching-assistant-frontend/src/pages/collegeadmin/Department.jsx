import { useMemo, useState } from "react";
import { Building2, Edit2, Loader2, Plus, Search, Trash2, X } from "lucide-react";
import { useCollegeAdmin } from "../../context/CollegeAdminContext";

export default function Department() {
    const { departments, subjects, professors, loading, error, addDepartment, updateDepartment, deleteDepartment } = useCollegeAdmin();
    const [search, setSearch] = useState("");
    const [editing, setEditing] = useState(null);
    const [name, setName] = useState("");
    const [saving, setSaving] = useState(false);
    const [actionError, setActionError] = useState("");
    const visibleDepartments = useMemo(() => departments.filter((department) => department.name.toLowerCase().includes(search.toLowerCase())), [departments, search]);

    const openCreate = () => { setEditing(null); setName(""); setActionError(""); };
    const openEdit = (department) => { setEditing(department); setName(department.name); setActionError(""); };
    const closeModal = () => { setEditing(undefined); setName(""); };
    const handleSave = async (event) => {
        event.preventDefault();
        setSaving(true); setActionError("");
        try {
            if (editing) await updateDepartment({ id: editing.id, name });
            else await addDepartment({ name });
            closeModal();
        } catch (requestError) { setActionError(requestError.message || "Unable to save department."); }
        finally { setSaving(false); }
    };
    const handleDelete = async (department) => {
        if (!window.confirm(`Delete ${department.name}? Its subjects must be removed first.`)) return;
        try { await deleteDepartment(department.id); } catch (requestError) { setActionError(requestError.message || "Unable to delete department."); }
    };
    const modalOpen = editing !== undefined;

    return <section className="space-y-6">
        <header className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div><h1 className="flex items-center gap-3 text-3xl font-extrabold text-slate-900"><Building2 className="text-emerald-600" />Departments</h1><p className="mt-2 text-slate-500">Departments are loaded from your college workspace.</p></div>
            <button onClick={openCreate} className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-bold text-white hover:bg-emerald-700"><Plus size={18} />Add department</button>
        </header>
        {(error || actionError) && <div className="rounded-xl bg-red-50 p-4 text-red-700">{actionError || error}</div>}
        <div className="relative max-w-lg"><Search className="absolute left-3 top-3 text-slate-400" size={18} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search departments" className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4" /></div>
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left"><thead className="bg-slate-50 text-sm text-slate-500"><tr><th className="px-6 py-4">Department</th><th className="px-6 py-4">Subjects</th><th className="px-6 py-4">Invites</th><th className="px-6 py-4">Status</th><th className="px-6 py-4 text-right">Actions</th></tr></thead>
                <tbody>{loading ? <tr><td colSpan="5" className="p-10 text-center"><Loader2 className="mx-auto animate-spin text-emerald-600" /></td></tr> : visibleDepartments.map((department) => <tr key={department.id} className="border-t border-slate-100"><td className="px-6 py-4 font-bold text-slate-900">{department.name}</td><td className="px-6 py-4">{subjects.filter((subject) => subject.departmentId === department.id).length}</td><td className="px-6 py-4">{professors.filter((invite) => invite.departmentId === department.id).length}</td><td className="px-6 py-4"><span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">{department.status}</span></td><td className="px-6 py-4"><div className="flex justify-end gap-2"><button aria-label={`Edit ${department.name}`} onClick={() => openEdit(department)} className="rounded-lg p-2 text-amber-600 hover:bg-amber-50"><Edit2 size={17} /></button><button aria-label={`Delete ${department.name}`} onClick={() => handleDelete(department)} className="rounded-lg p-2 text-rose-600 hover:bg-rose-50"><Trash2 size={17} /></button></div></td></tr>)}{!loading && visibleDepartments.length === 0 && <tr><td colSpan="5" className="p-10 text-center text-slate-500">No departments found.</td></tr>}</tbody>
            </table>
        </div>
        {modalOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 p-4"><form onSubmit={handleSave} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"><div className="flex items-center justify-between"><h2 className="text-xl font-bold">{editing ? "Edit department" : "Add department"}</h2><button type="button" onClick={closeModal}><X /></button></div>{actionError && <p className="mt-4 text-sm text-red-600">{actionError}</p>}<label className="mt-5 block text-sm font-semibold">Department name<input required value={name} onChange={(event) => setName(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 p-3" /></label><button disabled={saving} className="mt-6 w-full rounded-xl bg-emerald-600 py-3 font-bold text-white disabled:opacity-60">{saving ? "Saving…" : "Save"}</button></form></div>}
    </section>;
}
