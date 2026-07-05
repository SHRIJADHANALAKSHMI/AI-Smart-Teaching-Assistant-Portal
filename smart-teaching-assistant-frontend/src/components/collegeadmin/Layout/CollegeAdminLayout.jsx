import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import MobileSidebar from "./MobileSidebar";
import Footer from "./Footer";
import { CollegeAdminProvider } from "../../../context/CollegeAdminContext";

export default function CollegeAdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <CollegeAdminProvider>
      <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 selection:bg-blue-500/30 selection:text-blue-900 dark:selection:text-blue-100">
        {/* Background ambient accents for clean enterprise vibe */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-slate-50 dark:bg-slate-950">
          <div className="absolute top-0 w-full h-[350px] bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-900/10 pointer-events-none" />
        </div>

        <div className="hidden lg:block relative z-20">
          <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        </div>

        <MobileSidebar open={mobileOpen} setOpen={setMobileOpen} />

        <div className="flex flex-col flex-1 min-w-0 transition-all duration-300 relative z-10 h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
          <Navbar collapsed={collapsed} setCollapsed={setCollapsed} setMobileOpen={setMobileOpen} />

          <main className="flex-1 p-6 md:p-8 max-w-[1600px] w-full mx-auto relative z-10">
            <Outlet />
          </main>

          <Footer />
        </div>
      </div>
    </CollegeAdminProvider>
  );
}