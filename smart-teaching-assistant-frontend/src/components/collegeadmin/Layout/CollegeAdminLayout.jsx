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
      <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-slate-900 selection:bg-emerald-500/30 selection:text-emerald-900">

        {/* Soft background accents for enterprise feel */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-emerald-100/40 rounded-full blur-[120px]" />
          <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-orange-100/20 rounded-full blur-[120px]" />
        </div>

        <div className="hidden lg:block relative z-20">
          <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        </div>

        <MobileSidebar open={mobileOpen} setOpen={setMobileOpen} />

        <div className="flex flex-col flex-1 min-w-0 transition-all duration-300 relative z-10 h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200">
          <Navbar collapsed={collapsed} setCollapsed={setCollapsed} setMobileOpen={setMobileOpen} />

          <main className="flex-1 p-6 md:p-10 max-w-[1600px] w-full mx-auto relative z-10">
            <Outlet />
          </main>

          <Footer />
        </div>
      </div>
    </CollegeAdminProvider>
  );
}