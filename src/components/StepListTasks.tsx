import React, { useState } from "react";
import { RepeatingTask, EsgSubDomainId } from "../types";
import { SUB_DOMAINS, AI_FUNCTIONS } from "../data";
import { Plus, Trash2, HelpCircle, ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";

interface StepListTasksProps {
  tasks: RepeatingTask[];
  setTasks: React.Dispatch<React.SetStateAction<RepeatingTask[]>>;
  selectedSubDomain: EsgSubDomainId;
  setSelectedSubDomain: (id: EsgSubDomainId) => void;
  nextStep: () => void;
  prevStep: () => void;
  onResetTasks: () => void;
}

export default function StepListTasks({
  tasks,
  setTasks,
  selectedSubDomain,
  setSelectedSubDomain,
  nextStep,
  prevStep,
  onResetTasks
}: StepListTasksProps) {
  const [filterMode, setFilterMode] = useState<"current" | "all">("current");
  
  // Custom task form states
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newPainPoint, setNewPainPoint] = useState("");
  const [newSubDomain, setNewSubDomain] = useState<EsgSubDomainId>("environmental");
  const [newAiFuncId, setNewAiFuncId] = useState("doc_summary");

  const filteredTasks = tasks.filter(t => 
    filterMode === "all" || t.subDomainId === selectedSubDomain
  );

  const activeSubDomainName = SUB_DOMAINS.find(d => d.id === selectedSubDomain)?.name || "";

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const task: RepeatingTask = {
      id: `custom_${Date.now()}`,
      subDomainId: newSubDomain,
      title: newTitle,
      painPoint: newPainPoint || "Data manual collation and administrative burden.",
      defaultAiFunctionId: newAiFuncId,
      defaultOutput: "AI Agent optimized analysis, custom reporting, and structured alerts.",
      custom: true
    };

    setTasks(prev => [...prev, task]);
    
    // Clear state
    setNewTitle("");
    setNewPainPoint("");
    setShowAddForm(false);
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="space-y-8 animate-fade-in" id="step-list-tasks-container">
      {/* Intro Panel */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-[10px] font-bold font-mono tracking-widest uppercase">
          Step 2: Business Analysis & Pain Points
        </div>
        <h2 className="text-2xl font-bold text-emerald-950 tracking-tight font-display">
          Identify and Catalogue Repeating ESG Tasks
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          AI automation delivers maximum value on <strong>repetitive administrative tasks</strong> that represent high operational costs or high compliance risks. Review the standard organizational work queues below, identify their manual friction points, and refine them. Feel free to introduce custom workflows specific to your target organization.
        </p>

        {/* Filters and Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <button
              id="filter-current-btn"
              onClick={() => setFilterMode("current")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                filterMode === "current"
                  ? "bg-emerald-900 text-white"
                  : "bg-gray-100 text-gray-650 hover:bg-gray-200 cursor-pointer"
              }`}
            >
              Filter: {activeSubDomainName} Tasks
            </button>
            <button
              id="filter-all-btn"
              onClick={() => setFilterMode("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                filterMode === "all"
                  ? "bg-emerald-900 text-white"
                  : "bg-gray-100 text-gray-650 hover:bg-gray-200 cursor-pointer"
              }`}
            >
              Show All 6 Sub-domains
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="reset-tasks-btn"
              onClick={onResetTasks}
              className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-gray-400" />
              Reset To Defaults
            </button>
            <button
              id="toggle-add-form-btn"
              onClick={() => {
                setNewSubDomain(selectedSubDomain);
                setShowAddForm(!showAddForm);
              }}
              className="px-3.5 py-1.5 bg-emerald-900 hover:bg-emerald-950 text-white rounded-lg text-xs font-bold inline-flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add Custom ESG Task
            </button>
          </div>
        </div>
      </div>

      {/* Add Custom Task Form Panel */}
      {showAddForm && (
        <form 
          id="custom-task-form"
          onSubmit={handleAddTask} 
          className="bg-gray-50 border border-gray-200 p-6 rounded-2xl space-y-4 animate-scale-in"
        >
          <div className="border-b border-gray-250 pb-2">
            <h3 className="font-bold text-gray-800 text-sm">Add Custom Organizational Workflow Task</h3>
            <span className="text-[10px] text-gray-400">Tailor a unique, repetitive task profile to automate with an AI Agent</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-gray-500 uppercase">Subdomain Target Area</label>
              <select
                id="form-subdomain-select"
                value={newSubDomain}
                onChange={(e) => setNewSubDomain(e.target.value as EsgSubDomainId)}
                className="w-full text-xs p-2.5 bg-white border border-gray-200 rounded-lg font-semibold"
              >
                {SUB_DOMAINS.map(sd => (
                  <option key={sd.id} value={sd.id}>{sd.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-gray-500 uppercase">Default Target AI capability</label>
              <select
                id="form-aifunc-select"
                value={newAiFuncId}
                onChange={(e) => setNewAiFuncId(e.target.value)}
                className="w-full text-xs p-2.5 bg-white border border-gray-200 rounded-lg font-semibold"
              >
                {AI_FUNCTIONS.map(af => (
                  <option key={af.id} value={af.id}>{af.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="block text-[10px] font-bold text-gray-500 uppercase">Task Title</label>
              <input
                type="text"
                id="form-title-en"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g., Audit board independence ratio or Calculate Scope 1, 2, and 3 emissions"
                className="w-full text-xs p-2.5 bg-white border border-gray-200 rounded-lg font-semibold shadow-xs"
              />
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="block text-[10px] font-bold text-gray-500 uppercase">Challenge / Manual Pain Point Explanation</label>
              <textarea
                id="form-pain-en"
                value={newPainPoint}
                onChange={(e) => setNewPainPoint(e.target.value)}
                placeholder="e.g., Cross-checking biographies and financial filings manually takes several employee days."
                rows={3}
                className="w-full text-xs p-2.5 bg-white border border-gray-200 rounded-lg font-semibold shadow-xs"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg text-xs font-bold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              id="submit-add-task-btn"
              className="px-4 py-2 bg-emerald-900 hover:bg-emerald-950 text-white rounded-lg text-xs font-bold shadow-sm cursor-pointer"
            >
              Add Workflow Task
            </button>
          </div>
        </form>
      )}

      {/* Repeating Tasks Catalogue Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTasks.length === 0 ? (
          <div className="col-span-full bg-white border border-gray-200 rounded-2xl p-12 text-center text-gray-400 font-medium">
            No workflow tasks registered under this sub-domain selection. Try adding one!
          </div>
        ) : (
          filteredTasks.map((t) => {
            const domainInfo = SUB_DOMAINS.find(d => d.id === t.subDomainId)!;
            const targetAi = AI_FUNCTIONS.find(af => af.id === t.defaultAiFunctionId);

            return (
              <div 
                key={t.id}
                id={`task-card-${t.id}`}
                className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-200 relative group"
              >
                <div className="space-y-3">
                  {/* Card Header Info */}
                  <div className="flex items-center justify-between gap-2 border-b border-gray-100 pb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-800"></span>
                      <span className="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">
                        {domainInfo.name}
                      </span>
                    </div>
                    {t.custom ? (
                      <span className="text-[8px] font-extrabold bg-blue-50 text-blue-800 px-2 py-0.5 rounded-md border border-blue-200">
                        CUSTOM TASK
                      </span>
                    ) : (
                      <span className="text-[8px] font-semibold bg-gray-100 text-gray-550 px-2 py-0.5 rounded-md">
                        STANDARD
                      </span>
                    )}
                  </div>

                  {/* English Title Only */}
                  <div className="space-y-1">
                    <h4 className="font-bold text-emerald-950 text-sm">
                      {t.title}
                    </h4>
                  </div>

                  {/* Pain Points with elegant visual styling */}
                  <div className="p-3.5 bg-gray-50 border border-gray-150 rounded-xl space-y-1">
                    <div className="flex items-center gap-1 text-[9px] text-emerald-900 font-bold uppercase tracking-wide">
                      <span>CHALLENGE & FRICTION POINT</span>
                    </div>
                    <p className="text-xs text-gray-650 leading-relaxed">
                      {t.painPoint}
                    </p>
                  </div>
                </div>

                {/* Card Footer Match Action */}
                <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between gap-4">
                  <div className="text-[10px] text-gray-500 font-medium">
                    Proposed AI Alignment: <span className="font-bold text-emerald-900">{targetAi?.name || "Pending Match"}</span>
                  </div>
                  {t.custom && (
                    <button
                      onClick={() => handleDeleteTask(t.id)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg hover:text-red-800 transition-all cursor-pointer opacity-80 group-hover:opacity-100"
                      title="Delete Custom Task"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Wizard Lower Controls */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        <button
          onClick={prevStep}
          className="px-5 h-11 border border-gray-300 text-gray-600 hover:bg-gray-50 rounded-lg text-xs font-bold inline-flex items-center gap-2 cursor-pointer transition-all"
        >
          <ArrowLeft className="w-4 h-4 text-gray-400" />
          Step 1: Choose Domain
        </button>
        <button
          onClick={nextStep}
          className="px-5 h-11 bg-emerald-900 hover:bg-emerald-950 text-white rounded-lg text-xs font-bold inline-flex items-center gap-2 cursor-pointer transition-all shadow-md"
        >
          Step 3: Match AI Capabilities
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
