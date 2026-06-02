import React, { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp, Layers, Cpu, HelpCircle as HelpIcon, Server, AlertCircle } from "lucide-react";

export default function DesignLogicPanel() {
  const [isOpen, setIsOpen] = useState(false);

  const steps = [
    {
      title: "Choose Domain",
      description: "The selected target domain is corporate ESG management, spanning Environmental, Social, and Governance pillars.",
      icon: Layers,
      color: "text-emerald-800"
    },
    {
      title: "List Repeating Tasks",
      description: "Identify high-frequency administrative workloads (collecting bills, screening vendor sheets, drafting annual PDFs).",
      icon: Server,
      color: "text-blue-800"
    },
    {
      title: "Match AI Functions",
      description: "Align each workload with targeted generative capabilities like Document Summarizers, Multi-Format Parsers, or Evidence Extractors.",
      icon: Cpu,
      color: "text-indigo-850"
    },
    {
      title: "Decide Priority",
      description: "Plot each capability on a 2x2 grid based on Organizational Value versus Feasibility to isolate immediate MVP pilots.",
      icon: AlertCircle,
      color: "text-teal-850"
    }
  ];

  return (
    <div id="design-logic-framework" className="bg-gray-50 border border-gray-250 rounded-2xl p-4 transition-all">
      {/* Header Panel */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between cursor-pointer select-none"
      >
        <div className="flex items-center gap-2.5">
          <HelpCircle className="w-5 h-5 text-emerald-800 shrink-0" />
          <div>
            <h4 className="font-bold text-xs text-emerald-950 uppercase tracking-wider font-mono">
              DESIGN LOGIC BEHIND ESG AI ADVISOR
            </h4>
            <span className="text-[10px] text-gray-400 block mt-0.5">
              The underlying 4-step framework quietly supporting the MVP's structural reasoning
            </span>
          </div>
        </div>
        
        <button className="p-1 hover:bg-gray-200 rounded text-gray-500">
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Expandable Body */}
      {isOpen && (
        <div className="mt-6 pt-4 border-t border-gray-200 space-y-4 animate-scale-in">
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-150 text-xs text-emerald-950 font-medium">
            <strong>Theoretical Background:</strong> While managers interact with the app as a simple ESG portal, the entire design is anchored strictly by the <strong>Four-Step Framework</strong>. This methodology bridges fragmented business tasks with practical language-model primitives.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
            {steps.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <div key={idx} className="bg-white p-4 rounded-xl border border-gray-250 flex flex-col justify-between h-40">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-emerald-900 border-b pb-2 border-gray-100">
                      <span className="text-[10px] bg-emerald-100 px-1.5 py-0.5 font-bold font-mono rounded text-emerald-950">0{idx + 1}</span>
                      <strong className="text-xs uppercase tracking-tight">{step.title}</strong>
                    </div>
                    <p className="text-[11px] text-gray-650 leading-relaxed font-sans">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
