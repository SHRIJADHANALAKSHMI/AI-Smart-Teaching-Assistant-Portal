import { useState } from "react";
import { Bell, ChevronDown, LogOut, Search, Settings, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export default function ProfessorHeader() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [open, setOpen] = useState(false);
    const initials = user?.name?.split(" ").map((part) => part[0]).join("").slice(0, 2) || "P";
    const signOut = () => { logout(); navigate("/login", { replace: true }); };
    return <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-6"><div className="relative hidden max-w-xl flex-1 md:block"><Search size={16} className="absolute left-3 top-3 text-slate-400"/><input onKeyDown={(event) => event.key === "Enter" && navigate("/professor/subjects")} placeholder="Search subjects" className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4" /></div><div className="ml-auto flex items-center gap-4"><button onClick={() => navigate("/professor/ai-history")} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"><Bell size={20} /></button><div className="relative"><button onClick={() => setOpen(!open)} className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-700">{initials}</span><span className="hidden text-left md:block"><span className="block font-semibold text-slate-900">{user?.name || "Professor"}</span><span className="block text-xs text-slate-500">Professor</span></span><ChevronDown size={16} className="text-slate-400" /></button>{open && <div className="absolute right-0 top-12 z-50 w-44 rounded-xl border border-slate-200 bg-white p-2 shadow-lg"><button onClick={() => navigate("/professor/profile")} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left hover:bg-slate-50"><User size={16}/>Profile</button><button onClick={() => navigate("/professor/settings")} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left hover:bg-slate-50"><Settings size={16}/>Settings</button><button onClick={signOut} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-rose-600 hover:bg-rose-50"><LogOut size={16}/>Sign out</button></div>}</div></div></header>;
}
