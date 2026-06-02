import React, { useRef } from "react";
import { MappedTask, EsgSubDomainId } from "../types";
import { SUB_DOMAINS, AI_FUNCTIONS } from "../data";
import { Printer, Download, ArrowLeft, CheckCircle, Sparkles, AlertCircle, FileText, Info, Quote } from "lucide-react";

interface BlueprintViewProps {
  mappedTasks: MappedTask[];
  organizationName: string;
  industrySector: string;
  audienceType: string;
  onBackToWorkshop: () => void;
}

export default function BlueprintView({
  mappedTasks,
  organizationName,
  industrySector,
  audienceType,
  onBackToWorkshop
}: BlueprintViewProps) {
  const printAreaRef = useRef<HTMLDivElement>(null);

  // Group tasks into priority quadrants based on calculated coordinate scores
  const getQuadrantId = (feas: number, value: number) => {
    if (feas >= 5.5 && value >= 5.5) return "build_first";
    if (feas < 5.5 && value >= 5.5) return "strategic";
    if (feas >= 5.5 && value < 5.5) return "optional";
    return "future";
  };

  const buildFirstItems = mappedTasks.filter(t => getQuadrantId(t.feasibilityValue, t.priorityValue) === "build_first");
  const strategicItems = mappedTasks.filter(t => getQuadrantId(t.feasibilityValue, t.priorityValue) === "strategic");
  const optionalItems = mappedTasks.filter(t => getQuadrantId(t.feasibilityValue, t.priorityValue) === "optional");
  const futureItems = mappedTasks.filter(t => getQuadrantId(t.feasibilityValue, t.priorityValue) === "future");

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    // Basic CSV compiler
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Category,Task Description,Matched AI Function,Value (Y),Feasibility (X),Planned Quadrant\r\n";

    mappedTasks.forEach(t => {
      const categoryName = SUB_DOMAINS.find(sd => sd.id === t.subDomainId)?.name || "";
      const matchedFuncName = AI_FUNCTIONS.find(af => af.id === t.aiFunctionId)?.name || "";
      const planQuad = getQuadrantId(t.feasibilityValue, t.priorityValue).toUpperCase();
      
      const row = `"${categoryName}","${t.taskTitle.replace(/"/g, '""')}","${matchedFuncName}",${t.priorityValue},${t.feasibilityValue},"${planQuad}"`;
      csvContent += row + "\r\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ESG_AI_Agent_Blueprint_${organizationName.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in pb-16 px-4" id="blueprint-view-container">
      
      {/* Top Banner Control Panel and return link */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-emerald-950 text-white p-5 rounded-2xl shadow-sm">
        <div className="space-y-1">
          <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-widest block">
            WORKSHOP OUTPUT PORTAL
          </span>
          <h2 className="text-base font-bold font-display tracking-tight text-white leading-tight uppercase">
            ESG AI AGENT SYSTEM SPECIFICATION BLUEPRINT
          </h2>
          <span className="text-xs text-emerald-100/80 block -mt-0.5">
            Architectural Deliverable for {organizationName || "Your Organization"}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onBackToWorkshop}
            className="px-4 py-2 bg-emerald-900/60 hover:bg-emerald-800 text-emerald-100 rounded-lg text-xs font-bold inline-flex items-center gap-2 cursor-pointer transition-all border border-emerald-800"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Adjust Metrics
          </button>
          <button
            onClick={handleExportCSV}
            className="px-4 py-2 bg-emerald-900/60 hover:bg-emerald-800 text-emerald-100 rounded-lg text-xs font-bold inline-flex items-center gap-2 cursor-pointer transition-all border border-emerald-800"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            Export CSV
          </button>
          <button
            onClick={handlePrint}
            className="px-4.5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-bold inline-flex items-center gap-2 cursor-pointer transition-all shadow-md"
          >
            <Printer className="w-3.5 h-3.5" />
            Print Blueprint (PDF)
          </button>
        </div>
      </div>

      {/* Printable Area Wrapper */}
      <div 
        ref={printAreaRef}
        id="printable-blueprint-document"
        className="bg-white border border-gray-200 rounded-3xl p-8 sm:p-12 shadow-md space-y-10 text-gray-800 print:border-none print:shadow-none print:p-0 font-sans"
      >
        
        {/* Document Header Panel */}
        <div className="border-b-4 border-emerald-900 pb-6 flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-block px-3 py-1 bg-emerald-900 text-white font-extrabold text-[10px] tracking-wider uppercase rounded">
              CONFIDENTIAL TECHNICAL BRIEF
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-950 font-display tracking-tight leading-tight uppercase">
              ESG AI Agent Specification Blueprint
            </h1>
            <p className="text-xs text-gray-400 font-mono">
              SYSTEM CODE DECAL: EAASC-SPEC-V1.2 | STATUS: AUDIT DESIGN READY
            </p>
          </div>

          <div className="bg-gray-50 p-4 border border-gray-200 rounded-xl space-y-2 max-w-sm w-full font-mono text-[11px] text-gray-600">
            <div><strong>Organization:</strong> {organizationName || "Acme Corp"}</div>
            <div><strong>Industry Sector:</strong> {industrySector}</div>
            <div><strong>Workshop Path:</strong> {audienceType} Strategy Framework</div>
            <div><strong>Date Generated:</strong> {new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</div>
          </div>
        </div>

        {/* Dynamic Professional Workshop Slogan Section */}
        <div className="p-5 bg-gray-50 border border-gray-200 rounded-2xl relative overflow-hidden flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50/20 rounded-full blur-2xl -z-10"></div>
          <div className="space-y-1 max-w-2xl">
            <span className="text-[9px] font-bold text-emerald-800 uppercase tracking-widest font-mono block">Workshop Motto & Alignment Premise</span>
            <blockquote className="text-[13px] font-semibold text-emerald-950 italic leading-relaxed">
              “Choose the domain. Understand the work. Match AI functions. Build what matters first.”
            </blockquote>
          </div>
          <p className="text-[10px] font-mono text-gray-400 uppercase tracking-wider text-right self-end">
            * Design Principle
          </p>
        </div>

        {/* 1. Executive Summary */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-emerald-950 border-b border-gray-150 pb-1.5 uppercase font-display tracking-tight">
            1. Executive Summary & Architecture Paradigm
          </h3>
          <p className="text-xs leading-relaxed text-gray-650">
            This document outlines a targeted, cognitive automation roadmap designed to align repetitive Environmental, Social, and Governance (ESG) administrative workloads at <strong>{organizationName || "the target organization"}</strong> with advanced AI capabilities. Rather than deploying generic generative bots, this technical blueprint matches individual workflow pain points to precise language model pipelines (e.g. OCR Document Extraction, Evidence Gap Auditors). This structure minimizes reporting cycles, establishes transparent audit readiness for global standards like GRI and CSRD, and lowers operational compliance overhead up to 55%.
          </p>
        </div>

        {/* 2. Mapped Alignment Matrix Table */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-emerald-950 border-b border-gray-150 pb-1.5 uppercase font-display tracking-tight">
            2. Completed Aligned Task Map
          </h3>
          <div className="overflow-x-auto border border-gray-200 rounded-xl">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 font-mono font-bold text-gray-450">
                  <th className="p-3">Category</th>
                  <th className="p-3">Repeating Business Workflow</th>
                  <th className="p-3">Linked AI Agent Capability</th>
                  <th className="p-3">Target AI Output Blueprint</th>
                  <th className="p-3 text-center">Value/Feas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-150">
                {mappedTasks.map(t => {
                  const matchedFunc = AI_FUNCTIONS.find(af => af.id === t.aiFunctionId);
                  const subdomain = SUB_DOMAINS.find(sd => sd.id === t.subDomainId);

                  return (
                    <tr key={t.taskId} className="hover:bg-gray-50/50">
                      <td className="p-3 align-top font-bold text-[10px] tracking-tight uppercase text-gray-400">
                        {subdomain?.name.split(" ")[0]}
                      </td>
                      <td className="p-3 align-top max-w-xs space-y-1">
                        <div className="font-bold text-gray-900">{t.taskTitle}</div>
                        <p className="text-[10px] text-gray-450 italic">challenge: {t.painPoint}</p>
                      </td>
                      <td className="p-3 align-top text-gray-750 font-bold">
                        {matchedFunc?.name || "Pending Alignment"}
                      </td>
                      <td className="p-3 align-top text-[11px] max-w-sm text-gray-600 leading-relaxed">
                        {t.aiOutput}
                      </td>
                      <td className="p-3 align-top text-center font-mono font-bold text-emerald-900">
                        V: {t.priorityValue} | F: {t.feasibilityValue}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. Phased Implementation Roadmap */}
        <div className="space-y-6">
          <h3 className="text-base font-bold text-emerald-950 border-b border-gray-150 pb-1.5 uppercase font-display tracking-tight">
            3. Phased Roadmap Sequencing
          </h3>

          <div className="space-y-4">
            
            {/* Phase 1: Build First */}
            <div className="bg-gray-50 border border-emerald-200 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-emerald-900 text-white rounded text-[10px] font-extrabold uppercase font-mono">
                  PHASE 1: IMMEDIATE WIN
                </span>
                <span className="text-xs font-bold text-emerald-950 font-display">Build First Pilot Queue</span>
              </div>
              <p className="text-xs text-gray-650 leading-relaxed">
                These capabilities have both high implementation feasibility and high organizational value. Leverage pre-trained LLM models and simple data retrieval pipelines (document parsing, entity synthesis) to demonstrate quick, high-ROI business value in under 30 days.
              </p>
              {buildFirstItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {buildFirstItems.map(item => (
                    <div key={item.taskId} className="bg-white p-3 rounded-xl border border-gray-200 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-[11px] font-bold text-gray-800 block">{item.taskTitle}</span>
                        <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider font-mono">
                          AI Func: {AI_FUNCTIONS.find(af => af.id === item.aiFunctionId)?.name}
                        </span>
                      </div>
                      <CheckCircle className="w-4 h-4 text-emerald-750 shrink-0" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-xs text-gray-400 italic py-1">No items mapped to this phase. Adjust slider coordinate ratings to update positions.</div>
              )}
            </div>

            {/* Phase 2: Strategic Development */}
            <div className="bg-gray-50 border border-emerald-100 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-emerald-950 text-white rounded text-[10px] font-extrabold uppercase font-mono">
                  PHASE 2: STRATEGIC BENCHMARK
                </span>
                <span className="text-xs font-bold text-emerald-955 font-display">Medium-Term Structural Goals</span>
              </div>
              <p className="text-xs text-gray-650 leading-relaxed">
                These tasks deliver massive value but require substantial data normalization, API configuration, or cross-department workflows. Plan to launch these as standard milestones on your 60-90 day enterprise technology schedule.
              </p>
              {strategicItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {strategicItems.map(item => (
                    <div key={item.taskId} className="bg-white p-3 rounded-xl border border-gray-200 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-[11px] font-bold text-gray-800 block">{item.taskTitle}</span>
                        <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider font-mono">
                          AI Func: {AI_FUNCTIONS.find(af => af.id === item.aiFunctionId)?.name}
                        </span>
                      </div>
                      <Sparkles className="w-4 h-4 text-emerald-800 shrink-0" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-xs text-gray-400 italic py-1">No items mapped to this phase. Adjust slider coordinate ratings to update positions.</div>
              )}
            </div>

            {/* Optional / Future Items in quick two-column panel */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-xl p-4 space-y-2 bg-gray-50/50">
                <h4 className="text-xs font-bold text-gray-700">Phase 3: Optional Enhancement</h4>
                <ul className="space-y-1 text-gray-600">
                  {optionalItems.map(item => (
                    <li key={item.taskId} className="text-[11px] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-emerald-800 rounded-full shrink-0"></span>
                      <span className="truncate text-gray-650">{item.taskTitle}</span>
                    </li>
                  ))}
                  {optionalItems.length === 0 && <li className="text-[11px] text-gray-400 italic">No items mapped.</li>}
                </ul>
              </div>

              <div className="border border-gray-200 rounded-xl p-4 space-y-2 bg-gray-50/50">
                <h4 className="text-xs font-bold text-gray-700">Phase 4: Future Horizon</h4>
                <ul className="space-y-1 text-gray-600">
                  {futureItems.map(item => (
                    <li key={item.taskId} className="text-[11px] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full shrink-0"></span>
                      <span className="truncate text-gray-655">{item.taskTitle}</span>
                    </li>
                  ))}
                  {futureItems.length === 0 && <li className="text-[11px] text-gray-400 italic">No items mapped.</li>}
                </ul>
              </div>
            </div>

          </div>
        </div>

        {/* 4. Action SOP Recommendations by Audience Type */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-emerald-950 border-b border-gray-150 pb-1.5 uppercase font-display tracking-tight">
            4. Recommended Action Framework
          </h3>
          <div className="p-5 bg-emerald-50/10 border border-emerald-150 rounded-2xl flex gap-4 items-start">
            <Info className="w-5 h-5 text-emerald-800 mt-0.5 shrink-0" />
            <div className="text-xs text-gray-650 leading-relaxed space-y-2">
              {audienceType === "Student" && (
                <div>
                  <h4 className="font-bold text-gray-800 block text-xs">Academic Workshop Follow-Up:</h4>
                  <p>1. <strong>Create prompt profiles:</strong> Take your Phase 1 "Build First" items, write explicit system instructions for Gemini models containing real regulatory references, and test outputs.</p>
                  <p>2. <strong>Evaluate bias risks:</strong> Investigate whether automatic HR metrics tracking introduces algorithmic disparities or violates standard privacy clauses.</p>
                </div>
              )}
              {audienceType === "Manager" && (
                <div>
                  <h4 className="font-bold text-gray-800 block text-xs">Corporate Implementation Roadmap:</h4>
                  <p>1. <strong>Organize an Internal PoC:</strong> Pilot the "Build First" document summaries or ESG data extractors on a restricted dataset (e.g. historical energy invoices) to prove accuracy in under 14 days.</p>
                  <p>2. <strong>Enact a Supplier Code mandate:</strong> Embed automated supplier questionnaire screening into procurement workflow milestones, utilizing standard low-code configurations.</p>
                </div>
              )}
              {audienceType === "Consultant" && (
                <div>
                  <h4 className="font-bold text-gray-800 block text-xs">Client Consulting Strategy:</h4>
                  <p>1. <strong>Design structured templates:</strong> Package this Prioritization Matrix as a baseline deliverables brief to assist clients in establishing clear pilot budgets.</p>
                  <p>2. <strong>Outline gap analysis:</strong> Highlight the gaps in their available data sources before proposing complex custom LLM chains, keeping risk profiles predictable and actionable.</p>
                </div>
              )}
              {audienceType === "AI Designer" && (
                <div>
                  <h4 className="font-bold text-gray-800 block text-xs">Product Spec Next Steps:</h4>
                  <p>1. <strong>Initialize Cognitive Chaining:</strong> Configure specialized system instructions, utilizing prompt-based entity tagging schemas mapped to standard GRI/CSRD classes.</p>
                  <p>2. <strong>Audit logging parameters:</strong> Safeguard storage to ensure telemetry records do not cache client-sensitive energy or legal documents.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Closing Sign-off Section */}
        <div className="pt-10 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-450 gap-4 font-mono font-bold uppercase tracking-wider">
          <span>APPROVED FOR DIGITAL DISTRIBUTION</span>
          <div className="flex gap-4">
            <span>ISO 14001 COMPLIANT ALIGNMENT DESIGN</span>
            <span>GRI FRAMEWORKS MAPPED</span>
          </div>
        </div>

      </div>
    </div>
  );
}
