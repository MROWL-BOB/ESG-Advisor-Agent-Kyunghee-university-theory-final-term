import React from "react";
import { AlertCircle, Target, Compass, Sparkles } from "lucide-react";

export default function PriorityMatrix() {
  const highPriority = [
    "ESG data extraction",
    "ESG document summarization",
    "ESG classification",
    "Evidence gap identification",
    "ESG advisory response generation",
    "Action plan recommendation"
  ];

  const mediumPriority = [
    "Supplier ESG comparison",
    "ESG dashboard generation",
    "Carbon and resource trend analysis",
    "Task progress monitoring"
  ];

  const futurePriority = [
    "Real-time external risk monitoring",
    "ESG rating integration",
    "Regulatory database connection",
    "Industry benchmark automation"
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 space-y-6 shadow-xs" id="priority-matrix-section">
      <div className="border-b border-gray-200 pb-3">
        <h3 className="text-base font-bold text-emerald-950 font-display uppercase tracking-wide">
          What Should Be Built First? Compliance Roadmap
        </h3>
        <p className="text-xs text-gray-500">
          A strategic prioritization grid dividing AI agent features by administrative urgency, technological feasibility, and ROI.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* High Priority Grid */}
        <div className="bg-emerald-50/50 border border-emerald-200 rounded-xl p-5 space-y-3 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-100 rounded-bl-full pointer-events-none opacity-40"></div>
          
          <div className="flex items-center gap-2 text-emerald-900 border-b border-emerald-150 pb-2">
            <Target className="w-4 h-4 text-emerald-800 shrink-0" />
            <h4 className="font-extrabold text-xs uppercase tracking-tight">high priority (MVP Phase)</h4>
          </div>
          
          <p className="text-[11px] text-gray-650 leading-relaxed font-semibold">
            High frequency, high value, highly feasible functions representing the foundational core of the advisor framework.
          </p>

          <ul className="space-y-2 pt-2">
            {highPriority.map((item, idx) => (
              <li key={idx} className="flex gap-2 items-center text-xs text-emerald-955 font-bold">
                <span className="w-1.5 h-1.5 bg-emerald-800 rounded-full shrink-0"></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Medium Priority Grid */}
        <div className="bg-blue-50/30 border border-blue-150 rounded-xl p-5 space-y-3 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-blue-105 rounded-bl-full pointer-events-none opacity-40"></div>

          <div className="flex items-center gap-2 text-blue-900 border-b border-blue-150 pb-2">
            <Compass className="w-4 h-4 text-blue-800 shrink-0" />
            <h4 className="font-extrabold text-xs uppercase tracking-tight">medium priority (Phase 2)</h4>
          </div>

          <p className="text-[11px] text-gray-650 leading-relaxed font-semibold">
            Intermediate workloads focusing on comparative analysis, dashboards, and automated trend modeling.
          </p>

          <ul className="space-y-2 pt-2">
            {mediumPriority.map((item, idx) => (
              <li key={idx} className="flex gap-2 items-center text-xs text-blue-900 font-bold">
                <span className="w-1.5 h-1.5 bg-blue-700 rounded-full shrink-0"></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Future Priority Grid */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-3 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-gray-150 rounded-bl-full pointer-events-none opacity-40"></div>

          <div className="flex items-center gap-2 text-gray-800 border-b border-gray-200 pb-2">
            <Sparkles className="w-4 h-4 text-emerald-900 shrink-0 animate-pulse" />
            <h4 className="font-extrabold text-xs uppercase tracking-tight">future priority (Scale Phase)</h4>
          </div>

          <p className="text-[11px] text-gray-650 leading-relaxed font-semibold">
            Advanced real-time risk trackers and cross-industry ratings database couplings requiring unified APIs.
          </p>

          <ul className="space-y-2 pt-2">
            {futurePriority.map((item, idx) => (
              <li key={idx} className="flex gap-2 items-center text-xs text-gray-700 font-semibold">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full shrink-0"></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-600 leading-relaxed">
        <strong>Strategic Advisory Focus: This MVP prototype focuses strictly on high-frequency, clean, feasible AI functions.</strong> It proves how we can structure fragmented files (e.g., invoices and text codes) into high-fidelity disclosures and instant action roadmaps before adding multi-tier global forecasting blocks.
      </div>
    </div>
  );
}
