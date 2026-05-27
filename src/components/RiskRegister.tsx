import React, { useState, useEffect } from "react";
import { DiagnosticResult, RecommendationTask } from "../types";
import { 
  AlertOctagon, 
  Plus, 
  Trash2, 
  ShieldAlert, 
  Check, 
  FolderLock, 
  Link2, 
  Calendar, 
  Clock, 
  Flag, 
  Award, 
  Sparkles, 
  UserSquare2,
  BellRing
} from "lucide-react";

interface RiskRegisterProps {
  diagResult: DiagnosticResult;
  tasks: RecommendationTask[];
  onUpdateTask: (task: RecommendationTask) => void;
}

interface EsgGoal {
  id: string;
  pilar: "E" | "S" | "G";
  title: string;
  targetYear: number;
  currentValue: string;
  targetValue: string;
  completed: boolean;
}

interface RiskItem {
  id: string;
  pilar: "E" | "S" | "G";
  title: string;
  category: "Regulatory" | "Operational" | "Reputational" | "Supply Chain";
  impactSeverity: "High" | "Medium" | "Low";
  likelihood: "High" | "Medium" | "Low";
  remediationPlan: string;
}

export default function RiskRegister({ diagResult, tasks, onUpdateTask }: RiskRegisterProps) {
  // Goal setting local states with persistent localStorage sync
  const [goals, setGoals] = useState<EsgGoal[]>(() => {
    const saved = localStorage.getItem("esg_goals");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      { id: "g-1", pilar: "E", title: "Transition fleet logistics to 100% electric/hybrid drivetrains", targetYear: 2028, currentValue: "10% active", targetValue: "100%", completed: false },
      { id: "g-2", pilar: "S", title: "Perform an annual comprehensive gender remuneration audit", targetYear: 2026, currentValue: "None", targetValue: "Completed annually", completed: false },
      { id: "g-3", pilar: "G", title: "Lift independent board advisors representation to above 50%", targetYear: 2027, currentValue: "33% representation", targetValue: ">50%", completed: false },
    ];
  });

  // Risk inventory factors
  const [risks, setRisks] = useState<RiskItem[]>(() => {
    const saved = localStorage.getItem("esg_risks");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      { id: "r-1", pilar: "E", title: "Carbon emission tariff adjustments and border taxation rules", category: "Regulatory", impactSeverity: "High", likelihood: "Medium", remediationPlan: "Calculate Scope 1/2 calculations to obtain offset guarantees." },
      { id: "r-2", pilar: "G", title: "Lack of explicit anti-corruption whistleblower channels leads to prosecution risk", category: "Regulatory", impactSeverity: "High", likelihood: "Low", remediationPlan: "Publish independent conduct terms on stakeholder landing portal." },
      { id: "r-3", pilar: "S", title: "Reputational boycotts stemming from unverified vendor human rights records", category: "Supply Chain", impactSeverity: "Medium", likelihood: "Medium", remediationPlan: "Run active screening audits using standard supplier ethical pact templates." },
    ];
  });

  // Goal modal inputs
  const [goalTitle, setGoalTitle] = useState("");
  const [goalPilar, setGoalPilar] = useState<"E" | "S" | "G">("E");
  const [goalYear, setGoalYear] = useState(2027);
  const [goalCurrent, setGoalCurrent] = useState("");
  const [goalTarget, setGoalTarget] = useState("");

  // Risk modal inputs
  const [riskTitle, setRiskTitle] = useState("");
  const [riskPilar, setRiskPilar] = useState<"E" | "S" | "G">("E");
  const [riskCategory, setRiskCategory] = useState<"Regulatory" | "Operational" | "Reputational" | "Supply Chain">("Regulatory");
  const [riskSeverity, setRiskSeverity] = useState<"High" | "Medium" | "Low">("Medium");
  const [riskLikelihood, setRiskLikelihood] = useState<"High" | "Medium" | "Low">("Medium");
  const [riskPlan, setRiskPlan] = useState("");

  // Evidence upload binder states
  const [bindTaskId, setBindTaskId] = useState("");
  const [evidenceName, setEvidenceName] = useState("");
  const [evidenceUrl, setEvidenceUrl] = useState("");

  // Synchronize values with localStorage
  useEffect(() => {
    localStorage.setItem("esg_goals", JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem("esg_risks", JSON.stringify(risks));
  }, [risks]);

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goalTitle.trim()) return;
    const newGoal: EsgGoal = {
      id: "g-" + Date.now(),
      pilar: goalPilar,
      title: goalTitle,
      targetYear: Number(goalYear),
      currentValue: goalCurrent || "Not baseline",
      targetValue: goalTarget,
      completed: false
    };
    setGoals((prev) => [...prev, newGoal]);
    setGoalTitle("");
    setGoalCurrent("");
    setGoalTarget("");
  };

  const handleDeleteGoal = (id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  };

  const handleToggleGoal = (id: string) => {
    setGoals((prev) => prev.map((g) => g.id === id ? { ...g, completed: !g.completed } : g));
  };

  const handleAddRisk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!riskTitle.trim()) return;
    const newRisk: RiskItem = {
      id: "r-" + Date.now(),
      pilar: riskPilar,
      title: riskTitle,
      category: riskCategory,
      impactSeverity: riskSeverity,
      likelihood: riskLikelihood,
      remediationPlan: riskPlan || "Remediation parameters in formulation."
    };
    setRisks((prev) => [...prev, newRisk]);
    setRiskTitle("");
    setRiskPlan("");
  };

  const handleDeleteRisk = (id: string) => {
    setRisks((prev) => prev.filter((r) => r.id !== id));
  };

  // Associate evidence documents to a specific Roadmap Task to track files
  const handleAttachEvidence = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bindTaskId || !evidenceName) return;

    const target = tasks.find((t) => t.id === bindTaskId);
    if (target) {
      const updated: RecommendationTask = {
        ...target,
        evidenceName: evidenceName,
        evidenceUrl: evidenceUrl || "#"
      };
      onUpdateTask(updated);
      setEvidenceName("");
      setEvidenceUrl("");
      setBindTaskId("");
    }
  };

  // Dynamic Deadline calculations
  const getDaysRemaining = (deadlineDateString?: string) => {
    if (!deadlineDateString) return null;
    const diffTime = new Date(deadlineDateString).getTime() - new Date().getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-8" id="compliance-risk-register">
      
      {/* Risk Grid Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Compliance Readiness widget */}
        <div className="bg-white rounded-2xl border border-gray-150 p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-50 text-amber-900 rounded-xl flex items-center justify-center shrink-0">
            <ShieldAlert className="w-6 h-6 text-amber-700 font-bold" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">Climate Compliance Readiness</span>
            <span className="text-2xl font-extrabold text-gray-950 block mt-0.5">{diagResult.complianceReadinessScore || 48}%</span>
            <p className="text-[10px] text-gray-400 mt-1">Calculated ratio considering outstanding high-priority tasks.</p>
          </div>
        </div>

        {/* Global Risk Level widget */}
        <div className="bg-white rounded-2xl border border-gray-150 p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 bg-rose-50 text-rose-900 rounded-xl flex items-center justify-center shrink-0">
            <AlertOctagon className="w-6 h-6 text-rose-700" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">Unshielded Risk Factors</span>
            <span className="text-2xl font-extrabold text-gray-950 block mt-0.5">{risks.length} Exposure Points</span>
            <p className="text-[10px] text-gray-400 mt-1">Identified operational, logistical, or legal liabilities.</p>
          </div>
        </div>

        {/* Document Repository evidence counter */}
        <div className="bg-white rounded-2xl border border-gray-155 p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-900 rounded-xl flex items-center justify-center shrink-0">
            <FolderLock className="w-6 h-6 text-emerald-700" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">Evidence Files In Repository</span>
            <span className="text-2xl font-extrabold text-gray-950 block mt-0.5">
              {tasks.filter((t) => t.evidenceName).length} Auditor Logs
            </span>
            <p className="text-[10px] text-gray-400 mt-1">Validated file links validating completed policies.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* PANEL A: GOAL SETTING MODULE */}
        <div className="bg-white rounded-2xl border border-gray-150 p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3.5">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-800" />
              <div>
                <h3 className="font-extrabold text-gray-900 text-sm">Long-Term ESG Goals</h3>
                <p className="text-[10px] text-gray-400">Establish and monitor structural corporate commitments.</p>
              </div>
            </div>
          </div>

          {/* Goal List */}
          <div className="space-y-3 max-h-[220px] overflow-y-auto pr-2">
            {goals.map((g) => (
              <div key={g.id} className="p-3 border border-gray-100 rounded-xl bg-gray-50 flex items-center justify-between gap-3 hover:bg-gray-50/80 transition-colors">
                <div className="space-y-1.5 flex-1 select-none">
                  <div className="flex items-center gap-2">
                    <span className={`text-[8px] font-black px-1.5 py-0.5 rounded ${
                      g.pilar === 'E' ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' :
                      g.pilar === 'S' ? 'bg-indigo-50 text-indigo-800 border border-indigo-100' : 'bg-amber-50 text-amber-850 border border-amber-100'
                    }`}>
                      {g.pilar} Pilar
                    </span>
                    <span className="text-[10px] font-extrabold text-gray-400"><Clock className="w-2.5 h-2.5 inline mr-1" /> Target {g.targetYear}</span>
                  </div>
                  <h4 className={`text-xs font-bold leading-relaxed ${g.completed ? "line-through text-gray-450 text-sm font-medium" : "text-gray-800"}`}>{g.title}</h4>
                  <div className="grid grid-cols-2 gap-2 text-[10px] text-gray-450">
                    <div><span>Current: <strong>{g.currentValue}</strong></span></div>
                    <div><span>Target: <strong className="text-emerald-900">{g.targetValue}</strong></span></div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => handleToggleGoal(g.id)}
                    className={`p-1.5 rounded-lg border transition-all ${
                      g.completed 
                        ? "bg-emerald-800 text-white border-emerald-950" 
                        : "bg-white text-gray-500 border-gray-200 hover:bg-emerald-50 hover:text-emerald-800"
                    }`}
                    title="Mark Goal as Secured"
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleDeleteGoal(g.id)}
                    className="p-1.5 rounded-lg border border-gray-200 text-gray-400 bg-white hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Form to declare Goal */}
          <form onSubmit={handleAddGoal} className="p-4 rounded-xl border border-dashed border-gray-200 space-y-3">
            <span className="text-xs font-bold text-gray-700 flex items-center gap-1"><Plus className="w-4 h-4 text-emerald-800" /> Declare Corporate Target Goal</span>
            
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <input
                  type="text"
                  required
                  className="w-full text-xs px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-emerald-800 placeholder-gray-400 text-gray-800 font-semibold"
                  placeholder="What is your target commitment?"
                  value={goalTitle}
                  onChange={(e) => setGoalTitle(e.target.value)}
                />
              </div>

              <div>
                <select
                  className="w-full text-xs px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-emerald-800 font-bold text-gray-800"
                  value={goalPilar}
                  onChange={(e) => setGoalPilar(e.target.value as any)}
                >
                  <option value="E">Environmental</option>
                  <option value="S">Social</option>
                  <option value="G">Governance</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <input
                  type="number"
                  className="w-full text-xs px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-emerald-800 font-semibold text-gray-800"
                  placeholder="Target Year"
                  value={goalYear}
                  onChange={(e) => setGoalYear(Number(e.target.value))}
                />
              </div>

              <div>
                <input
                  type="text"
                  className="w-full text-xs px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-emerald-800 placeholder-gray-400 text-gray-800"
                  placeholder="Base Status"
                  value={goalCurrent}
                  onChange={(e) => setGoalCurrent(e.target.value)}
                />
              </div>

              <div>
                <input
                  type="text"
                  required
                  className="w-full text-xs px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-emerald-800 placeholder-gray-400 text-gray-800 font-semibold"
                  placeholder="KPI Target Value"
                  value={goalTarget}
                  onChange={(e) => setGoalTarget(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-bold transition-colors"
            >
              Commit Long-Term Goal
            </button>
          </form>
        </div>

        {/* PANEL B: COMPREHENSIVE RISK REGISTER */}
        <div className="bg-white rounded-2xl border border-gray-150 p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3.5">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-emerald-800" />
              <div>
                <h3 className="font-extrabold text-gray-900 text-sm">Regulatory & Reputational Risk Register</h3>
                <p className="text-[10px] text-gray-400">Inventory and proactively mitigate regulatory sustainability friction points.</p>
              </div>
            </div>
          </div>

          <div className="space-y-3 max-h-[220px] overflow-y-auto pr-2">
            {risks.map((r) => (
              <div key={r.id} className="p-3.5 border border-gray-100 rounded-xl bg-gray-50 flex items-start justify-between gap-3 hover:bg-gray-50/80 transition-colors">
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className={`text-[8px] font-black px-1.5 py-0.5 rounded border ${
                      r.pilar === 'E' ? 'bg-emerald-50 text-emerald-800 border-emerald-100' :
                      r.pilar === 'S' ? 'bg-indigo-50 text-indigo-800 border-indigo-100' : 'bg-amber-50 text-amber-850 border-amber-100'
                    }`}>
                      {r.pilar} Pilar
                    </span>
                    <span className="text-[9px] font-extrabold bg-gray-150 text-gray-550 border border-gray-200 px-1.5 py-0.5 rounded">
                      {r.category} Exposure
                    </span>
                    <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded border ${
                      r.impactSeverity === 'High' ? 'bg-rose-50 text-rose-800 border-rose-100 font-extrabold animate-pulse' :
                      r.impactSeverity === 'Medium' ? 'bg-amber-50 text-amber-850 border-amber-100' : 'bg-gray-50 text-gray-550 border-gray-200'
                    }`}>
                      Severity: {r.impactSeverity}
                    </span>
                  </div>
                  <h4 className="text-xs font-black text-gray-800 leading-normal">{r.title}</h4>
                  <p className="text-[10px] text-gray-500 italic leading-relaxed"><span className="font-bold text-gray-600 not-italic">Remediation:</span> {r.remediationPlan}</p>
                </div>

                <div className="shrink-0">
                  <button
                    onClick={() => handleDeleteRisk(r.id)}
                    className="p-1.5 rounded-lg border border-gray-200 text-gray-400 bg-white hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleAddRisk} className="p-4 rounded-xl border border-dashed border-gray-200 space-y-3">
            <span className="text-xs font-bold text-gray-700 flex items-center gap-1"><Plus className="w-4 h-4 text-emerald-800" /> Log Compliance Vulnerability</span>
            
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                required
                className="w-full text-xs px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-emerald-800 placeholder-gray-400 text-gray-800 font-semibold"
                placeholder="Declare risk factor title..."
                value={riskTitle}
                onChange={(e) => setRiskTitle(e.target.value)}
              />
              <select
                className="w-full text-xs px-2 pb-1.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-emerald-800 font-bold text-gray-800"
                value={riskCategory}
                onChange={(e) => setRiskCategory(e.target.value as any)}
              >
                <option value="Regulatory">Regulatory Gap</option>
                <option value="Operational">Operational Inefficiency</option>
                <option value="Reputational">Reputational Threat</option>
                <option value="Supply Chain">Supply Vendor Liability</option>
              </select>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <select
                className="w-full text-xs px-2 py-1.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-emerald-800 font-bold text-gray-800"
                value={riskPilar}
                onChange={(e) => setRiskPilar(e.target.value as any)}
              >
                <option value="E">Environmental</option>
                <option value="S">Social Pilar</option>
                <option value="G">Governance</option>
              </select>
              <select
                className="w-full text-xs px-2 py-1.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-emerald-800 font-bold text-gray-800"
                value={riskSeverity}
                onChange={(e) => setRiskSeverity(e.target.value as any)}
                title="Impact severity level"
              >
                <option value="High">Severity: High</option>
                <option value="Medium">Severity: Medium</option>
                <option value="Low">Severity: Low</option>
              </select>
              <select
                className="w-full text-xs px-2 py-1.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-emerald-800 font-bold text-gray-800"
                value={riskLikelihood}
                onChange={(e) => setRiskLikelihood(e.target.value as any)}
                title="Likelihood tier"
              >
                <option value="High">Likelihood: High</option>
                <option value="Medium">Likelihood: Medium</option>
                <option value="Low">Likelihood: Low</option>
              </select>
            </div>

            <input
              type="text"
              required
              className="w-full text-xs px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-emerald-800 placeholder-gray-400 text-gray-800"
              placeholder="What is the mitigation/remediation task?"
              value={riskPlan}
              onChange={(e) => setRiskPlan(e.target.value)}
            />

            <button
              type="submit"
              className="w-full py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-bold transition-colors"
            >
              Secure Risk Register Placement
            </button>
          </form>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* PANEL C: EVIDENCE & DOCUMENT REPOSITORY */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-150 p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3.5">
            <div className="flex items-center gap-2">
              <FolderLock className="w-5 h-5 text-emerald-800" />
              <div>
                <h3 className="font-extrabold text-gray-900 text-sm">Regulatory Evidence Repository</h3>
                <p className="text-[10px] text-gray-400">Store and map policy links directly to active scorecard tasks for auditable certification.</p>
              </div>
            </div>
          </div>

          {/* Sourcing Tasks List showing attached evidence files */}
          <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-1">
            {tasks.map((t) => (
              <div key={t.id} className="p-3.5 rounded-xl border border-gray-100 bg-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${
                      t.pilar === 'E' ? 'bg-emerald-50 text-emerald-800' :
                      t.pilar === 'S' ? 'bg-indigo-50 text-indigo-800' : 'bg-amber-50 text-amber-850'
                    }`}>
                      Pilar {t.pilar}
                    </span>
                    <span className="text-[9px] font-semibold text-gray-450 uppercase">{t.status} status</span>
                  </div>
                  <h4 className="text-xs font-bold text-gray-800">{t.title}</h4>
                  <p className="text-[10px] text-gray-500 leading-normal">{t.action}</p>

                  {/* Evidence Display badge */}
                  {t.evidenceName ? (
                    <div className="pt-2 text-[10px] font-semibold text-emerald-900 flex items-center gap-1">
                      <Link2 className="w-3.5 h-3.5 text-emerald-700" />
                      Associated Evidence: <strong className="underline decoration-dashed select-all">{t.evidenceName}</strong>
                    </div>
                  ) : (
                    <div className="pt-2 text-[10px] text-gray-400 flex items-center gap-1 leading-normal italic">
                      ⚠ Lacking auditable evidence attachment (unverified).
                    </div>
                  )}
                </div>

                {/* Edit assignees and deadlines inline */}
                <div className="text-[10px] space-y-1 shrink-0 text-gray-450 md:text-right border-t md:border-t-0 pt-2 md:pt-0">
                  <p><UserSquare2 className="w-3 h-3 inline mr-1 text-gray-400" /> Assignee: <strong className="text-gray-700">{t.assignee || "Not assigned"}</strong></p>
                  <p><Calendar className="w-3 h-3 inline mr-1 text-gray-400" /> Target Date: <strong className="text-gray-700">{t.deadline || "None"}</strong></p>
                </div>
              </div>
            ))}
          </div>

          {/* Form to bind Evidence */}
          <form onSubmit={handleAttachEvidence} className="p-4 rounded-xl border border-dashed border-gray-200 bg-gray-50/50 space-y-3">
            <span className="text-xs font-bold text-gray-700 flex items-center gap-1">
              <Link2 className="w-4 h-4 text-emerald-800" /> Attach Audit Compliance Evidence to Active Task
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <select
                  required
                  className="w-full text-xs px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-emerald-800 text-gray-800 font-semibold"
                  value={bindTaskId}
                  onChange={(e) => setBindTaskId(e.target.value)}
                >
                  <option value="">-- Choose Target Task to Audit --</option>
                  {tasks.map((t) => (
                    <option key={t.id} value={t.id}>[{t.pilar}] {t.title.substring(0, 45)}...</option>
                  ))}
                </select>
              </div>

              <div>
                <input
                  type="text"
                  required
                  className="w-full text-xs px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-emerald-800 placeholder-gray-400 text-gray-800"
                  placeholder="e.g., carbon_baseline_v2_audited.pdf or gdpr_iso27001_certificate.txt"
                  value={evidenceName}
                  onChange={(e) => setEvidenceName(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-bold transition-colors"
            >
              Verify Evidence Placement
            </button>
          </form>
        </div>

        {/* PANEL D: ACTION DEADLINE REMINDERS */}
        <div className="bg-white rounded-2xl border border-gray-150 p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3.5">
            <div className="flex items-center gap-2">
              <BellRing className="w-5 h-5 text-emerald-800 animate-swing" />
              <div>
                <h3 className="font-extrabold text-gray-900 text-sm">Action Deadline Reminders</h3>
                <p className="text-[10px] text-gray-400">Imminent and pending milestones requiring priority attention.</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
            {tasks.filter((t) => t.deadline || t.status !== "Completed").map((t) => {
              const daysRemaining = t.deadline ? getDaysRemaining(t.deadline) : null;
              const isOverdue = daysRemaining !== null && daysRemaining < 0;
              const isImminent = daysRemaining !== null && daysRemaining >= 0 && daysRemaining <= 15;

              return (
                <div key={t.id} className="p-3.5 rounded-xl border border-gray-100 bg-gray-50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`text-[9px] font-black px-1.5 py-0.5 rounded ${
                      t.priority === 'High' ? 'bg-rose-50 text-rose-800' :
                      t.priority === 'Medium' ? 'bg-amber-50 text-amber-80 *' : 'bg-gray-50 text-gray-550'
                    }`}>
                      {t.priority} Priority
                    </span>

                    {/* Deadline labels */}
                    {daysRemaining !== null ? (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isOverdue ? "bg-rose-100 text-rose-900 border border-rose-200 font-extrabold animate-pulse" :
                        isImminent ? "bg-amber-100 text-amber-900 border border-amber-200" :
                        "bg-emerald-100 text-emerald-900 border border-emerald-200"
                      }`}>
                        {isOverdue ? "OVERDUE" : isImminent ? `${daysRemaining} days remaining` : `${daysRemaining} days left`}
                      </span>
                    ) : (
                      <span className="text-[9px] text-gray-400 block font-semibold">No Target Date assigned</span>
                    )}
                  </div>

                  <h4 className="text-xs font-bold text-gray-800 tracking-tight">{t.title}</h4>
                  
                  {/* Inline assign field */}
                  <div className="grid grid-cols-2 gap-3 text-[10px] text-gray-500 pt-1.5 border-t border-gray-100/50">
                    <div>
                      <span>Responsible: <strong className="text-gray-700">{t.assignee || "Not assigned"}</strong></span>
                    </div>
                    <div>
                      <span>Deadline: <strong className="text-emerald-900">{t.deadline || "Set date"}</strong></span>
                    </div>
                  </div>

                  {/* Quick assignment inline input */}
                  <div className="pt-2 flex gap-1.5">
                    <input
                      type="text"
                      className="text-[9px] px-2 py-1 bg-white border border-gray-200 rounded-lg focus:outline-emerald-800 text-gray-800 placeholder-gray-400 flex-1"
                      placeholder="Assign person..."
                      defaultValue={t.assignee || ""}
                      onBlur={(e) => {
                        if (e.target.value !== t.assignee) {
                          onUpdateTask({ ...t, assignee: e.target.value });
                        }
                      }}
                    />
                    <input
                      type="date"
                      className="text-[9px] px-1.5 py-1 bg-white border border-gray-200 rounded-lg focus:outline-emerald-800 text-gray-800"
                      defaultValue={t.deadline || ""}
                      onChange={(e) => {
                        onUpdateTask({ ...t, deadline: e.target.value });
                      }}
                    />
                  </div>
                </div>
              );
            })}

            {tasks.length === 0 && (
              <div className="p-8 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200 text-xs text-gray-400">
                Lacking open diagnostic suggestions. Run audit wizard to declare roadmap items.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
