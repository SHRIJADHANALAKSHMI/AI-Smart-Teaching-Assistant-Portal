import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex text-slate-800">
            {/* LEFT SIDE */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-gradient-to-br from-purple-600 via-fuchsia-500 to-pink-500 p-12 text-white relative overflow-hidden">
                {/* Decorative background blobs */}
                <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-black/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="relative z-10 w-full max-w-md flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm mb-6 border border-white/20 shadow-xl">
                        <Sparkles size={32} className="text-white" />
                    </div>
                    <h1 className="text-5xl font-extrabold mb-4 tracking-tight drop-shadow-md">
                        Welcome Back
                    </h1>
                    <p className="text-lg text-white/90 mb-10 font-medium max-w-sm">
                        Empower your institution with an intelligent, enterprise-grade AI teaching assistant.
                    </p>

                    <button
                        onClick={() => navigate('/login')}
                        className="w-full bg-white text-purple-700 py-4 px-8 rounded-xl font-bold text-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:-translate-y-1 transition-all"
                    >
                        SIGN IN
                    </button>
                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="hidden lg:flex w-1/2 bg-white flex-col justify-center items-center p-12 relative overflow-hidden">
                <div className="w-full max-w-lg text-center flex flex-col items-center">
                    <div className="w-full h-80 bg-slate-50 border border-slate-100 rounded-3xl shadow-sm flex items-center justify-center mb-10 overflow-hidden relative group">
                        {/* Minimal mockup illustration */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50">
                            <div className="w-3/4 h-3/4 bg-white shadow-xl rounded-2xl border border-slate-200 flex flex-col overflow-hidden">
                                <div className="h-6 border-b border-slate-100 bg-slate-50 flex items-center gap-1.5 px-3">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                                </div>
                                <div className="flex-1 p-4 flex gap-4">
                                    <div className="w-16 h-full bg-slate-100 rounded-lg"></div>
                                    <div className="flex-1 flex flex-col gap-3">
                                        <div className="w-1/2 h-4 bg-slate-200 rounded-full"></div>
                                        <div className="w-full h-24 bg-slate-50 rounded-lg border border-slate-100"></div>
                                        <div className="w-3/4 h-16 bg-slate-50 rounded-lg border border-slate-100"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold text-slate-800 mb-4 tracking-tight">Access Your Workspace</h2>
                    <p className="text-slate-500 mb-8 max-w-md">
                        New to the portal? Create an account to experience the next evolution in academic management.
                    </p>

                    <div className="flex gap-4 w-full max-w-xs justify-center">
                        <button
                            onClick={() => navigate('/login')}
                            className="px-6 py-3 bg-slate-900 text-white font-bold rounded-xl shadow-sm hover:bg-slate-800 transition flex-1"
                        >
                            Login
                        </button>
                        <button
                            onClick={() => navigate('/register')}
                            className="px-6 py-3 bg-white text-slate-700 font-bold border border-slate-200 rounded-xl shadow-sm hover:bg-slate-50 transition flex-1"
                        >
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
