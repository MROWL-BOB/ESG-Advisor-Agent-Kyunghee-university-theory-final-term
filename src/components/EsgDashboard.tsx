import React, { useState } from "react";
import { 
  Building, 
  ShieldAlert, 
  LineChart, 
  TrendingUp, 
  CheckCircle, 
  Leaf, 
  Users, 
  ShieldCheck, 
  Truck, 
  FileText, 
  Zap, 
  AlertTriangle 
} from "lucide-react";

interface EsgDashboardProps {
  organizationName: string;
  industrySector: string;
  onNavigateToChat: (prefilled: string) => void;
  onNavigateToDemo: () => void;
}

export default function EsgDashboard({
  organizationName,
  industrySector,
  onNavigateToChat,
  onNavigateToDemo
}: EsgDashboardProps) {
  const [selectedTab, setSelectedTab] = useState<"E" | "S" | "G" | "Supplier" | "Reporting" | "Sustainability">("E");

  const metricCards = [
    { title: "ESG Readiness", value: "76%", icon: LineChart, color: "text-emerald-700 bg-emerald-50 border-emerald-150" },
    { title: "Data Completeness", value: "68%", icon: CheckCircle, color: "text-blue-700 bg-blue-50 border-blue-150" },
    { title: "Risk Attention", value: "Medium", icon: ShieldAlert, color: "text-amber-800 bg-amber-50 border-amber-150" },
    { title: "Action Progress", value: "54%", icon: TrendingUp, color: "text-teal-700 bg-teal-50 border-teal-150" },
    { title: "Priority Tasks", value: "6", icon: Zap, color: "text-indigo-750 bg-indigo-50 border-indigo-150" }
  ];

  return (
    <div className="space-y-8 animate-fade-in" id="esg-dashboard-container">
      {/* SaaS Summary Header */}
      <div className="bg-emerald-950 text-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-900 text-emerald-300 rounded text-[10px] font-mono uppercase tracking-wider font-semibold">
            ESG Management Suite
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold font-display tracking-tight">
            {organizationName || "Your Organization"} Dashboard
          </h2>
          <p className="text-sm text-emerald-100/80 max-w-xl">
            Continuous sustainability portfolio tracker, risk monitor, and executive reporting compiler for the <strong className="text-white font-semibold">{industrySector}</strong> sector.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onNavigateToDemo}
            className="px-4 py-2 bg-emerald-905 hover:bg-emerald-950 text-white rounded-lg text-xs font-bold ring-1 ring-emerald-800 transition-all cursor-pointer inline-flex items-center gap-2"
          >
            Run Active Audit
          </button>
          <button
            onClick={() => onNavigateToChat("Summarize our ESG readiness for management.")}
            className="px-4.5 py-2 bg-white hover:bg-gray-100 text-emerald-950 rounded-lg text-xs font-bold shadow-sm transition-all cursor-pointer inline-flex items-center gap-1.5"
          >
            Consult AI Advisor
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {metricCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div 
              key={i} 
              id={`metric-card-${i}`}
              className={`p-4 border rounded-2xl flex flex-col justify-between h-28 hover:shadow-xs transition-shadow bg-white ${card.color}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">{card.title}</span>
                <Icon className="w-4 h-4 opacity-75" />
              </div>
              <div className="text-2xl md:text-3xl font-extrabold font-display tracking-tight leading-none">
                {card.value}
              </div>
            </div>
          );
        })}
      </div>

      {/* Core Insights Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Hand: Category Selectors & Tab Sheets (lg:col-span-8) */}
        <div className="lg:col-span-8 bg-white border border-gray-200 rounded-2xl p-6 space-y-6 shadow-xs">
          <div className="border-b border-gray-200">
            <h3 className="font-bold text-gray-900 text-sm pb-1 uppercase tracking-wide">ESG Dimension Portfolio Insights</h3>
            <span className="text-[11px] text-gray-400">Review critical compliance risks and active operational milestones across dimensions</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTab("E")}
              className={`px-4 py-2 rounded-lg text-xs font-bold cursor-pointer flex items-center gap-2 ${
                selectedTab === "E" ? "bg-emerald-900 text-white shadow-xs" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Leaf className="w-3.5 h-3.5" />
              Environmental
            </button>
            <button
              onClick={() => setSelectedTab("S")}
              className={`px-4 py-2 rounded-lg text-xs font-bold cursor-pointer flex items-center gap-2 ${
                selectedTab === "S" ? "bg-emerald-900 text-white shadow-xs" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              Social
            </button>
            <button
              onClick={() => setSelectedTab("G")}
              className={`px-4 py-2 rounded-lg text-xs font-bold cursor-pointer flex items-center gap-2 ${
                selectedTab === "G" ? "bg-emerald-900 text-white shadow-xs" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Governance
            </button>
            <button
              onClick={() => setSelectedTab("Supplier")}
              className={`px-4 py-2 rounded-lg text-xs font-bold cursor-pointer flex items-center gap-2 ${
                selectedTab === "Supplier" ? "bg-emerald-900 text-white shadow-xs" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              Supplier ESG
            </button>
            <button
              onClick={() => setSelectedTab("Reporting")}
              className={`px-4 py-2 rounded-lg text-xs font-bold cursor-pointer flex items-center gap-2 ${
                selectedTab === "Reporting" ? "bg-emerald-900 text-white shadow-xs" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Reporting
            </button>
            <button
              onClick={() => setSelectedTab("Sustainability")}
              className={`px-4 py-2 rounded-lg text-xs font-bold cursor-pointer flex items-center gap-2 ${
                selectedTab === "Sustainability" ? "bg-emerald-900 text-white shadow-xs" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              Action Progress
            </button>
          </div>

          {/* Active Tab Panel */}
          <div className="bg-gray-50 border border-gray-200 p-5 rounded-xl space-y-4 animate-scale-in">
            {selectedTab === "E" && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
                  <Leaf className="w-5 h-5 text-emerald-800" />
                  <h4 className="font-bold text-emerald-950 text-sm">Environmental Insights</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="bg-white p-4.5 rounded-lg border border-gray-150 space-y-1">
                    <span className="text-[10px] text-gray-400 font-bold block">ACTIVE INSIGHT</span>
                    <p className="font-bold text-gray-800 leading-snug">Fragmented utility and invoice tracking risks inaccurate reporting.</p>
                    <p className="text-gray-550 pt-1 leading-relaxed">Emissions indices are gathered manually across 4 logistics yards. Establishing a structured data parsing engine represents a high-value priority.</p>
                  </div>
                  <div className="bg-white p-4.5 rounded-lg border border-gray-150 space-y-2">
                    <span className="text-[10px] text-gray-400 font-bold block">METRIC METADATA</span>
                    <div className="flex items-center justify-between text-[11px] font-mono py-1 border-b border-gray-100">
                      <span>Scope 1 Emissions</span>
                      <strong className="text-emerald-800">1,240 tCO2e</strong>
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-mono py-1 border-b border-gray-100">
                      <span>Scope 2 Emissions</span>
                      <strong className="text-emerald-800">3,450 tCO2e</strong>
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-mono py-1 text-gray-400">
                      <span>Scope 3 Disclosures</span>
                      <span className="text-amber-800 font-bold">Incomplete / Auditing</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <button 
                    onClick={() => onNavigateToChat("Explain standard guidelines to compute Scope 1 emissions.")}
                    className="text-emerald-900 border border-emerald-900 text-[11px] font-bold px-3 py-1.5 rounded hover:bg-emerald-50 cursor-pointer"
                  >
                    Discuss Scope Formulas
                  </button>
                </div>
              </div>
            )}

            {selectedTab === "S" && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
                  <Users className="w-5 h-5 text-blue-800" />
                  <h4 className="font-bold text-emerald-950 text-sm">Social & Stakeholder Responsibility Insights</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="bg-white p-4.5 rounded-lg border border-gray-150 space-y-1">
                    <span className="text-[10px] text-gray-400 font-bold block">ACTIVE INSIGHT</span>
                    <p className="font-bold text-gray-800 leading-snug">Global labor records are decentralized with average incident lag.</p>
                    <p className="text-gray-550 pt-1 leading-relaxed">Safety records reside in scanned paper diaries. Reviewing safety logs via document summarization minimizes incident remediation loops.</p>
                  </div>
                  <div className="bg-white p-4.5 rounded-lg border border-gray-150 space-y-2">
                    <span className="text-[10px] text-gray-400 font-bold block">SOCIAL KPIs</span>
                    <div className="flex items-center justify-between text-[11px] font-mono py-1 border-b border-gray-100">
                      <span>OHS Training Completion</span>
                      <strong className="text-blue-850">89%</strong>
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-mono py-1 border-b border-gray-100">
                      <span>Diversity Index Ratio</span>
                      <strong className="text-blue-850">42/100</strong>
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-mono py-1">
                      <span>Worker Safety Auditing</span>
                      <span className="text-emerald-800 font-bold">Compliant</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <button 
                    onClick={() => onNavigateToChat("Suggest some Social Responsibility repeating tasks.")}
                    className="text-emerald-900 border border-emerald-900 text-[11px] font-bold px-3 py-1.5 rounded hover:bg-emerald-50 cursor-pointer"
                  >
                    View Social Milestones
                  </button>
                </div>
              </div>
            )}

            {selectedTab === "G" && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
                  <ShieldCheck className="w-5 h-5 text-indigo-800" />
                  <h4 className="font-bold text-emerald-950 text-sm">Corporate Governance and Compliance Insights</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="bg-white p-4.5 rounded-lg border border-gray-150 space-y-1">
                    <span className="text-[10px] text-gray-400 font-bold block">ACTIVE INSIGHT</span>
                    <p className="font-bold text-gray-800 leading-snug">Compliance gaps exist regarding verified board diversity metrics.</p>
                    <p className="text-gray-550 pt-1 leading-relaxed">Analyzing policy papers ensures anti-bribery measures line up with dynamic regional mandates, avoiding regulatory penalties.</p>
                  </div>
                  <div className="bg-white p-4.5 rounded-lg border border-gray-150 space-y-2">
                    <span className="text-[10px] text-gray-400 font-bold block">COMPLIANCE METRICS</span>
                    <div className="flex items-center justify-between text-[11px] font-mono py-1 border-b border-gray-100">
                      <span>Independent Director Seats</span>
                      <strong className="text-indigo-800">55% (Low Target)</strong>
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-mono py-1 border-b border-gray-100">
                      <span>Conflict of Interest Check</span>
                      <strong className="text-emerald-800">Active / Valid</strong>
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-mono py-1">
                      <span>Information Security Gaps</span>
                      <span className="text-amber-800 font-bold">Review Required</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <button 
                    onClick={() => onNavigateToChat("Explain how 'Evidence Gap Identification' supports CSRD requirements.")}
                    className="text-emerald-900 border border-emerald-900 text-[11px] font-bold px-3 py-1.5 rounded hover:bg-emerald-50 cursor-pointer"
                  >
                    Audit Governance Compliance
                  </button>
                </div>
              </div>
            )}

            {selectedTab === "Supplier" && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
                  <Truck className="w-5 h-5 text-amber-800" />
                  <h4 className="font-bold text-emerald-950 text-sm">Supplier ESG Monitoring Insights</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="bg-white p-4.5 rounded-lg border border-gray-150 space-y-1">
                    <span className="text-[10px] text-gray-400 font-bold block">ACTIVE INSIGHT</span>
                    <p className="font-bold text-gray-800 leading-snug">Manual screening of supplier self-assessment surveys is tedious.</p>
                    <p className="text-gray-550 pt-1 leading-relaxed">Automating the parsing of supplier questionnaires using dedicated AI Classifiers highlights high environmental-risk vendor partners.</p>
                  </div>
                  <div className="bg-white p-4.5 rounded-lg border border-gray-150 space-y-2">
                    <span className="text-[10px] text-gray-400 font-bold block">SUPPLY STATS</span>
                    <div className="flex items-center justify-between text-[11px] font-mono py-1 border-b border-gray-100">
                      <span>Suppliers Audited</span>
                      <strong className="text-amber-800">12 / 45</strong>
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-mono py-1 border-b border-gray-100">
                      <span>High Risk Partners Flagged</span>
                      <strong className="text-amber-800">3</strong>
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-mono py-1">
                      <span>Responsible Sourcing Certs</span>
                      <span className="text-emerald-800 font-bold">Pending</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <button 
                    onClick={() => onNavigateToChat("How can we improve supplier ESG management?")}
                    className="text-emerald-900 border border-emerald-900 text-[11px] font-bold px-3 py-1.5 rounded hover:bg-emerald-50 cursor-pointer"
                  >
                    Conduct Supplier Analysis
                  </button>
                </div>
              </div>
            )}

            {selectedTab === "Reporting" && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
                  <FileText className="w-5 h-5 text-violet-800" />
                  <h4 className="font-bold text-emerald-950 text-sm">ESG Disclosure & Communication Readiness</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="bg-white p-4.5 rounded-lg border border-gray-150 space-y-1">
                    <span className="text-[10px] text-gray-400 font-bold block">ACTIVE INSIGHT</span>
                    <p className="font-bold text-gray-800 leading-snug">Compiling integrated GRI/CSRD disclosures takes months of manual drafting.</p>
                    <p className="text-gray-550 pt-1 leading-relaxed">Report generation AI functions can automatically format disclosures from validated internal databases, saving vital timing blocks.</p>
                  </div>
                  <div className="bg-white p-4.5 rounded-lg border border-gray-150 space-y-2">
                    <span className="text-[10px] text-gray-400 font-bold block">REPORT STATUS</span>
                    <div className="flex items-center justify-between text-[11px] font-mono py-1 border-b border-gray-100">
                      <span>GRI Index Chapters</span>
                      <strong className="text-violet-800">4 completed</strong>
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-mono py-1 border-b border-gray-100">
                      <span>Executive Brief Draft</span>
                      <strong className="text-emerald-700">Ready</strong>
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-mono py-1">
                      <span>Bilingual Reporting Terminology</span>
                      <span className="text-emerald-800 font-bold">Standardized</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <button 
                    onClick={() => onNavigateToChat("Generate a summary of our ESG readiness for management.")}
                    className="text-emerald-900 border border-emerald-900 text-[11px] font-bold px-3 py-1.5 rounded hover:bg-emerald-50 cursor-pointer"
                  >
                    Draft Sustainability Report summary
                  </button>
                </div>
              </div>
            )}

            {selectedTab === "Sustainability" && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
                  <TrendingUp className="w-5 h-5 text-teal-800" />
                  <h4 className="font-bold text-emerald-950 text-sm">Strategic Carbon & Corrective Actions</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="bg-white p-4.5 rounded-lg border border-gray-150 space-y-1">
                    <span className="text-[10px] text-gray-400 font-bold block">ACTIVE INSIGHT</span>
                    <p className="font-bold text-gray-800 leading-snug">Translating emissions targets into real operational plans requires expert oversight.</p>
                    <p className="text-gray-550 pt-1 leading-relaxed">Task recommendations based on audited operational deficits guide teams on daily eco-friendly procedures, tracking progress dynamically.</p>
                  </div>
                  <div className="bg-white p-4.5 rounded-lg border border-gray-150 space-y-2">
                    <span className="text-[10px] text-gray-400 font-bold block">ACTION STATUS</span>
                    <div className="flex items-center justify-between text-[11px] font-mono py-1 border-b border-gray-100">
                      <span>Planned Actions</span>
                      <strong className="text-teal-800">18</strong>
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-mono py-1 border-b border-gray-100">
                      <span>Completed Actions</span>
                      <strong className="text-emerald-800">10 (54%)</strong>
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-mono py-1">
                      <span>Remediation Progress Warnings</span>
                      <span className="text-amber-800 font-bold">None</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <button 
                    onClick={() => onNavigateToChat("Generate a 30-day ESG action plan.")}
                    className="text-emerald-900 border border-emerald-900 text-[11px] font-bold px-3 py-1.5 rounded hover:bg-emerald-50 cursor-pointer"
                  >
                    Generate Action Plan
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Hand: Active Task Reminders & Notifications (lg:col-span-4) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs space-y-4">
            <h3 className="font-bold text-emerald-950 text-xs uppercase tracking-wider font-mono">
              PENDING ESG ATTENTION LIST
            </h3>
            
            <div className="space-y-3.5">
              <div className="flex gap-3 items-start border-b border-gray-100 pb-3">
                <div className="p-1 px-2 bg-red-50 text-red-800 border border-red-100 text-[10px] font-bold rounded mt-0.5 font-mono shrink-0">
                  HIGH
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-gray-800 leading-tight">Consolidate decentralized utilities receipts</h4>
                  <span className="text-[10px] text-gray-400 font-semibold uppercase block">E | Data extraction</span>
                </div>
              </div>

              <div className="flex gap-3 items-start border-b border-gray-100 pb-3">
                <div className="p-1 px-2 bg-red-50 text-red-800 border border-red-100 text-[10px] font-bold rounded mt-0.5 font-mono shrink-0">
                  HIGH
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-gray-800 leading-tight">Identify compliance gaps against current CSRD guidelines</h4>
                  <span className="text-[10px] text-gray-400 font-semibold uppercase block">G | Evidence Gap Identification</span>
                </div>
              </div>

              <div className="flex gap-3 items-start border-b border-gray-100 pb-3">
                <div className="p-1 px-2 bg-amber-50 text-amber-800 border border-amber-100 text-[10px] font-bold rounded mt-0.5 font-mono shrink-0">
                  MEDIUM
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-gray-800 leading-tight">Parse new vendor self-report questionnaires</h4>
                  <span className="text-[10px] text-gray-400 font-semibold uppercase block">Supplier | Questionnaire assessment</span>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="p-1 px-2 bg-gray-100 text-gray-600 border border-gray-200 text-[10px] font-bold rounded mt-0.5 font-mono shrink-0">
                  LOW
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-gray-800 leading-tight">Summarize environmental policy papers for Board of Directors</h4>
                  <span className="text-[10px] text-gray-400 font-semibold uppercase block">Disclosures | Document summary</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-250 p-5 rounded-2xl space-y-3">
            <h4 className="font-bold text-emerald-950 text-xs">Sustainability Principle</h4>
            <p className="text-xs text-gray-650 leading-relaxed">
              ESG AI Advisor coordinates structured domain evaluation, maps administrative workloads, connects with specific LLM features, and ranks actions in immediate execution order.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
