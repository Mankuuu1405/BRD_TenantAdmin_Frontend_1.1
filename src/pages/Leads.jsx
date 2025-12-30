import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import CampaignManager from "../components/CampaignManager.jsx";
import PipelineManager from "../components/PipelineManager.jsx";
import {
  MegaphoneIcon,
  FunnelIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

export default function Leads() {
  const [activeModule, setActiveModule] = useState("PIPELINE");
  const navigate = useNavigate();

  return (
    // Removed 'flex' from here because Sidebar is fixed.
    // We just need a container for the page background.
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* 1. GLOBAL APP SIDEBAR (Fixed Position) */}
      <Sidebar />

      {/* 2. MAIN CONTENT AREA (Offset by Sidebar Width) */}
      {/* Ensure 'ml-64' matches Sidebar width exactly. No gaps. */}
      <div className="flex flex-col h-screen overflow-hidden relative">
        {/* UNIFIED HEADER */}
        {/* Removed 'z-20' unless overlap is needed. Border-b ensures separation. */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-6">
            <h1 className="text-xl font-black text-slate-900 tracking-tight">
              Growth & Sales Engine
            </h1>

            {/* MODULE SWITCHER */}
            <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
              <button
                onClick={() => setActiveModule("CAMPAIGNS")}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wide transition-all ${
                  activeModule === "CAMPAIGNS"
                    ? "bg-white text-blue-600 shadow-sm ring-1 ring-slate-200"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <MegaphoneIcon className="h-4 w-4" /> Acquisition
              </button>
              <button
                onClick={() => setActiveModule("PIPELINE")}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wide transition-all ${
                  activeModule === "PIPELINE"
                    ? "bg-white text-emerald-600 shadow-sm ring-1 ring-slate-200"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <FunnelIcon className="h-4 w-4" /> Pipeline
              </button>
            </div>
          </div>

          {/* CONTEXTUAL INFO & ADD LEAD BUTTON */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/leads/new")}
              className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition"
            >
              + Add Lead
            </button>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
              {activeModule === "CAMPAIGNS" ? (
                <>
                  Running 4 Active Campaigns{" "}
                  <ArrowRightIcon className="h-3 w-3" /> Generating Leads
                </>
              ) : (
                <>
                  Processing 482 Leads <ArrowRightIcon className="h-3 w-3" />{" "}
                  Closing Deals
                </>
              )}
            </div>
          </div>
        </header>

        {/* 3. DYNAMIC CONTENT RENDER */}
        <div className="flex-1 overflow-hidden relative">
          {activeModule === "CAMPAIGNS" ? (
            <CampaignManager />
          ) : (
            <PipelineManager />
          )}
        </div>
      </div>
    </div>
  );
}
