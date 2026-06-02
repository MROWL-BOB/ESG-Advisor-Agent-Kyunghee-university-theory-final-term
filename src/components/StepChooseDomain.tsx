import React from "react";
import { SUB_DOMAINS } from "../data";
import { EsgSubDomainId } from "../types";
import { Leaf, Users, ShieldAlert, Truck, FileText, TrendingUp, HelpCircle, ArrowRight } from "lucide-react";

interface StepChooseDomainProps {
  selectedSubDomain: EsgSubDomainId;
  setSelectedSubDomain: (id: EsgSubDomainId) => void;
  nextStep: () => void;
  audienceType: string;
}

const ICO_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Leaf,
  Users,
  ShieldAlert,
  Truck,
  FileText,
  TrendingUp
};

const BORDER_COLORS: Record<string, string> = {
  emerald: "hover:border-emerald-600 border-gray-200 bg-emerald-50/20",
  blue: "hover:border-blue-600 border-gray-200 bg-blue-50/20",
  indigo: "hover:border-indigo-600 border-gray-200 bg-indigo-50/20",
  amber: "hover:border-amber-600 border-gray-200 bg-amber-50/20",
  violet: "hover:border-violet-600 border-gray-200 bg-violet-50/20",
  teal: "hover:border-teal-600 border-gray-200 bg-teal-50/20"
};

const TEXT_COLORS: Record<string, string> = {
  emerald: "text-emerald-800",
  blue: "text-blue-800",
  indigo: "text-indigo-800",
  amber: "text-amber-800",
  violet: "text-violet-850",
  teal: "text-teal-800"
};

const ACCENT_BG: Record<string, string> = {
  emerald: "bg-emerald-800",
  blue: "bg-blue-800",
  indigo: "bg-indigo-800",
  amber: "bg-amber-800",
  violet: "bg-violet-800",
  teal: "bg-teal-800"
};

export default function StepChooseDomain({
  selectedSubDomain,
  setSelectedSubDomain,
  nextStep,
  audienceType
}: StepChooseDomainProps) {
  const activeDomain = SUB_DOMAINS.find(d => d.id === selectedSubDomain)!;

  return (
    <div className="space-y-8 animate-fade-in" id="step-choose-domain-container">
      {/* Intro Panel */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm relative overflow-hidden" id="domain-intro-panel">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-50/30 rounded-full blur-3xl -z-10"></div>
        
        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-[10px] font-bold font-mono tracking-widest uppercase">
            Step 1: Domain Mapping
          </div>
          <h2 className="text-2xl font-bold text-emerald-950 tracking-tight font-display">
            Organizational Core: ESG Management
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            In modern sustainable development, <strong>ESG Management</strong> represents a vital corporate boundary containing nested repeating operational pipelines. Managing these sub-domains manually introduces extreme cognitive burden, data siloing, and regulatory compliance risks.
            This module represents the complete organizational framework. Choose a sub-domain below to inspect its operational boundary and see how an AI Agent can automate its repeating tasks.
          </p>

          {/* Academic explanation based on audience style */}
          <div className="p-3.5 bg-gray-50 border border-gray-150 rounded-xl flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
            <div className="text-xs text-gray-500 leading-relaxed">
              {audienceType === "Student" && (
                <p>
                  <strong>Academic Insight:</strong> Analyzing organizational domains is a standard management science prerequisite. By breaking down the general domain into six core sub-areas, students analyze workflows as distinct information queues suited for AI alignment.
                </p>
              )}
              {audienceType === "Manager" && (
                <p>
                  <strong>Management Directive:</strong> Clear division of labor guarantees that audits remain auditable. Defining these sub-domains helps pinpoint responsibility and assign clear data governance constraints before implementing AI workloads.
                </p>
              )}
              {audienceType === "Consultant" && (
                <p>
                  <strong>Advisory Note:</strong> When auditing client sites, mapping tasks explicitly prevents scope-creep. Help your clients realize that AI agents don't replace compliance experts, they automate compliance labor queues.
                </p>
              )}
              {audienceType === "AI Designer" && (
                <p>
                  <strong>Product Spec:</strong> An AI Agent's cognitive architecture is bounded by the context of its specialized domain knowledge. Breaking down the domain prevents AI hallucinations by constraining prompts to distinct sub-topics.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Visual Domain Map Diagram Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Interactive Domain Map Diagram (left 7 cols) */}
        <div className="lg:col-span-7 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center min-h-[480px]">
          <h3 className="text-[11px] font-bold font-mono text-gray-400 uppercase tracking-widest mb-6 w-full text-center">
            INTERACTIVE SYSTEM INTERFACE FLOW
          </h3>
          
          <div className="relative w-full max-w-sm aspect-square flex items-center justify-center">
            {/* Background revolving orbits representing flow */}
            <div className="absolute w-[85%] h-[85%] border border-dashed border-gray-200 rounded-full animate-spin [animation-duration:80s]"></div>
            <div className="absolute w-[60%] h-[60%] border border-dashed border-emerald-100 rounded-full animate-spin [animation-duration:50s] [animation-direction:reverse]"></div>

            {/* Central Domain Point */}
            <div className="absolute w-28 h-28 bg-emerald-900 text-white rounded-full flex flex-col items-center justify-center text-center p-3 z-10 shadow-md border-2 border-emerald-750">
              <span className="text-[9px] uppercase font-mono font-bold tracking-widest text-emerald-300">CORE</span>
              <span className="font-display font-extrabold text-xs leading-tight">ESG Management</span>
              
              {/* Outer circular wave animation */}
              <div className="absolute inset-0 border-2 border-emerald-700 rounded-full animate-ping opacity-15"></div>
            </div>

            {/* Sub-Domains revolving as satellites (6 points around central circles) */}
            {SUB_DOMAINS.map((sub, index) => {
              const angle = (index * 360) / 6;
              const radiusHorizontal = 42; // percentage
              const radiusVertical = 42;   // percentage
              const x = Math.cos((angle * Math.PI) / 180) * radiusHorizontal;
              const y = Math.sin((angle * Math.PI) / 180) * radiusVertical;

              const isSelected = selectedSubDomain === sub.id;
              const SIcon = ICO_MAP[sub.icon] || Leaf;

              return (
                <button
                  key={sub.id}
                  id={`satellite-${sub.id}`}
                  onClick={() => setSelectedSubDomain(sub.id)}
                  style={{
                    left: `calc(50% + ${x}% - 2.25rem)`,
                    top: `calc(50% + ${y}% - 2.25rem)`
                  }}
                  className={`absolute w-18 h-18 rounded-2xl flex flex-col items-center justify-center p-2 text-center shadow-sm cursor-pointer transition-all duration-300 z-20 ${
                    isSelected
                      ? `bg-emerald-900 scale-110 text-white border-2 border-white ring-4 ring-offset-2 ring-emerald-900/20`
                      : "bg-white text-gray-700 hover:scale-105 border border-gray-200"
                  }`}
                  title={sub.name}
                >
                  <SIcon className={`w-5 h-5 ${isSelected ? "text-white" : TEXT_COLORS[sub.color]}`} />
                  <span className="text-[8px] font-bold font-display leading-tight tracking-tight mt-1 truncate max-w-[64px]">
                    {sub.name.split(" ")[0]}
                  </span>
                  <span className="text-[7px] block opacity-85 scale-90 -mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis max-w-[64px]">
                    {sub.name.split(" ").slice(1).join(" ")}
                  </span>
                </button>
              );
            })}
          </div>
          
          <p className="text-[10px] text-gray-400 mt-6 font-mono text-center">
            * Orbit nodes represent specialized ESG data streams. Click any satellite node to explore.
          </p>
        </div>

        {/* Selected Domain Spec Card (right 5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border-t-4 border-emerald-900 border-x border-b border-gray-200 rounded-2xl p-6 shadow-sm space-y-5">
            <div className="flex items-center gap-3">
              <span className={`p-2.5 rounded-xl text-white bg-emerald-950`}>
                {React.createElement(ICO_MAP[activeDomain.icon] || Leaf, { className: "w-5 h-5 text-white" })}
              </span>
              <div>
                <span className="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider block">
                  SELECTED NODE BOUNDARY
                </span>
                <h4 className="text-base font-bold text-emerald-955 leading-tight">
                  {activeDomain.name}
                </h4>
              </div>
            </div>

            <div className="space-y-4 pt-1">
              <div className="space-y-1.5 pb-1">
                <span className="text-[9px] font-semibold font-mono text-gray-400 uppercase tracking-widest block">Domain Definition</span>
                <p className="text-xs text-gray-650 leading-relaxed">
                  {activeDomain.explanation}
                </p>
              </div>

              <div className="p-3 bg-emerald-50/20 border border-emerald-150 rounded-xl space-y-1.5">
                <span className="text-[9px] font-bold text-emerald-900 uppercase tracking-wider block">
                  Core Objective in the Workshop
                </span>
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  Now that you have selected <strong className="text-emerald-950 font-semibold">{activeDomain.name}</strong>, click the button below to inspect, refine, or add to its repeated organizational workflow tasks in Step 2.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                id="choose-domain-next-btn"
                onClick={nextStep}
                className="w-full h-11 bg-emerald-900 text-white rounded-lg text-xs font-bold hover:bg-emerald-950 flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:translate-x-0.5 transition-all font-display"
              >
                Proceed to Step 2: List Tasks
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Stats Block representing completeness of the workspace */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[10px] text-gray-400 font-mono block">MAPPED WORKFLOWS</span>
              <span className="text-base font-bold text-gray-800 font-display">6 / 6 Subdomains</span>
            </div>
            <div className="h-8 w-px bg-gray-200"></div>
            <div className="space-y-0.5">
              <span className="text-[10px] text-gray-400 font-mono block">DEFAULT ACTIVE TASKS</span>
              <span className="text-base font-bold text-gray-800 font-display">18 Loaded</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
