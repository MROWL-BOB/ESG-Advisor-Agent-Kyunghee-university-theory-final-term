import React, { useState } from "react";
import { RecommendationTask, ContinuousActivityLog, MonthlyProgressSummary } from "../types";
import { ClipboardList, LayoutList, Calendar, CheckSquare, Clock, AlertCircle, Plus, Trash2, Loader2, Sparkles, TrendingUp } from "lucide-react";

interface ActionRoadmapProps {
  tasks: RecommendationTask[];
  onTasksUpdate: (updated: RecommendationTask[]) => void;
  activityHistory: ContinuousActivityLog[];
  onActivityAdded: (log: ContinuousActivityLog) => void;
  onActivityCleared: () => void;
  overallScore: number;
}

export default function ActionRoadmap({
  tasks,
  onTasksUpdate,
  activityHistory,
  onActivityAdded,
  onActivityCleared,
  overallScore
}: ActionRoadmapProps) {
  const [filterPilar, setFilterPilar] = useState<"All" | "E" | "S" | "G">("All");
  const [filterStatus, setFilterStatus] = useState<"All" | "ToDo" | "InProgress" | "Completed">("All");

  // Manual New Task form
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newAction, setNewAction] = useState("");
  const [newPilar, setNewPilar] = useState<"E" | "S" | "G">("E");
  const [newPriority, setNewPriority] = useState<"High" | "Medium" | "Low">("Medium");
  const [newDifficulty, setNewDifficulty] = useState<"Easy" | "Moderate" | "Hard">("Easy");
  const [newImpact, setNewImpact] = useState("");

  // AI Monthly Insight states
  const [aiReport, setAiReport] = useState<MonthlyProgressSummary | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // Filter Tasks
  const filteredTasks = tasks.filter((t) => {
    const matchPilar = filterPilar === "All" || t.pilar === filterPilar;
    const matchStatus = filterStatus === "All" || t.status === filterStatus;
    return matchPilar && matchStatus;
  });

  // Calculate local progress rates
  const completedCount = tasks.filter(t => t.status === "Completed").length;
  const progressRatio = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  const handleStatusChange = (id: string, newStatus: "ToDo" | "InProgress" | "Completed") => {
    const foundTask = tasks.find(t => t.id === id);
    if (!foundTask) return;

    const oldStatus = foundTask.status;
    const updated = tasks.map((t) => {
      if (t.id === id) {
        return { ...t, status: newStatus };
      }
      return t;
    });
    onTasksUpdate(updated);

    // If a task changed to Completed, automatically log it in continuous activity history
    if (newStatus === "Completed" && oldStatus !== "Completed") {
      const newLog: ContinuousActivityLog = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric"
        }),
        taskTitle: foundTask.title,
        actionTaken: foundTask.action,
        impactEstimated: foundTask.impact || "Incremental improvement to core sustainability metrics."
      };
      onActivityAdded(newLog);
    }
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newAction.trim()) return;

    const newTask: RecommendationTask = {
      id: `task-${Date.now()}`,
      pilar: newPilar,
      title: newTitle,
      action: newAction,
      priority: newPriority,
      difficulty: newDifficulty,
      impact: newImpact || "Enhances long term baseline operational accountability.",
      status: "ToDo"
    };

    onTasksUpdate([newTask, ...tasks]);
    setNewTitle("");
    setNewAction("");
    setNewImpact("");
    setShowAddForm(false);
  };

  const handleDeleteTask = (id: string) => {
    onTasksUpdate(tasks.filter(t => t.id !== id));
  };

  const generateAIMonthlyRoadmap = async () => {
    setAiLoading(true);
    setAiError(null);
    setAiReport(null);

    try {
      const res = await fetch("/api/esg/monthly-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          historyLog: activityHistory,
          recommendations: tasks.filter(t => t.status !== 'Completed'),
          overallScore
        })
      });

      if (!res.ok) {
        throw new Error("Unable to contacts the ESG Sync service. Please ensure API routes are healthy.");
      }

      const parsed: MonthlyProgressSummary = await res.json();
      setAiReport(parsed);
    } catch (err: any) {
      console.error(err);
      setAiError(err.message || "Failed to generate AI continuous management roadmap.");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="space-y-6" id="esg-action-roadmap">
      {/* Strategic Header Panel */}
      <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl p-6 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-700/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-900/60 text-emerald-200 border border-emerald-800">
              <ClipboardList className="w-3.5 h-3.5 text-emerald-400" /> Sustainability Management System (SMS)
            </span>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight">Continuous ESG Actions & Roadmap</h2>
            <p className="text-slate-300 text-sm max-w-2xl">
              Don't treat ESG as static report paperwork. Keep track of continuous audits, prioritize regulatory items, mark goals completed to update metrics over time, and use the AI Agent to coordinate next month's sustainable priorities.
            </p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 shrink-0 grid grid-cols-2 gap-4 text-center">
            <div>
              <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wide">Tasks Completed</span>
              <span className="block text-2xl font-black text-emerald-400">{completedCount} <span className="text-xs text-slate-400">/ {tasks.length}</span></span>
            </div>
            <div>
              <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wide">Completion Rate</span>
              <span className="block text-2xl font-black text-emerald-400">{progressRatio}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Actions Tracking & Custom Inputs (Left 2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Filters & Control Row */}
          <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-gray-400 mr-2">PILAR:</span>
              {(["All", "E", "S", "G"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setFilterPilar(p)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                    filterPilar === p
                      ? "bg-emerald-800 text-white border-emerald-950"
                      : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {p === "All" ? "All Pilars" : p === "E" ? "Environmental" : p === "S" ? "Social" : "Governance"}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-400 mr-2">STATUS:</span>
              <select
                className="text-xs px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 font-semibold focus:outline-emerald-800"
                value={filterStatus}
                onChange={(e: any) => setFilterStatus(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="ToDo">To Do</option>
                <option value="InProgress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>

              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm inline-flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> New Task
              </button>
            </div>
          </div>

          {/* Add New Custom Task Form */}
          {showAddForm && (
            <div className="bg-gray-50/80 border border-emerald-100 p-5 rounded-2xl space-y-4">
              <h4 className="text-sm font-bold text-emerald-900">Add Continuous Custom ESG Checkpoint</h4>
              
              <form onSubmit={handleAddTask} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label htmlFor="task-title" className="block text-xs font-semibold text-gray-500 mb-1">Task Title *</label>
                  <input
                    id="task-title"
                    type="text"
                    required
                    className="w-full text-xs px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-800 focus:outline-emerald-800"
                    placeholder="e.g., Audit paper use in regional office"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="task-description" className="block text-xs font-semibold text-gray-500 mb-1">Specific Step-by-Step Action Code *</label>
                  <textarea
                    id="task-description"
                    required
                    className="w-full min-h-[60px] text-xs p-3 bg-white border border-gray-200 rounded-lg text-gray-800 focus:outline-emerald-800"
                    placeholder="We will contact corporate purchasing and count high-bleach paper boxes shipped since January..."
                    value={newAction}
                    onChange={(e) => setNewAction(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="task-pilar" className="block text-xs font-semibold text-gray-500 mb-1">ESG Pilar Category</label>
                  <select
                    id="task-pilar"
                    className="w-full text-xs px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-800 focus:outline-emerald-800"
                    value={newPilar}
                    onChange={(e: any) => setNewPilar(e.target.value)}
                  >
                    <option value="E">Environmental (E)</option>
                    <option value="S">Social (S)</option>
                    <option value="G">Governance (G)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="task-priority" className="block text-xs font-semibold text-gray-500 mb-1">Task Priority</label>
                  <select
                    id="task-priority"
                    className="w-full text-xs px-2.5 py-2 bg-white border border-gray-200 rounded-lg text-gray-800 focus:outline-emerald-800"
                    value={newPriority}
                    onChange={(e: any) => setNewPriority(e.target.value)}
                  >
                    <option value="High">High Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="Low">Low Priority</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="task-difficulty" className="block text-xs font-semibold text-gray-500 mb-1">Implementation Difficulty</label>
                  <select
                    id="task-difficulty"
                    className="w-full text-xs px-2.5 py-2 bg-white border border-gray-200 rounded-lg text-gray-800 focus:outline-emerald-800"
                    value={newDifficulty}
                    onChange={(e: any) => setNewDifficulty(e.target.value)}
                  >
                    <option value="Easy">Easy (No budget)</option>
                    <option value="Moderate">Moderate (Requires staff hours)</option>
                    <option value="Hard">Hard (Requires financial investment)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="task-impact" className="block text-xs font-semibold text-gray-500 mb-1">Estimated Impact Description</label>
                  <input
                    id="task-impact"
                    type="text"
                    className="w-full text-xs px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-800 focus:outline-emerald-800"
                    placeholder="e.g., Saves 15 trees yearly and reduces scope 3 waste ratios"
                    value={newImpact}
                    onChange={(e) => setNewImpact(e.target.value)}
                  />
                </div>

                <div className="md:col-span-2 pt-2 flex gap-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg"
                  >
                    Add Task Checkpoint
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2.5 text-xs font-semibold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Core Tasks Grid */}
          {filteredTasks.length === 0 ? (
            <div className="border border-dashed border-gray-200 rounded-2xl p-12 text-center text-gray-400 bg-white">
              <LayoutList className="w-12 h-12 text-gray-200 mx-auto mb-3" />
              <p className="text-sm font-semibold text-gray-600">No active continuous goals found</p>
              <p className="text-xs text-gray-400 mt-1">Try resetting your filters or conduct an audit first to generate recommendations.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className={`bg-white rounded-xl border p-5 transition-all shadow-xs ${
                    task.status === "Completed" ? "border-emerald-100 opacity-80" : "border-gray-100"
                  }`}
                >
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center flex-wrap gap-2">
                        {/* Pilar Indicator Tag */}
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${
                          task.pilar === 'E' ? 'bg-emerald-50 text-emerald-800 border-emerald-100' :
                          task.pilar === 'S' ? 'bg-indigo-50 text-indigo-800 border-indigo-100' :
                          'bg-amber-50 text-amber-800 border-amber-100'
                        }`}>
                          {task.pilar === 'E' ? 'Environmental' : task.pilar === 'S' ? 'Social' : 'Governance'}
                        </span>

                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                          task.priority === 'High' ? 'bg-rose-50 text-rose-700' :
                          task.priority === 'Medium' ? 'bg-amber-50 text-amber-700' : 'bg-slate-50 text-slate-700'
                        }`}>
                          {task.priority} Priority
                        </span>

                        <span className="text-[10px] text-gray-400 font-semibold bg-gray-50 px-2 py-0.5 rounded">
                          Diff: {task.difficulty}
                        </span>
                      </div>

                      <h3 className={`text-base font-bold pt-1.5 ${task.status === 'Completed' ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                        {task.title}
                      </h3>
                      
                      <p className="text-xs text-gray-600 font-medium whitespace-pre-line leading-relaxed">{task.action}</p>
                      
                      {task.impact && (
                        <p className="text-[11px] text-emerald-800 bg-emerald-50/40 px-2.5 py-1 rounded inline-block mt-2">
                          <span className="font-bold">Metric Impact:</span> {task.impact}
                        </p>
                      )}
                    </div>

                    {/* Status Modifiers */}
                    <div className="shrink-0 flex items-center md:flex-col gap-2 w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-gray-100">
                      <span className="text-[10px] font-bold text-gray-400 block uppercase">Status Control</span>
                      <div className="flex gap-1.5">
                        {(["ToDo", "InProgress", "Completed"] as const).map((st) => (
                          <button
                            key={st}
                            onClick={() => handleStatusChange(task.id, st)}
                            className={`px-2.5 py-1 rounded text-[11px] font-bold border transition-colors ${
                              task.status === st
                                ? st === "Completed" ? "bg-emerald-800 text-white border-emerald-950" :
                                  st === "InProgress" ? "bg-amber-500 text-white border-amber-600" :
                                  "bg-slate-700 text-white border-slate-800"
                                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                            }`}
                          >
                            {st === "ToDo" ? "To Do" : st === "InProgress" ? "Doing" : "Done"}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="md:mt-4 p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors ml-auto md:ml-0"
                        title="Delete task"
                        aria-label={`Delete task ${task.title}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* AI Strategic Planning & Metric Event History Log (Right 1 col) */}
        <div className="space-y-6">
          
          {/* AI Advisor Strategic Month-Lock Roadmap */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4.5 h-4.5 text-emerald-700 animate-pulse" /> Monthly Strategic Lock
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Compile your completed activities database alongside outstanding tasks to receive continuous goals generated by the AI-powered ESG Diagnostic Agent.
            </p>

            <button
              onClick={generateAIMonthlyRoadmap}
              disabled={aiLoading}
              className="w-full py-2.5 rounded-lg text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 shadow-sm flex items-center justify-center gap-1.5 transition-all"
            >
              {aiLoading ? (
                <>
                  <Loader2 className="w-4.5 h-4.5 animate-spin" /> Synthesizing roadmap...
                </>
              ) : (
                <>
                  <TrendingUp className="w-4 h-4" /> Generate Next-Month Strategic Plan
                </>
              )}
            </button>

            {aiError && (
              <div className="p-3 bg-rose-50 rounded-xl text-rose-800 text-[11px] border border-rose-100 leading-snug">
                {aiError}
              </div>
            )}

            {aiReport && (
              <div className="border border-emerald-100 bg-emerald-50/15 p-4 rounded-xl space-y-3 animation-fade-in text-xs text-gray-700">
                <div>
                  <span className="font-extrabold text-[10px] text-emerald-800 uppercase block mb-1">AI Progress Assessment</span>
                  <p className="leading-relaxed text-gray-800">{aiReport.summary}</p>
                </div>

                {aiReport.unsolvedRiskWarning && (
                  <div className="p-3 bg-red-50 text-red-800 border border-red-150 rounded-lg text-[11px]">
                    <span className="font-extrabold uppercase block mb-0.5 text-[9px] text-red-650 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 text-red-600" /> Pending Compliance Risk Alert
                    </span>
                    <p className="leading-snug">{aiReport.unsolvedRiskWarning}</p>
                  </div>
                )}

                <div>
                  <span className="font-extrabold text-[10px] text-emerald-800 uppercase block mb-1">Target Actions Next Month</span>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 pl-1 font-medium">
                    {aiReport.nextMonthActionHighlights.map((hl, idx) => (
                      <li key={idx} className="leading-relaxed">{hl}</li>
                    ))}
                  </ul>
                </div>

                <div className="text-[11px] text-gray-500 italic pt-1 border-t border-gray-100 leading-relaxed">
                  {aiReport.motivationalInsights}
                </div>
              </div>
            )}
          </div>

          {/* Continuous Activity log tracker */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">
                Completed Milestones Log
              </h3>
              {activityHistory.length > 0 && (
                <button
                  onClick={onActivityCleared}
                  className="text-[10px] font-bold text-rose-500 hover:hover:text-rose-600 transition-colors"
                >
                  Clear History
                </button>
              )}
            </div>

            <p className="text-xs text-gray-400">
              When you mark a task as completed above, it is automatically logged into your continuous corporate sustainability auditable log below.
            </p>

            {activityHistory.length === 0 ? (
              <div className="border border-dashed border-gray-150 rounded-xl p-6 text-center text-gray-300">
                <Calendar className="w-8 h-8 mx-auto mb-1 text-gray-250" />
                <span className="text-[11px] font-semibold text-gray-400">No milestones registered yet</span>
              </div>
            ) : (
              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {activityHistory.map((log) => (
                  <div key={log.id} className="p-3 bg-gray-50 border border-gray-100 rounded-lg space-y-1">
                    <div className="flex justify-between text-[10px] text-gray-400">
                      <span className="font-bold text-emerald-800">{log.timestamp}</span>
                      <span>Verified Action</span>
                    </div>
                    <span className="block font-bold text-gray-800 text-xs">{log.taskTitle}</span>
                    <p className="text-[11px] text-gray-500 leading-snug">{log.actionTaken}</p>
                    <span className="block text-[10px] text-emerald-800 italic pt-1 border-t border-gray-100/50">
                      Impact: {log.impactEstimated}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
