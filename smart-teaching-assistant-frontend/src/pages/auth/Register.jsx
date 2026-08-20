import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getProfessorInvite, registerProfessor } from "../../service/authService";

export default function Register() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get("token");
    const [invite, setInvite] = useState(null);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(Boolean(token));
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!token) return;
        getProfessorInvite(token)
            .then(setInvite)
            .catch((requestError) => setError(requestError.message || "This invitation is not valid."))
            .finally(() => setLoading(false));
    }, [token]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        setSaving(true);
        try {
            await registerProfessor(token, password);
            navigate("/login", { replace: true, state: { message: "Account activated. Sign in with your new password." } });
        } catch (requestError) {
            setError(requestError.message || "Unable to activate your account.");
        } finally {
            setSaving(false);
        }
    };

    if (!token) {
        return <Page><h2 className="text-2xl font-extrabold text-slate-900">Registration is invitation-only</h2><p className="mt-3 text-slate-600">Ask your college administrator to send a professor invitation, then open the link from that email.</p><Link to="/login" className="mt-6 inline-block font-bold text-purple-600">Back to sign in</Link></Page>;
    }

    return <Page>
        <h2 className="text-2xl font-extrabold text-slate-900">Activate your professor account</h2>
        {loading && <p className="mt-4 text-slate-600">Checking invitation…</p>}
        {error && <div className="mt-4 rounded-xl bg-red-50 p-3 text-sm font-medium text-red-600">{error}</div>}
        {invite && <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
            <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700"><p className="font-bold">{invite.name}</p><p>{invite.email}</p></div>
            <label className="block text-sm font-semibold text-slate-700">Password<input minLength="6" required type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 block w-full rounded-xl border border-slate-300 px-4 py-3" /></label>
            <label className="block text-sm font-semibold text-slate-700">Confirm password<input minLength="6" required type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="mt-2 block w-full rounded-xl border border-slate-300 px-4 py-3" /></label>
            <button disabled={saving} className="w-full rounded-xl bg-purple-600 py-3 font-bold text-white disabled:opacity-60">{saving ? "Activating…" : "Activate account"}</button>
        </form>}
    </Page>;
}

function Page({ children }) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4"><div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">{children}</div></div>;
}
