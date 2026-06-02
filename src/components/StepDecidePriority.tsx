import React, { useState } from "react";
import { MappedTask } from "../types";
import { SUB_DOMAINS, AI_FUNCTIONS } from "../data";
import { Compass, HelpCircle, ArrowLeft, Download, FileText, LayoutList, CheckSquare } from "lucide-react";

interface StepDecidePriorityProps {
  mappedTasks: MappedTask[];
  onGenerateBlueprint: () => void;
  prevStep: () => void;
}

export default function StepDecidePriority({
  mappedTasks,
  onGenerateBlueprint,
  prevStep
}: StepDecidePriorityProps) {
  const [activeTaskNode, setActiveTaskNode] = useState<string | null>(
    mappedTasks.length > 0 ? mappedTasks[0].taskId : null
  );

  const activeNodeDetail = mappedTasks.find(t => t.taskId === activeTaskNode);

  // Group tasks into the 4 quadrant categories based on standard midpoints of 5.5 (scores 1-10)
  const getQuadrant = (feas: number, value: number) => {
    if (feas >= 5.5 && value >= 5.5) {
      return {
        id: "build_first",
        name: "Build First",
        desc: "High organizational value and high feasibility. Implement immediately for immediate wins.",
        color: "bg-emerald-50 text-emerald-850 border-emerald-250",
        badgeColor: "bg-emerald-800 text-white"
      };
    } else if (feas < 5.5 && value >= 5.5) {
      return {
        id: "strategic",
        name: "Strategic Development",
        desc: "High organizational value but lower implementation feasibility. Treat as medium-term roadmap landmarks.",
        color: "bg-blue-50 text-blue-900 border-blue-200",
        badgeColor: "bg-blue-800 text-white"
      };
    } else if (feas >= 5.5 && value < 5.5) {
      return {
        id: "optional",
        name: "Optional Enhancement",
        desc: "Lower organizational value but easy implementation. Good for supplementary modules or optional tooling.",
        color: "bg-amber-50 text-amber-900 border-amber-200",
        badgeColor: "bg-amber-600 text-white"
      };
    } else {
      return {
        id: "future",
        name: "Future Expansion",
        desc: "Lower organizational value and difficult engineering. Re-examine once baseline data structures mature.",
        color: "bg-gray-100 text-gray-700 border-gray-250",
        badgeColor: "bg-gray-500 text-white"
      };
    }
  };

  // Grouping tasks for listing
  const categorized = mappedTasks.reduce((acc, t) => {
    const quad = getQuadrant(t.feasibilityValue, t.priorityValue);
    if (!acc[quad.id]) {
      acc[quad.id] = { info: quad, items: [] as MappedTask[] };
    }
    acc[quad.id].items.push(t);
    return acc;
  }, {} as Record<string, { info: any; items: MappedTask[] }>);

  // Default structure for missing categories in loop
  const quadList = [
    { id: "build_first", name: "1. Build First", xMin: 5.5, xMax: 10, yMin: 5.5, yMax: 10, bg: "bg-emerald-50/15", labelBg: "text-emerald-900", colorClass: "emerald" },
    { id: "strategic", name: "2. Strategic Development", xMin: 1, xMax: 5.5, yMin: 5.5, yMax: 10, bg: "bg-blue-50/10", labelBg: "text-blue-900", colorClass: "blue" },
    { id: "optional", name: "3. Optional Enhancement", xMin: 5.5, xMax: 10, yMin: 1, yMax: 5.5, bg: "bg-amber-50/10", labelBg: "text-amber-800", colorClass: "amber" },
    { id: "future", name: "4. Future Expansion", xMin: 1, xMax: 5.5, yMin: 1, yMax: 5.5, bg: "bg-gray-100/40", labelBg: "text-gray-600", colorClass: "slate" }
  ];

  return (
    <div className="space-y-8 animate-fade-in" id="step-decide-priority-container">
      {/* Intro Block */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-[10px] font-bold font-mono tracking-widest uppercase">
          Step 4: Decisive Prioritization
        </div>
        <h2 className="text-2xl font-bold text-emerald-950 tracking-tight font-display">
          Prioritization Map & Development Sequencing
        </h2>
        <p className="text-sm text-gray-650 leading-relaxed">
          Great product design demands knowing what <strong>not</strong> to build first. This prioritization system maps your ESG AI Agent functions into four logical quadrants based on average coordinate weights. Clicking any point highlights its functional profile.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Quadrant Visual Workspace (lg:col-span-8) */}
        <div className="lg:col-span-8 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="font-bold text-xs uppercase tracking-widest font-mono text-gray-400">
              PRIORITY COORDINATE SCATTER CHART
            </h3>
            <span className="text-[10px] bg-gray-50 text-gray-500 font-mono px-2 py-0.5 rounded border border-gray-150">
              X-axis: Feasibility | Y-axis: Stakeholder Value
            </span>
          </div>

          {/* Interactive Plot Box */}
          <div className="relative w-full aspect-square md:aspect-[4/3] bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden">
            {/* Quadrant separators */}
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gray-300 border-dashed z-0"></div>
            <div className="absolute left-0 right-0 top-1/2 h-px bg-gray-300 border-dashed z-0"></div>

            {/* Quadrant Name Labels at Corners */}
            <div className="absolute top-3 right-3 text-right pointer-events-none select-none">
              <span className="text-[10px] font-bold text-emerald-900 bg-emerald-50 border border-emerald-150 px-2.5 py-1 rounded-md uppercase font-display">
                Build First
              </span>
            </div>
            <div className="absolute top-3 left-3 text-left pointer-events-none select-none">
              <span className="text-[10px] font-bold text-blue-900 bg-blue-50 border border-blue-150 px-2.5 py-1 rounded-md uppercase font-display">
                Strategic
              </span>
            </div>
            <div className="absolute bottom-3 right-3 text-right pointer-events-none select-none">
              <span className="text-[10px] font-bold text-amber-900 bg-amber-50 border border-amber-150 px-2.5 py-1 rounded-md uppercase font-display">
                Optional
              </span>
            </div>
            <div className="absolute bottom-3 left-3 text-left pointer-events-none select-none">
              <span className="text-[10px] font-bold text-gray-650 bg-gray-100 border border-gray-200 px-2.5 py-1 rounded-md uppercase font-display">
                Future Expansion
              </span>
            </div>

            {/* Axis grid labels */}
            <div className="absolute bottom-1 right-3 font-mono text-[9px] text-gray-400">
              High Feasibility ➔
            </div>
            <div className="absolute bottom-1 left-3 font-mono text-[9px] text-gray-400">
              Low Feasibility
            </div>
            <div className="absolute top-3 left-1/2 ml-2 font-mono text-[9px] text-gray-400">
              High Value ⬆
            </div>

            {/* Render Nodes */}
            {mappedTasks.map(t => {
              // Convert feasibility and priority values (from 1 to 10) to percentages (from 5% to 95%)
              const leftPercent = 5 + ((t.feasibilityValue - 1) / 9) * 90;
              const bottomPercent = 5 + ((t.priorityValue - 1) / 9) * 90;

              const isSelected = activeTaskNode === t.taskId;

              return (
                <button
                  key={t.taskId}
                  id={`scatter-node-${t.taskId}`}
                  onClick={() => setActiveTaskNode(t.taskId)}
                  style={{
                    left: `${leftPercent}%`,
                    bottom: `${bottomPercent}%`
                  }}
                  className={`absolute -translate-x-1/2 translate-y-1/2 p-2 rounded-full cursor-pointer shadow hover:scale-125 transition-all z-10 ${
                    isSelected
                      ? "bg-gray-900 border-2 border-white scale-115 ring-4 ring-gray-900/10 text-white animate-pulse"
                      : "bg-emerald-800 hover:bg-emerald-950 text-white border border-white"
                  }`}
                  title={`${t.taskTitle} (V:${t.priorityValue}, F:${t.feasibilityValue})`}
                >
                  <span className="text-[9px] font-black block w-5 h-5 flex items-center justify-center leading-none uppercase font-mono">
                    {t.taskTitle.split(" ").slice(0, 2).map(w => w[0].toUpperCase()).join("")}
                  </span>

                  {/* Dot tag annotation always-visible or hovered */}
                  <span className="absolute left-1/2 -top-5 -translate-x-1/2 bg-gray-900 text-[8px] font-sans font-semibold text-white px-1.5 py-0.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all">
                    {t.taskTitle}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick analysis table under Scatter chart */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quadList.map(quad => {
              const matchedItems = mappedTasks.filter(
                t => t.feasibilityValue >= quad.xMin && 
                     t.feasibilityValue <= quad.xMax && 
                     t.priorityValue >= quad.yMin && 
                     t.priorityValue <= quad.yMax
              );

              return (
                <div key={quad.id} className={`p-4 border rounded-xl space-y-2 ${quad.bg} border-gray-200/80`}>
                  <div className="flex items-center justify-between">
                    <h4 className={`text-xs font-bold ${quad.labelBg}`}>
                      {quad.name}
                    </h4>
                    <span className="text-[10px] font-mono font-bold bg-white text-gray-600 border border-gray-150 px-2 py-0.5 rounded">
                      {matchedItems.length} items
                    </span>
                  </div>
                  <ul className="space-y-1">
                    {matchedItems.slice(0, 3).map(i => (
                      <li key={i.taskId} className="text-[11px] text-gray-650 truncate flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full shrink-0"></span>
                        <span className="truncate">{i.taskTitle}</span>
                      </li>
                    ))}
                    {matchedItems.length > 3 && (
                      <li className="text-[9px] text-gray-400 tracking-wider font-semibold uppercase">
                        + {matchedItems.length - 3} more items...
                      </li>
                    )}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Priority Detail Panel (lg:col-span-4) */}
        <div className="lg:col-span-4 space-y-6">
          {activeNodeDetail ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-5">
              <div className="border-b border-gray-150 pb-3">
                <span className="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest block">
                  COORDINATE FOCUS INSPECTION
                </span>
                <h4 className="font-bold text-emerald-955 text-sm leading-tight mt-1">
                  {activeNodeDetail.taskTitle}
                </h4>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 p-2.5 rounded-lg text-center border border-gray-200">
                  <span className="text-[8px] font-bold text-gray-400 uppercase block font-mono">
                    Organizational Value
                  </span>
                  <span className="text-xl font-bold text-emerald-900 font-display">
                    {activeNodeDetail.priorityValue} / 10
                  </span>
                </div>
                <div className="bg-gray-50 p-2.5 rounded-lg text-center border border-gray-200">
                  <span className="text-[8px] font-bold text-gray-400 uppercase block font-mono">
                    Engineering Feas
                  </span>
                  <span className="text-xl font-bold text-emerald-900 font-display">
                    {activeNodeDetail.feasibilityValue} / 10
                  </span>
                </div>
              </div>

              <div className="space-y-3 pt-1 text-xs leading-relaxed">
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-gray-400 uppercase block font-mono animate-pulse">Matched AI Function</span>
                  <p className="font-bold text-gray-800">
                    {AI_FUNCTIONS.find(af => af.id === activeNodeDetail.aiFunctionId)?.name}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-gray-400 uppercase block font-mono">Strategic Assignment quadrant</span>
                  <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold border ${
                    getQuadrant(activeNodeDetail.feasibilityValue, activeNodeDetail.priorityValue).color
                  }`}>
                    {getQuadrant(activeNodeDetail.feasibilityValue, activeNodeDetail.priorityValue).name}
                  </span>
                </div>

                <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl space-y-1.5">
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block font-mono">Task Pain Point Ref</span>
                  <p className="text-[11px] text-gray-650 leading-relaxed">
                    {activeNodeDetail.painPoint}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-150 pt-4">
                <p className="text-[11px] text-gray-505 leading-relaxed mb-3">
                  This task constitutes a core component of the final <strong>ESG AI Agent Design Blueprint Document</strong>. If you are satisfied with this prioritization map, click below to lock details and download the deliverables.
                </p>
                <button
                  id="decide-priority-blueprint-btn"
                  onClick={onGenerateBlueprint}
                  className="w-full h-11 bg-emerald-900 hover:bg-emerald-950 text-white rounded-lg text-xs font-bold inline-flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all font-display hover:translate-x-0.5"
                >
                  <FileText className="w-4 h-4 text-emerald-305" />
                  Lock & Export AI Agent Design Blueprint
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 border-dashed rounded-2xl p-12 text-center text-gray-400 text-xs italic">
              Select any plotted ESG capability node to explore technical implementation paths, coordinate notes and specific deployment horizons.
            </div>
          )}
        </div>
      </div>

      {/* Footer controls */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        <button
          onClick={prevStep}
          className="px-5 h-11 border border-gray-300 text-gray-600 hover:bg-gray-50 rounded-lg text-xs font-bold inline-flex items-center gap-2 cursor-pointer transition-all"
        >
          <ArrowLeft className="w-4 h-4 text-gray-400" />
          Step 3: Match AI Capabilities
        </button>
        <button
          onClick={onGenerateBlueprint}
          className="px-5 h-11 bg-emerald-950 hover:bg-black text-white rounded-lg text-xs font-bold inline-flex items-center gap-2 cursor-pointer transition-all shadow-md"
        >
          <FileText className="w-4 h-4" />
          Show Final Blueprint
        </button>
      </div>
    </div>
  );
}
