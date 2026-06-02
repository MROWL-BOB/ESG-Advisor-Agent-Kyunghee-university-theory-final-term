import React, { useState } from "react";
import { MappedTask, AiFunction, EsgSubDomainId } from "../types";
import { SUB_DOMAINS, AI_FUNCTIONS } from "../data";
import { Play, HelpCircle, ArrowLeft, ArrowRight, Table, Settings, Check, Sparkles } from "lucide-react";

interface StepMatchFunctionsProps {
  mappedTasks: MappedTask[];
  setMappedTasks: React.Dispatch<React.SetStateAction<MappedTask[]>>;
  nextStep: () => void;
  prevStep: () => void;
}

export default function StepMatchFunctions({
  mappedTasks,
  setMappedTasks,
  nextStep,
  prevStep
}: StepMatchFunctionsProps) {
  const [activeRowId, setActiveRowId] = useState<string | null>(
    mappedTasks.length > 0 ? mappedTasks[0].taskId : null
  );

  const selectedRow = mappedTasks.find(m => m.taskId === activeRowId);

  // Handle AI selection changes
  const handleAiFunctionChange = (taskId: string, aiFunctionId: string) => {
    const matchedFunc = AI_FUNCTIONS.find(af => af.id === aiFunctionId);
    if (!matchedFunc) return;

    setMappedTasks(prev => 
      prev.map(task => {
        if (task.taskId === taskId) {
          const result = computeMockAgentOutput(task.taskTitle, matchedFunc);
          return {
            ...task,
            aiFunctionId: aiFunctionId,
            aiOutput: result,
            feasibilityValue: matchedFunc.defaultFeasibility,
            priorityValue: matchedFunc.defaultValue,
            isConfigured: true
          };
        }
        return task;
      })
    );
  };

  // Adjust sliders
  const handleValueSliderChange = (taskId: string, val: number) => {
    setMappedTasks(prev => 
      prev.map(task => task.taskId === taskId ? { ...task, priorityValue: val } : task)
    );
  };

  const handleFeasibilitySliderChange = (taskId: string, val: number) => {
    setMappedTasks(prev => 
      prev.map(task => task.taskId === taskId ? { ...task, feasibilityValue: val } : task)
    );
  };

  return (
    <div className="space-y-8 animate-fade-in" id="step-match-functions-container">
      {/* Intro Header */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-[10px] font-bold font-mono tracking-widest uppercase">
          Step 3: AI Cognitive Fitting
        </div>
        <h2 className="text-2xl font-bold text-emerald-950 tracking-tight font-display">
          Align ESG Task Gaps with Core AI Capabilities
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          In this step, we match each repeating human task with a specific <strong>AI Agent Cognitive Capability</strong>. Selecting a capability instantly adjusts the predicted structured output format, and populates default baseline scores for Implementation Feasibility and Stakeholder Value.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Alignment Matrix Table (xl:col-span-8) */}
        <div className="xl:col-span-8 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 mb-4 border-b border-gray-150 pb-3">
            <Table className="w-5 h-5 text-emerald-850" />
            <h3 className="font-bold text-emerald-950 text-xs uppercase tracking-wide">
              COGNITIVE ALIGNMENT MATRIX
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-400 font-mono font-bold">
                  <th className="p-3">Category</th>
                  <th className="p-3">Repeating Task & Pain Point</th>
                  <th className="p-3">Matched AI Function</th>
                  <th className="p-3 text-right">Value & Feasibility</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-150">
                {mappedTasks.map(t => {
                  const subdomain = SUB_DOMAINS.find(sd => sd.id === t.subDomainId);
                  const isSelected = activeRowId === t.taskId;

                  return (
                    <tr 
                      key={t.taskId}
                      id={`matrix-row-${t.taskId}`}
                      onClick={() => setActiveRowId(t.taskId)}
                      className={`group hover:bg-gray-50 cursor-pointer transition-all ${
                        isSelected ? "bg-emerald-50/20" : ""
                      }`}
                    >
                      {/* Sub-domain Label */}
                      <td className="p-3 align-top font-bold text-[10px] tracking-tight uppercase text-gray-400">
                        <span className={`px-2 py-0.5 rounded-md border ${
                          t.subDomainId === "environmental" ? "bg-emerald-50 text-emerald-800 border-emerald-150" :
                          t.subDomainId === "social" ? "bg-blue-50 text-blue-850 border-blue-150" :
                          t.subDomainId === "governance" ? "bg-indigo-50 text-indigo-800 border-indigo-150" :
                          t.subDomainId === "supplier" ? "bg-amber-50 text-amber-800 border-amber-150" :
                          t.subDomainId === "reporting" ? "bg-violet-50 text-violet-800 border-violet-150" :
                          "bg-teal-50 text-teal-800 border-teal-150"
                        }`}>
                          {subdomain?.name.split(" ")[0]}
                        </span>
                      </td>

                      {/* Title & Pain */}
                      <td className="p-3 align-top space-y-1 max-w-xs">
                        <div className="font-bold text-gray-900 leading-tight">
                          {t.taskTitle}
                        </div>
                        <p className="text-[10px] text-gray-450 italic line-clamp-1 group-hover:line-clamp-none transition-all">
                          Challenge: {t.painPoint}
                        </p>
                      </td>

                      {/* Dropdown Selector */}
                      <td className="p-3 align-top">
                        <select
                          id={`select-function-${t.taskId}`}
                          value={t.aiFunctionId}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => handleAiFunctionChange(t.taskId, e.target.value)}
                          className="w-full bg-white border border-gray-200 hover:border-emerald-700 rounded-md p-1.5 text-xs font-semibold text-gray-855 focus:outline-hidden"
                        >
                          {AI_FUNCTIONS.map(af => (
                            <option key={af.id} value={af.id}>
                              {af.name}
                            </option>
                          ))}
                        </select>
                      </td>

                      {/* Interactive Metrics Sliders */}
                      <td className="p-3 align-top text-right space-y-2 shrink-0">
                        {/* Org Value slider */}
                        <div className="flex items-center gap-2 justify-end">
                          <span className="text-[9px] font-mono text-gray-400">Value:</span>
                          <input 
                            type="range"
                            id={`value-slider-${t.taskId}`}
                            min="1"
                            max="10"
                            value={t.priorityValue}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => handleValueSliderChange(t.taskId, parseInt(e.target.value))}
                            className="w-16 accent-emerald-900 cursor-pointer h-1 rounded-lg"
                          />
                          <span className="font-mono text-[10px] font-bold w-4 text-emerald-900">{t.priorityValue}</span>
                        </div>

                        {/* Feasibility slider */}
                        <div className="flex items-center gap-2 justify-end">
                          <span className="text-[9px] font-mono text-gray-400">Feas:</span>
                          <input 
                            type="range"
                            id={`feasibility-slider-${t.taskId}`}
                            min="1"
                            max="10"
                            value={t.feasibilityValue}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => handleFeasibilitySliderChange(t.taskId, parseInt(e.target.value))}
                            className="w-16 accent-emerald-900 cursor-pointer h-1 rounded-lg"
                          />
                          <span className="font-mono text-[10px] font-bold w-4 text-emerald-900">{t.feasibilityValue}</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Dynamic AI Execution Terminal (xl:col-span-4) */}
        <div className="xl:col-span-4 space-y-4">
          <div className="bg-gray-900 border border-gray-950 text-emerald-400 rounded-2xl p-5 shadow-lg font-mono text-xs space-y-4 min-h-[460px] flex flex-col justify-between">
            
            {/* Terminal Header */}
            <div>
              <div className="flex items-center justify-between border-b border-gray-800 pb-2 mb-3">
                <div className="flex items-center gap-1.5 animate-pulse">
                  <span className="w-2.5 h-2.5 bg-gray-700 rounded-full"></span>
                  <span className="w-2.5 h-2.5 bg-emerald-600 rounded-full"></span>
                  <span className="w-2.5 h-2.5 bg-emerald-300 rounded-full"></span>
                </div>
                <span className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">
                  AI AGENT RUNTIME EMULATOR
                </span>
              </div>

              {selectedRow ? (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <span className="text-gray-500 block text-[9px] uppercase font-bold">Active Sub-Domain Pipeline</span>
                    <span className="text-white font-semibold">&gt;&gt; {SUB_DOMAINS.find(s => s.id === selectedRow.subDomainId)?.name}</span>
                  </div>

                  <div>
                    <span className="text-gray-500 block text-[9px] uppercase font-bold">Active Mapping Queue Target</span>
                    <span className="text-emerald-300 font-semibold">&gt;&gt; {selectedRow.taskTitle}</span>
                  </div>

                  <div>
                    <span className="text-gray-500 block text-[9px] uppercase font-bold">Linked Core AI Capability Model</span>
                    <span className="text-emerald-100 font-semibold">
                      &gt;&gt; {AI_FUNCTIONS.find(af => af.id === selectedRow.aiFunctionId)?.name}
                    </span>
                  </div>

                  <div className="border-t border-gray-805 pt-3 space-y-2">
                    <span className="bg-gray-800 p-1 text-[9px] text-emerald-200 rounded border border-gray-700 block text-center">
                      ✔ TASK EMULATION SUCCEEDED. GENERATED OUTPUT SCHEMATICS:
                    </span>
                    
                    <div className="space-y-2 bg-gray-950 p-3 rounded-lg border border-gray-800 text-[11px] leading-relaxed">
                      <div>
                        <span className="text-gray-500 uppercase text-[8px] block">Agent Output Blueprint</span>
                        <p className="text-white font-medium">{selectedRow.aiOutput}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-20 italic">
                  Select any row in the Matrix Table to emulate live AI Cognitive fits.
                </div>
              )}
            </div>

            {/* Terminal Info Block */}
            <div className="border-t border-gray-800 pt-3 text-[10px] text-gray-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-500 animate-pulse" />
              <span>Sliders feed coordinate weights into Step 4 (Priority Matrix).</span>
            </div>

          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-2 text-xs text-gray-500 leading-relaxed">
            <h4 className="font-bold text-gray-800 text-xs">Why Value/Feasibility?</h4>
            <p>
              By quantifying <strong>Organizational Value</strong> (the degree of strategic impact, hazard protection, or regulatory mitigation) and <strong>Implementation Feasibility</strong> (data maturity, framework accessibility, and engineering cost), you rank what is practical to build right now versus what requires long-term planning.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        <button
          onClick={prevStep}
          className="px-5 h-11 border border-gray-300 text-gray-600 hover:bg-gray-50 rounded-lg text-xs font-bold inline-flex items-center gap-2 cursor-pointer transition-all"
        >
          <ArrowLeft className="w-4 h-4 text-gray-400" />
          Step 2: Repeating Tasks
        </button>
        <button
          onClick={nextStep}
          className="px-5 h-11 bg-emerald-900 hover:bg-emerald-950 text-white rounded-lg text-xs font-bold inline-flex items-center gap-2 cursor-pointer transition-all shadow-md"
        >
          Step 4: Decide Priority
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// Logical helper to map customizable mock output formats dynamically based on functional needs
function computeMockAgentOutput(taskTitle: string, matchedFunc: AiFunction): string {
  const cleanTitle = taskTitle.toLowerCase();
  
  if (matchedFunc.id === "data_extraction") {
    return "Automated extraction schema output containing validated metric databases, parsed source document coordinates, and key invoice line-items.";
  }
  if (matchedFunc.id === "doc_summary") {
    return "High-density executive summaries matching target audit clauses, specifying discrepancies, actionable priorities and reference pages.";
  }
  if (matchedFunc.id === "risk_detection") {
    return "Comprehensive risk registry specifying legal compliance risks, local regulatory liability triggers, and hazard status levels.";
  }
  if (matchedFunc.id === "gap_id") {
    return "Detailed compliance missing-evidence checklist mapping disclosure loopholes to specific GRI or CSRD disclosure indexes.";
  }
  if (matchedFunc.id === "report_gen") {
    return "Structured report drafts formatted cleanly in standard sections, suitable for executive presentation, stakeholder alignment and print-outs.";
  }
  if (matchedFunc.id === "translation") {
    return "High-precision dual-language (English-Chinese) formatted reports matching recognized international ESG guidelines and terminology.";
  }
  if (matchedFunc.id === "supplier_screen") {
    return "Comprehensive supplier green matrix scorecard with automatic tier groupings and vendor risk markers.";
  }
  if (matchedFunc.id === "task_rec") {
    return "Granular 30-60- day standard operating checklists assigned dynamically to specific role KPIs along with template checklists.";
  }
  if (matchedFunc.id === "progress_monitor") {
    return "Dynamic activity tracker dashboard showing completion milestones, expiring certificates, and delay alerts.";
  }

  // General catch-all template
  return `Custom AI output optimized for '${taskTitle}' using ${matchedFunc.name} processes, delivering high stakeholder transparency.`;
}
