import React from "react";
import { BookOpen, Map, HelpCircle, FileText, Settings, Compass, ChevronRight } from "lucide-react";

interface WorkshopHeaderProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  organizationName: string;
  setOrganizationName: (name: string) => void;
  industrySector: string;
  setIndustrySector: (sector: string) => void;
  audienceType: string;
  setAudienceType: (type: string) => void;
  onReset: () => void;
}

export default function WorkshopHeader({
  currentStep,
  setCurrentStep,
  organizationName,
  setOrganizationName,
  industrySector,
  setIndustrySector,
  audienceType,
  setAudienceType,
  onReset
}: WorkshopHeaderProps) {
  const steps = [
    { num: 1, label: "Choose Domain", icon: Compass, badge: "Selection" },
    { num: 2, label: "Repeating Tasks", icon: BookOpen, badge: "Organizational Review" },
    { num: 3, label: "Match AI Capabilities", icon: Settings, badge: "Functional Fit" },
    { num: 4, label: "Decide Priority", icon: Map, badge: "Implementation Plan" }
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      {/* Top Meta info */}
      <div className="bg-slate-50 px-4 sm:px-6 py-2 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
          <span className="inline-block w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
          <span>LOCATION: ESG AI AGENT DESIGN LAB</span>
          <span className="text-slate-350">|</span>
          <span>MODULE: ACTIVE STRATEGY BLUEPRINT</span>
        </div>
        <div className="flex gap-4 items-center">
          <select
            id="role-select"
            value={audienceType}
            onChange={(e) => setAudienceType(e.target.value)}
            className="text-[11px] font-medium bg-white border border-slate-200 rounded-md px-2 py-1 text-slate-600 focus:outline-hidden focus:border-emerald-500"
          >
            <option value="Student">Audience: Student / Academic</option>
            <option value="Manager">Audience: Corporate ESG Manager</option>
            <option value="Consultant">Audience: ESG Consultant</option>
            <option value="AI Designer">Audience: AI Product Designer</option>
          </select>
          <button
            onClick={onReset}
            className="text-[11px] font-bold text-red-650 hover:text-red-700 hover:underline cursor-pointer transition-all"
          >
            Reset Workshop Data
          </button>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 px-2.5 bg-emerald-800 text-white font-display font-extrabold text-sm rounded-md tracking-wider">
              ESG WORKSHOP
            </span>
            <span className="text-xs text-slate-405 font-bold uppercase tracking-widest font-mono">
              MVP STRATEGY v1.2
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-display tracking-tight leading-none mt-1">
            ESG AI Agent Design Workshop: Organization Domain Map
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-3xl leading-relaxed">
            Translate continuous organizational pain points into prioritized AI functions. Design sustainable architecture tailored for <span className="font-semibold text-slate-700">{organizationName || "Your Organization"}</span> ({industrySector || "General Sector"}).
          </p>
        </div>

        {/* Inline editable org settings */}
        <div className="flex flex-wrap items-center gap-3 bg-slate-50/50 p-2.5 border border-slate-100 rounded-xl max-w-md shrink-0">
          <div className="space-y-1">
            <label className="block text-[9px] font-bold text-slate-450 uppercase leading-none font-mono">Organization Name</label>
            <input
              type="text"
              id="org-name-input"
              value={organizationName}
              onChange={(e) => setOrganizationName(e.target.value)}
              placeholder="e.g., Acme Corp"
              className="px-2 py-1 bg-white border border-slate-200 rounded-md text-xs font-semibold text-slate-800 focus:outline-hidden focus:border-emerald-500 max-w-[130px]"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-[9px] font-bold text-slate-450 uppercase leading-none font-mono">Industry Sector</label>
            <select
              id="industry-select"
              value={industrySector}
              onChange={(e) => setIndustrySector(e.target.value)}
              className="px-2 py-1 bg-white border border-slate-200 rounded-md text-xs font-semibold text-slate-800 focus:outline-hidden focus:border-emerald-500"
            >
              <option value="Technology & Software">Tech & Software</option>
              <option value="Manufacturing & Logistics">Manufacturing & Logistics</option>
              <option value="Financial & Banking Services">Finance & Banking</option>
              <option value="Retail & Consumer Goods">Retail & FMCG</option>
              <option value="Energy & Utility Services">Energy & utilities</option>
              <option value="Education & Public Affairs">Education & Public</option>
              <option value="Healthcare & Pharma">Healthcare & Pharma</option>
            </select>
          </div>
        </div>
      </div>

      {/* Progress Multi-step Tracker */}
      <div className="border-t border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center justify-between py-2 sm:py-3 overflow-x-auto space-x-4">
            {steps.map((s, index) => {
              const Icon = s.icon;
              const isCurrent = currentStep === s.num;
              const isCompleted = currentStep > s.num;
              return (
                <button
                  key={s.num}
                  id={`step-tab-${s.num}`}
                  onClick={() => setCurrentStep(s.num)}
                  className={`flex items-center gap-2 group text-left cursor-pointer transition-all shrink-0 pb-1 border-b-2 ${
                    isCurrent
                      ? "border-emerald-800 text-emerald-900 font-extrabold pr-3"
                      : isCompleted
                      ? "border-emerald-500/30 text-emerald-800/80 font-semibold"
                      : "border-transparent text-slate-450 font-medium"
                  }`}
                >
                  <span
                    className={`flex items-center justify-center w-5 h-5 text-[10px] rounded-full font-mono ${
                      isCurrent
                        ? "bg-emerald-800 text-white font-extrabold"
                        : isCompleted
                        ? "bg-emerald-100 text-emerald-800 font-extrabold"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {s.num}
                  </span>
                  <div className="leading-none select-none">
                    <span className="block text-[11px] tracking-tight">{s.label}</span>
                    <span className="text-[8px] text-slate-400 font-mono uppercase tracking-widest hidden sm:inline-block">
                      {s.badge}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <ChevronRight className="w-3.5 h-3.5 ml-2 text-slate-350" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
