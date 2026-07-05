import { motion } from "framer-motion";
import { CreditCard, Check, Zap, AlertCircle } from "lucide-react";
import clsx from "clsx";

export default function Subscription() {
    const plans = [
        { name: "Starter", price: "$499/mo", tokens: "1M Tokens", active: false, features: ["Basic AI Notes", "Up to 50 Professors", "Standard Support"] },
        { name: "Enterprise Pro", price: "$999/mo", tokens: "Unlimited Tokens", active: true, features: ["Advanced AI Generation", "Unlimited Professors", "Dedicated Account Manager", "Priority API Access", "Custom Integrations"] },
        { name: "Custom Cloud", price: "Contact Us", tokens: "Custom Quota", active: false, features: ["On-Premise Deployment", "White-label Portal", "24/7 Phone Support"] }
    ];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        <CreditCard className="text-pink-500" /> Subscription & Billing
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Manage your college's API quota and platform subscription.</p>
                </div>
            </div>

            {/* Active Plan Banner */}
            <div className="bg-gradient-to-r from-slate-900 to-indigo-900 text-white rounded-3xl p-8 relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Active Plan
                        </div>
                        <h2 className="text-3xl font-extrabold mb-1">Enterprise Pro</h2>
                        <p className="text-indigo-200">Renews on August 15th, 2026 • 24 days remaining</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="bg-white/10 hover:bg-white/20 border border-white/20 transition px-6 py-3 rounded-xl font-semibold backdrop-blur-sm">View Invoices</button>
                        <button className="bg-white text-indigo-900 hover:bg-slate-100 transition px-6 py-3 rounded-xl font-bold shadow-lg flex items-center gap-2"><Zap size={18} /> Manage Quota</button>
                    </div>
                </div>
            </div>

            <h3 className="text-lg font-bold text-slate-800 dark:text-white px-2 mt-10">Available Plans</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan, i) => (
                    <div key={i} className={clsx("bg-white dark:bg-slate-900 p-8 rounded-3xl border-2 transition-all relative", plan.active ? "border-indigo-500 shadow-xl shadow-indigo-500/10 scale-105 z-10" : "border-slate-100 dark:border-slate-800 shadow-sm")}>
                        {plan.active && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-md">Current</div>}
                        <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-2 text-center">{plan.name}</h4>
                        <div className="my-6 text-center">
                            <span className="text-4xl font-extrabold text-slate-900 dark:text-white">{plan.price}</span>
                        </div>
                        <p className="text-center font-bold text-indigo-600 dark:text-indigo-400 text-sm mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">{plan.tokens}</p>

                        <ul className="space-y-4 mb-8 text-sm font-medium text-slate-600 dark:text-slate-400">
                            {plan.features.map((feature, j) => (
                                <li key={j} className="flex items-start gap-3">
                                    <Check size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <button className={clsx("w-full py-3 rounded-xl font-bold transition", plan.active ? "bg-slate-100 text-slate-400 cursor-not-allowed" : "bg-indigo-50 hover:bg-indigo-100 text-indigo-700")}>
                            {plan.active ? "Current Plan" : "Upgrade"}
                        </button>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
