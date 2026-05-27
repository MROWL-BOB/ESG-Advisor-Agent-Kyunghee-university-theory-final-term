import React, { useState, useEffect } from "react";
import { UserRole, IndustrySector, RecommendationTask, ContinuousActivityLog, DiagnosticResult } from "./types";
import DiagnosticWizard from "./components/DiagnosticWizard";
import ActionRoadmap from "./components/ActionRoadmap";
import ScopeCarbonTracker from "./components/ScopeCarbonTracker";
import SupplierScreening from "./components/SupplierScreening";
import EsgChatAdvisor from "./components/EsgChatAdvisor";
import RiskRegister from "./components/RiskRegister";
import ReportGenerator from "./components/ReportGenerator";
import LandingPage from "./components/LandingPage";

import {
  FileBadge,
  LayoutDashboard,
  ClipboardList,
  Flame,
  Truck,
  MessageSquare,
  ShieldCheck,
  AlertTriangle,
  Award,
  Globe,
  Settings,
  HelpCircle,
  TrendingUp,
  RefreshCw,
  ShieldAlert,
  FileText,
  Clock,
  Sparkles
} from "lucide-react";

// Prepopulated Default Diagnosis Result so user starts with actual data
const INITIAL_BENCHMARK: DiagnosticResult = {
  scores: {
    environmental: 45,
    social: 50,
    governance: 55,
    overall: 50
  },
  complianceGap: "Potential liability alignment concerns with EU Corporate Sustainability Reporting Directive (CSRD) Scope 3 guidelines and pending climate transparency filings.",
  strengths: [
    "Identified initial workplace safety and code of ethics protocols",
    "Active corporate governance oversight practices registered"
  ],
  gaps: [
    "No structured Scope 1 & Scope 2 greenhouse gas audit records",
    "Underrepresented board independence ratio (<50%)"
  ],
  recommendations: [
    {
      id: "rec-base-1",
      pilar: "E",
      title: "Establish Scope 1 & 2 Emissions Baseline",
      action: "Gather direct utility receipts (electricity power, natural gas meters) and fleet logistics diesel consumption logs for carbon calculation.",
      priority: "High",
      difficulty: "Moderate",
      impact: "Forms the crucial starting point for regulatory carbon disclosure sheets.",
      status: "ToDo"
    },
    {
      id: "rec-base-2",
      pilar: "S",
      title: "Audit Gender Pay Discrepancies",
      action: "Review payroll accounts categorizing remuneration across identical seniority ranks to discover raw adjusted pay discrepancies.",
      priority: "Medium",
      difficulty: "Easy",
      impact: "Aligns workplace with standard global anti-discrimination indices.",
      status: "ToDo"
    },
    {
      id: "rec-base-3",
      pilar: "G",
      title: "Develop Independent Board Seat Procedures",
      action: "Draft specific provisions guaranteeing that at least two advisory seats are occupied by non-shareholder, autonomous industry experts.",
      priority: "High",
      difficulty: "Moderate",
      impact: "Dramatically lifts public integrity score preventing transaction conflicts.",
      status: "ToDo"
    }
  ],
  plainLanguageExplanation: "The organization is in the early foundation stage of its ESG journey. While foundational rules and basic gender structures are in place, the company lacking verifiable green energy and Scope 1/2 calculations represents a major compliance blocker for modern procurement requirements.",
  professionalSummary: "This ESG roadmap outlines key remediation steps. Priority should remain establishing direct carbon emissions transparency and elevating independent governing advisor slots, which are essential for long term public regulatory checks and securing ESG-linked finance lines.",
  complianceReadinessScore: 48,
  supplierEsgRiskLevel: "Medium",
  carbonManagementMaturity: "Beginner",
  dataCompletenessLevel: 40
};

// Default continuous log milestones history
const INITIAL_HISTORY: ContinuousActivityLog[] = [
  {
    id: "hist-1",
    timestamp: "May 15, 2026",
    taskTitle: "Adopt Equal Opportunity Charter",
    actionTaken: "Formulated and signed a formal internal equity charter distributed across the workforce communication board.",
    impactEstimated: "Secures a standard social safeguard benchmark."
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "audit" | "roadmap" | "carbon" | "suppliers" | "chat" | "risks" | "reports">("dashboard");
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [isSimulationActive, setIsSimulationActive] = useState<boolean>(() => {
    try {
      const savedResult = localStorage.getItem("esg_diag_result");
      if (savedResult) {
        const parsed: DiagnosticResult = JSON.parse(savedResult);
        return parsed.recommendations.some(r => r.id.startsWith("rec-greentech"));
      }
    } catch (e) {}
    return false;
  });

  // Core User Demographics
  const [userRole, setUserRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem("esg_user_role");
    return (saved as UserRole) || "Corporate ESG Manager";
  });

  const [sector, setSector] = useState<IndustrySector>(() => {
    const saved = localStorage.getItem("esg_sector");
    return (saved as IndustrySector) || "Technology & Software";
  });

  // Persistent ESG Diagnostic Result State
  const [diagResult, setDiagResult] = useState<DiagnosticResult>(() => {
    const saved = localStorage.getItem("esg_diag_result");
    return saved ? JSON.parse(saved) : INITIAL_BENCHMARK;
  });

  // Continuous active tasks
  const [tasks, setTasks] = useState<RecommendationTask[]>(() => {
    const saved = localStorage.getItem("esg_tasks");
    return saved ? JSON.parse(saved) : INITIAL_BENCHMARK.recommendations;
  });

  // Continuous activity logs history
  const [activityHistory, setActivityHistory] = useState<ContinuousActivityLog[]>(() => {
    const saved = localStorage.getItem("esg_history");
    return saved ? JSON.parse(saved) : INITIAL_HISTORY;
  });

  // Quantitative KPI parameters from the calculator
  const [carbonFootprintTon, setCarbonFootprintTon] = useState(() => {
    try {
      const saved = localStorage.getItem("esg_diag_result");
      if (saved && saved.includes("rec-greentech")) {
        return 450.2;
      }
    } catch (e) {}
    return 15.4;
  });
  const [diversityRatio, setDiversityRatio] = useState(() => {
    try {
      const saved = localStorage.getItem("esg_diag_result");
      if (saved && saved.includes("rec-greentech")) {
        return 12;
      }
    } catch (e) {}
    return 33;
  });
  const [boardIndependencePercent, setBoardIndependencePercent] = useState(() => {
    try {
      const saved = localStorage.getItem("esg_diag_result");
      if (saved && saved.includes("rec-greentech")) {
        return 20;
      }
    } catch (e) {}
    return 40;
  });

  const handleLaunchGreentechSimulation = () => {
    setUserRole("Corporate ESG Manager");
    setSector("Manufacturing & Logistics");
    
    const simulationResult: DiagnosticResult = {
      scores: {
        environmental: 35,
        social: 42,
        governance: 38,
        overall: 38
      },
      complianceGap: "Immediate non-compliance risk with environmental transport logistics mandates. Over 80% of current third-party freight supply chains and regional component delivery channels remain completely unmonitored for Scope 3 emissions outputs.",
      strengths: [
        "Internal occupational resource safety framework with zero registered hazards last year",
        "Elementary fair wages charter signed by parent organization management team"
      ],
      gaps: [
        "Carbon-intensive logistics shipping fleet with zero offset policies",
        "No structured ESG code of ethics checklist for Tier 1 components suppliers",
        "Less than 20% of senior board staff represent autonomous non-shareholders"
      ],
      recommendations: [
        {
          id: "rec-greentech-1",
          pilar: "E",
          title: "Fund Eco-Logistics Fleet Upgrade",
          action: "Allocate budget capital to phase out heavily emitting diesel cargo logistics trucks. Replace with electric or hydrogen fuel-cell haul fleets, reducing logistics fuel consumption.",
          priority: "High",
          difficulty: "Moderate",
          impact: "Cuts corporate logistics carbon footprint from 450 to 125 tCO2e/yr, earning +35 Environmental points.",
          status: "ToDo"
        },
        {
          id: "rec-greentech-2",
          pilar: "S",
          title: "Verify Tier-1 Supplier SA8000 Checks",
          action: "Audit core packaging component providers. Draft a sustainability supplier agreement requiring proof of fair employee wages and human health/safety welfare protocols.",
          priority: "High",
          difficulty: "Easy",
          impact: "Averts significant Scope 3 supply chain brand risks, earning +28 Social points.",
          status: "ToDo"
        },
        {
          id: "rec-greentech-3",
          pilar: "G",
          title: "Appoint 3 Independent Directors to Board",
          action: "Revise shareholder assembly directives. Appoint three autonomous directors with background in ESG audits to chair the risk oversight board.",
          priority: "High",
          difficulty: "Moderate",
          impact: "Achieves standard 50%+ governance autonomy ratio, earning +32 Governance points.",
          status: "ToDo"
        }
      ],
      plainLanguageExplanation: "GreenTech Manufacturing Co. is currently running below average ESG performance due to non-audited supply metrics and heavily carbon-reliant transport mechanisms. Key interventions on logistics fleets and board oversight will bolster scorecards.",
      professionalSummary: "This continuous model outlines critical interventions for GreenTech Manufacturing Co. The focus should slide toward establishing direct supplier ethics codes and electric logistics offsets.",
      complianceReadinessScore: 35,
      supplierEsgRiskLevel: "High",
      carbonManagementMaturity: "Beginner",
      dataCompletenessLevel: 45
    };

    setDiagResult(simulationResult);
    setTasks(simulationResult.recommendations);
    setActivityHistory([
      {
        id: "hist-greentech-init",
        timestamp: "May 27, 2026",
        taskTitle: "Initiate GreenTech Audit Cycle",
        actionTaken: "Conducted preliminary AI diagnostic mapping for GreenTech Manufacturing Co. with standard corporate logistics parameters.",
        impactEstimated: "Establishes compliance baseline scorecard (38% overall rating)."
      }
    ]);
    
    setCarbonFootprintTon(450.2);
    setDiversityRatio(12);
    setBoardIndependencePercent(20);

    localStorage.setItem("esg_org_name", "GreenTech Manufacturing Co.");
    localStorage.setItem("esg_sector", "Manufacturing & Logistics");
    localStorage.setItem("esg_user_role", "Corporate ESG Manager");
    localStorage.setItem("esg_diag_result", JSON.stringify(simulationResult));
    localStorage.setItem("esg_tasks", JSON.stringify(simulationResult.recommendations));
    
    setIsSimulationActive(true);
    setShowLandingPage(false);
    setActiveTab("dashboard");
  };

  // Sync state modifications to LocalStorage to sustain the continuous management loop
  useEffect(() => {
    localStorage.setItem("esg_user_role", userRole);
  }, [userRole]);

  useEffect(() => {
    localStorage.setItem("esg_sector", sector);
  }, [sector]);

  useEffect(() => {
    localStorage.setItem("esg_diag_result", JSON.stringify(diagResult));
  }, [diagResult]);

  useEffect(() => {
    localStorage.setItem("esg_tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("esg_history", JSON.stringify(activityHistory));
  }, [activityHistory]);

  const handleDiagnosticComplete = (result: DiagnosticResult) => {
    setDiagResult(result);
    // Overwrite tasks with the customized ones, keeping any already completed ones if desired
    setTasks(result.recommendations);
    setActiveTab("dashboard");
  };

  const handleActivityAdded = (newLog: ContinuousActivityLog) => {
    setActivityHistory((prev) => [newLog, ...prev]);
  };

  const handleActivityCleared = () => {
    setActivityHistory([]);
  };

  // Dynamically update KPI calculations on dashboard
  const handleMetricsCalculated = (carbon: number, diversity: number, board: number) => {
    setCarbonFootprintTon(carbon);
    setDiversityRatio(diversity);
    setBoardIndependencePercent(board);
  };

  const handleResetToBenchmark = () => {
    if (window.confirm("Are you sure you want to reset your corporate ESG database back to standard benchmarks?")) {
      setDiagResult(INITIAL_BENCHMARK);
      setTasks(INITIAL_BENCHMARK.recommendations);
      setActivityHistory(INITIAL_HISTORY);
      setUserRole("Corporate ESG Manager");
      setSector("Technology & Software");
      setIsSimulationActive(false);
      setShowLandingPage(true);
      setCarbonFootprintTon(15.4);
      setDiversityRatio(33);
      setBoardIndependencePercent(40);
      localStorage.clear();
      setActiveTab("dashboard");
    }
  };

  const handleUpdateTask = (updatedTask: RecommendationTask) => {
    setTasks((prev) => prev.map((t) => t.id === updatedTask.id ? updatedTask : t));
  };

  // Score calculation incorporating continuous task progress
  const completedTasks = tasks.filter(t => t.status === "Completed");
  const eTasks = tasks.filter(t => t.pilar === "E");
  const sTasks = tasks.filter(t => t.pilar === "S");
  const gTasks = tasks.filter(t => t.pilar === "G");

  const eProgress = eTasks.length > 0 ? (eTasks.filter(t => t.status === "Completed").length / eTasks.length) : 0;
  const sProgress = sTasks.length > 0 ? (sTasks.filter(t => t.status === "Completed").length / sTasks.length) : 0;
  const gProgress = gTasks.length > 0 ? (gTasks.filter(t => t.status === "Completed").length / gTasks.length) : 0;

  // Real-time calculated overall score based on initial diagnosis + continuous completed actions
  const isSelectedGreentech = isSimulationActive || diagResult.recommendations.some(r => r.id.startsWith("rec-greentech"));
  
  let bonusE = 0;
  let bonusS = 0;
  let bonusG = 0;
  
  if (isSelectedGreentech) {
    if (tasks.find(t => t.id === "rec-greentech-1")?.status === "Completed") bonusE = 35; // Brings E from 35 to 70!
    if (tasks.find(t => t.id === "rec-greentech-2")?.status === "Completed") bonusS = 28; // Brings S from 42 to 70!
    if (tasks.find(t => t.id === "rec-greentech-3")?.status === "Completed") bonusG = 32; // Brings G from 38 to 70!
  } else {
    bonusE = Math.round(eProgress * 15);
    bonusS = Math.round(sProgress * 15);
    bonusG = Math.round(gProgress * 15);
  }

  const adjustedEScore = Math.min(100, Math.round(diagResult.scores.environmental + bonusE));
  const adjustedSScore = Math.min(100, Math.round(diagResult.scores.social + bonusS));
  const adjustedGScore = Math.min(100, Math.round(diagResult.scores.governance + bonusG));
  const adjustedOverallScore = Math.round((adjustedEScore + adjustedSScore + adjustedGScore) / 3);

  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 font-sans flex flex-col antialiased">
      
      {/* Dynamic Global Notification Rail of Continuous Value */}
      <div className="bg-emerald-950 text-emerald-200 border-b border-emerald-900 px-4 py-2 text-xs flex flex-wrap justify-between items-center gap-3 shrink-0">
        <div className="flex items-center gap-2">
          <Globe className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>ESG CONTINUOUS REGULATORY PULSE: Framework compliant with <strong>CSRD Scope 3</strong> and <strong>GRI climate disclosure guides</strong>.</span>
        </div>
        <div className="flex items-center gap-4 text-[11px] font-medium">
          <span>Active Goals: <strong className="text-white">{tasks.filter(t => t.status !== 'Completed').length} Pending</strong></span>
          <span>Verified Carbon Footprint: <strong className="text-emerald-300">{carbonFootprintTon} tCO2e / yr</strong></span>
        </div>
      </div>

      {/* Main Top Header Navigation */}
      <header className="bg-white border-b border-gray-150 sticky top-0 z-30 shrink-0 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          <div 
            onClick={() => setShowLandingPage(true)}
            className="flex items-center gap-3 cursor-pointer hover:opacity-90 select-none group transition-all"
            title="Return to Welcome Landing page"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-900 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <FileBadge className="w-6 h-6 text-emerald-300" id="app-logo-icon" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-extrabold tracking-tight text-gray-900 inline-flex items-center gap-1.5 group-hover:text-emerald-800 transition-colors leading-tight">
                ESG Advisor Agent
              </h1>
              <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                AI-Powered ESG Diagnostic & Sustainable Management System
              </span>
            </div>
          </div>

          {/* Demographic Selection Panels for Custom Scope */}
          <div className="bg-gray-100 p-2 rounded-xl flex flex-wrap items-center gap-2 text-xs border border-gray-200">
            <div className="flex items-center gap-1.5 px-2">
              <Settings className="w-3.5 h-3.5 text-gray-400" />
              <label htmlFor="user-role-select" className="text-gray-500 font-bold uppercase text-[9px]">Scope:</label>
              <select
                id="user-role-select"
                className="bg-transparent border-none text-xs font-bold text-gray-700 focus:outline-none"
                value={userRole}
                onChange={(e) => setUserRole(e.target.value as UserRole)}
              >
                <option value="Corporate ESG Manager">Corporate ESG Manager</option>
                <option value="SME Owner/Operator">SME Owner/Operator</option>
                <option value="Investor/Financial Analyst">Investor/Financial Analyst</option>
                <option value="Procurement/Supply Chain Manager">Procurement/Supply Chain Manager</option>
                <option value="Consultant/ESG Advisor">Consultant/ESG Advisor</option>
                <option value="University/School Administrator">University/School Administrator</option>
                <option value="NGO/Community Representative">NGO/Community Representative</option>
              </select>
            </div>

            <div className="hidden sm:block text-gray-300">|</div>

            <div className="flex items-center gap-1.5 px-2">
              <label htmlFor="user-sector-select" className="text-gray-500 font-bold uppercase text-[9px]">Sector:</label>
              <select
                id="user-sector-select"
                className="bg-transparent border-none text-xs font-bold text-gray-700 focus:outline-none"
                value={sector}
                onChange={(e) => setSector(e.target.value as IndustrySector)}
              >
                <option value="Technology & Software">Technology & Software</option>
                <option value="Manufacturing & Logistics">Manufacturing & Logistics</option>
                <option value="Financial & Banking Services">Financial & Banking Services</option>
                <option value="Retail & Consumer Goods">Retail & Consumer Goods</option>
                <option value="Education & Public Affairs">Education & Public Affairs</option>
                <option value="Healthcare & Pharma">Healthcare & Pharma</option>
                <option value="Energy & Mining Utilities">Energy & Mining Utilities</option>
                <option value="Non-Profit & Humanitarian Services">Non-Profit & Humanitarian Services</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {showLandingPage ? (
          <LandingPage
            onStartDiagnosis={() => {
              setShowLandingPage(false);
              setActiveTab("audit");
            }}
            onLaunchSimulation={handleLaunchGreentechSimulation}
          />
        ) : (
          <div className="flex flex-col md:flex-row gap-6">
            
            {/* Navigation Sidebar Drawer */}
            <aside className="w-full md:w-64 shrink-0 space-y-2" id="sidebar-navigation">
              <button
                onClick={() => {
                  setShowLandingPage(true);
                }}
                className="w-full px-4 py-3 rounded-xl text-left text-xs md:text-sm font-bold flex items-center gap-2.5 transition-all bg-emerald-50 text-emerald-800 border border-emerald-100 hover:bg-emerald-100 cursor-pointer mb-2"
              >
                <Globe className="w-4 h-4 text-emerald-700" /> 🏡 Welcome Landing
              </button>

              <button
                onClick={() => {
                  setShowLandingPage(false);
                  setActiveTab("dashboard");
                }}
                className={`w-full px-4 py-3 rounded-xl text-left text-xs md:text-sm font-bold flex items-center gap-2.5 transition-all cursor-pointer ${
                  !showLandingPage && activeTab === "dashboard"
                    ? "bg-emerald-800 text-white shadow-md border-emerald-900"
                    : "bg-white text-gray-650 border border-gray-100 hover:bg-gray-50"
                }`}
              >
                <LayoutDashboard className="w-4 h-4" /> Comprehensive Dashboard
              </button>

              <button
                onClick={() => {
                  setShowLandingPage(false);
                  setActiveTab("audit");
                }}
                className={`w-full px-4 py-3 rounded-xl text-left text-xs md:text-sm font-bold flex items-center gap-2.5 transition-all cursor-pointer ${
                  !showLandingPage && activeTab === "audit"
                    ? "bg-emerald-800 text-white shadow-md border-emerald-900"
                    : "bg-white text-gray-650 border border-gray-100 hover:bg-gray-50"
                }`}
              >
                <ClipboardList className="w-4 h-4" /> Self-Governance Audit
              </button>

              <button
                onClick={() => {
                  setShowLandingPage(false);
                  setActiveTab("roadmap");
                }}
                className={`w-full px-4 py-3 rounded-xl text-left text-xs md:text-sm font-bold flex items-center gap-2.5 transition-all cursor-pointer ${
                  !showLandingPage && activeTab === "roadmap"
                    ? "bg-emerald-800 text-white shadow-md border-emerald-900"
                    : "bg-white text-gray-650 border border-gray-100 hover:bg-gray-50"
                }`}
              >
                <Settings className="w-4 h-4" /> SMS Activity Roadmap
                {tasks.filter(t => t.status === 'InProgress').length > 0 && (
                  <span className="ml-auto bg-amber-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {tasks.filter(t => t.status === 'InProgress').length}
                  </span>
                )}
              </button>

              <button
                onClick={() => {
                  setShowLandingPage(false);
                  setActiveTab("carbon");
                }}
                className={`w-full px-4 py-3 rounded-xl text-left text-xs md:text-sm font-bold flex items-center gap-2.5 transition-all cursor-pointer ${
                  !showLandingPage && activeTab === "carbon"
                    ? "bg-emerald-800 text-white shadow-md border-emerald-900"
                    : "bg-white text-gray-650 border border-gray-100 hover:bg-gray-50"
                }`}
              >
                <Flame className="w-4 h-4" /> Quantitative Scopes Tracker
              </button>

              <button
                onClick={() => {
                  setShowLandingPage(false);
                  setActiveTab("suppliers");
                }}
                className={`w-full px-4 py-3 rounded-xl text-left text-xs md:text-sm font-bold flex items-center gap-2.5 transition-all cursor-pointer ${
                  !showLandingPage && activeTab === "suppliers"
                    ? "bg-emerald-800 text-white shadow-md border-emerald-900"
                    : "bg-white text-gray-650 border border-gray-100 hover:bg-gray-50"
                }`}
              >
                <Truck className="w-4 h-4" /> Scope 3 Supplier Audits
              </button>

              <button
                onClick={() => {
                  setShowLandingPage(false);
                  setActiveTab("risks");
                }}
                className={`w-full px-4 py-3 rounded-xl text-left text-xs md:text-sm font-bold flex items-center gap-2.5 transition-all cursor-pointer ${
                  !showLandingPage && activeTab === "risks"
                    ? "bg-emerald-800 text-white shadow-md border-emerald-900"
                    : "bg-white text-gray-650 border border-gray-100 hover:bg-gray-50"
                }`}
              >
                <ShieldAlert className="w-4 h-4" /> Risks, Goals & Creds
              </button>

              <button
                onClick={() => {
                  setShowLandingPage(false);
                  setActiveTab("reports");
                }}
                className={`w-full px-4 py-3 rounded-xl text-left text-xs md:text-sm font-bold flex items-center gap-2.5 transition-all cursor-pointer ${
                  !showLandingPage && activeTab === "reports"
                    ? "bg-emerald-800 text-white shadow-md border-emerald-900"
                    : "bg-white text-gray-650 border border-gray-100 hover:bg-gray-50"
                }`}
              >
                <FileText className="w-4 h-4" /> Audited Reports Center
              </button>

              <button
                onClick={() => {
                  setShowLandingPage(false);
                  setActiveTab("chat");
                }}
                className={`w-full px-4 py-3 rounded-xl text-left text-xs md:text-sm font-bold flex items-center gap-2.5 transition-all cursor-pointer ${
                  !showLandingPage && activeTab === "chat"
                    ? "bg-emerald-800 text-white shadow-md border-emerald-900"
                    : "bg-white text-gray-650 border border-gray-100 hover:bg-gray-50"
                }`}
              >
                <MessageSquare className="w-4 h-4" /> Expert AI Advisor Chat
              </button>

              <div className="pt-8 border-t border-gray-200 mt-4 space-y-3">
                <span className="text-[10px] uppercase font-bold text-gray-400 block px-2">Continuous Controls</span>
                <button
                  onClick={handleResetToBenchmark}
                  className="w-full text-left font-bold text-rose-500 hover:text-rose-600 px-3 py-2 text-xs hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Revert ESG Database
                </button>
              </div>
            </aside>

            {/* Dynamic Display Canvas */}
            <section className="flex-1 space-y-6">
          
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              
              {isSimulationActive && (
                <div className="bg-emerald-900 border border-emerald-950 rounded-3xl p-6 text-white relative overflow-hidden shadow-md space-y-4">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-3 gap-3 relative">
                    <div className="flex items-center gap-2">
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                      </span>
                      <h3 className="font-extrabold text-xs uppercase tracking-wider text-emerald-200">
                        🌲 LIVE MVP SIMULATION ACTIVE &bull; GreenTech Manufacturing Co.
                      </h3>
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          setIsSimulationActive(false);
                          setShowLandingPage(true);
                          setCarbonFootprintTon(15.4);
                          setDiversityRatio(33);
                          setBoardIndependencePercent(40);
                          setDiagResult(INITIAL_BENCHMARK);
                          setTasks(INITIAL_BENCHMARK.recommendations);
                        }}
                        className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-900 text-[10px] font-extrabold rounded-lg transition-colors cursor-pointer"
                      >
                        Exit Simulation Mode
                      </button>
                    </div>
                  </div>

                  <p className="text-[11px] sm:text-xs text-emerald-100/90 leading-relaxed max-w-3xl relative">
                    You are in interactive prototype mode simulating <strong>GreenTech Manufacturing Co.</strong> 
                    Remediate regulatory gaps by triggering the actionable task cards below. Watch the overall ESG scoring engine 
                    live-recalculate and slide from its baseline of <strong className="text-amber-300">38% (Before)</strong> up to a compliant <strong className="text-emerald-300">81% (After)</strong>!
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1 relative">
                    
                    {/* Simulator Action 1 */}
                    <div className={`p-4 rounded-2xl border ${
                      tasks.find(t => t.id === "rec-greentech-1")?.status === "Completed"
                        ? "bg-slate-950/40 border-emerald-500/40 text-emerald-300"
                        : "bg-emerald-950/60 border-emerald-800 text-white"
                    } transition-all space-y-2.5`}>
                      <div className="flex justify-between items-start gap-1">
                        <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                          Pillar E : Environment
                        </span>
                        <span className="text-[10px] font-bold text-gray-300">Before: 35%</span>
                      </div>
                      <div>
                        <span className="block font-bold text-xs">Simulate Eco-Corridor Fleet EV Upgrade</span>
                        <span className="block text-[10px] text-emerald-150/80 mt-0.5 font-medium leading-normal">
                          Retire old high-emissions diesel freight carriers in favor of leased electric trucks.
                        </span>
                      </div>
                      
                      {tasks.find(t => t.id === "rec-greentech-1")?.status === "Completed" ? (
                        <div className="text-[11px] font-bold text-emerald-400 pt-1">
                          ✓ Completed &bull; Carbon dropped to 125 tCO | +35 pts E
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            const updatedTasks = tasks.map(t => t.id === "rec-greentech-1" ? { ...t, status: "Completed" as const } : t);
                            setTasks(updatedTasks);
                            setCarbonFootprintTon(125.0);
                            handleActivityAdded({
                              id: "hist-gt-e",
                              timestamp: "May 27, 2026",
                              taskTitle: "Completed Logistics Fleet EV Upgrade",
                              actionTaken: "Phased out corporate logistics diesel cargo links and fully initialized electric carrier lease agreements.",
                              impactEstimated: "Radically slashed annual freight carbon footprint metric down by 72% overall."
                            });
                          }}
                          className="w-full py-2 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-[11px] rounded-lg shadow-sm transition-colors cursor-pointer text-center"
                        >
                          Approve EV Fleet Upgrade
                        </button>
                      )}
                    </div>

                    {/* Simulator Action 2 */}
                    <div className={`p-4 rounded-2xl border ${
                      tasks.find(t => t.id === "rec-greentech-2")?.status === "Completed"
                        ? "bg-slate-950/40 border-emerald-500/40 text-emerald-300"
                        : "bg-emerald-950/60 border-emerald-800 text-white"
                    } transition-all space-y-2.5`}>
                      <div className="flex justify-between items-start gap-1">
                        <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">
                          Pillar S : Social
                        </span>
                        <span className="text-[10px] font-bold text-gray-300">Before: 42%</span>
                      </div>
                      <div>
                        <span className="block font-bold text-xs">Verify Tier-1 Suppliers Labor</span>
                        <span className="block text-[10px] text-emerald-150/80 mt-0.5 font-medium leading-normal">
                          Audit high risk manufacturing tier packaging and wage standards.
                        </span>
                      </div>
                      
                      {tasks.find(t => t.id === "rec-greentech-2")?.status === "Completed" ? (
                        <div className="text-[11px] font-bold text-emerald-400 pt-1">
                          ✓ Completed &bull; SA8000 ethics certified | +28 pts S
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            const updatedTasks = tasks.map(t => t.id === "rec-greentech-2" ? { ...t, status: "Completed" as const } : t);
                            setTasks(updatedTasks);
                            setDiversityRatio(45);
                            handleActivityAdded({
                              id: "hist-gt-s",
                              timestamp: "May 27, 2026",
                              taskTitle: "Executed Supplier Ethics Screening Audits",
                              actionTaken: "Dispatched regulatory human welfare questionnaires to local tier packing facilities.",
                              impactEstimated: "Enforced occupational safety compliance baseline parameters."
                            });
                          }}
                          className="w-full py-2 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-[11px] rounded-lg shadow-sm transition-colors cursor-pointer text-center"
                        >
                          Enforce Supplier Checks
                        </button>
                      )}
                    </div>

                    {/* Simulator Action 3 */}
                    <div className={`p-4 rounded-2xl border ${
                      tasks.find(t => t.id === "rec-greentech-3")?.status === "Completed"
                        ? "bg-slate-950/40 border-emerald-500/40 text-emerald-300"
                        : "bg-emerald-950/60 border-emerald-800 text-white"
                    } transition-all space-y-2.5`}>
                      <div className="flex justify-between items-start gap-1">
                        <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                          Pillar G : Governance
                        </span>
                        <span className="text-[10px] font-bold text-gray-300">Before: 38%</span>
                      </div>
                      <div>
                        <span className="block font-bold text-xs">Appoint 3 Independent Directors</span>
                        <span className="block text-[10px] text-emerald-150/80 mt-0.5 font-medium leading-normal">
                          Appoint outside independent leaders with background in public climate ESG audits.
                        </span>
                      </div>
                      
                      {tasks.find(t => t.id === "rec-greentech-3")?.status === "Completed" ? (
                        <div className="text-[11px] font-bold text-emerald-400 pt-1">
                          ✓ Completed &bull; Board Freedom rose to 60% | +32 pts G
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            const updatedTasks = tasks.map(t => t.id === "rec-greentech-3" ? { ...t, status: "Completed" as const } : t);
                            setTasks(updatedTasks);
                            setBoardIndependencePercent(60);
                            handleActivityAdded({
                              id: "hist-gt-g",
                              timestamp: "May 27, 2026",
                              taskTitle: "Elected Independent board leaders",
                              actionTaken: "Restructured committee staffing, assigning 3 autonomous expert directorship positions.",
                              impactEstimated: "Boosted board transparency indicators of conflicts of interest."
                            });
                          }}
                          className="w-full py-2 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-[11px] rounded-lg shadow-sm transition-colors cursor-pointer text-center"
                        >
                          Elect Board Members
                        </button>
                      )}
                    </div>

                  </div>
                </div>
              )}
              
              {/* Core Score Hub & Hero Panel */}
              <div className="bg-white border border-gray-150 rounded-3xl p-6 md:p-8 shadow-xs relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
                
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative">
                  <div className="space-y-3">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                      <Award className="w-4 h-4 text-emerald-700" /> Continuous Audit Progression Rating
                    </span>
                    <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">ESG Performance Dashboard</h2>
                    <p className="text-gray-500 text-xs md:text-sm max-w-2xl">
                      This dynamic index aggregates audits and continuous completed checklists to score sustainability across Environmental, Social, and Governance pillars on a 0-100 scale.
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      <span className="bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-150 text-xs text-gray-600 font-bold">
                        Demographic: <span className="text-gray-800">{userRole}</span>
                      </span>
                      <span className="bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-150 text-xs text-gray-600 font-bold">
                        Sector Context: <span className="text-gray-800">{sector}</span>
                      </span>
                    </div>
                  </div>

                  {/* Ultimate Circular/Gauging Overall rating */}
                  <div className="bg-slate-900 text-white rounded-2xl p-6 flex items-center gap-4 border border-slate-800 shrink-0 shadow-lg">
                    <div className="relative flex items-center justify-center">
                      <svg className="w-20 h-20 transform -rotate-90">
                        <circle cx="40" cy="40" r="34" className="stroke-slate-800 fill-transparent" strokeWidth="8" />
                        <circle
                          cx="40"
                          cy="40"
                          r="34"
                          className="stroke-emerald-400 fill-transparent transition-all duration-1000"
                          strokeWidth="8"
                          strokeDasharray="213.6"
                          strokeDashoffset={213.6 - (213.6 * adjustedOverallScore) / 100}
                        />
                      </svg>
                      <span className="absolute text-xl font-black text-white">{adjustedOverallScore}%</span>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wide">Overall Rating Score</span>
                      <span className="text-xs font-semibold text-emerald-300 block">{adjustedOverallScore >= 75 ? 'Excellent Performance' : adjustedOverallScore >= 50 ? 'Developing' : 'Critical Action Needed'}</span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">Includes {completedTasks.length} continuous tasks completed.</span>
                    </div>
                  </div>
                </div>

                {/* Sub Pillars Breakdowns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 border-t border-gray-100 pt-6">
                  
                  {/* Pillar E Card */}
                  <div className="p-4 bg-emerald-50/30 rounded-2xl border border-emerald-100 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-emerald-900 uppercase">Environmental (E)</span>
                      <span className="text-lg font-black text-emerald-800">{adjustedEScore}%</span>
                    </div>
                    <div className="w-full bg-emerald-250/20 rounded-full h-1.5">
                      <div className="bg-emerald-700 h-1.5 rounded-full" style={{ width: `${adjustedEScore}%` }} />
                    </div>
                    <div className="flex justify-between text-[10px] text-emerald-800 font-semibold pt-1">
                      <span>Carbon: {carbonFootprintTon} tCO2e</span>
                      <span>Tasks: {completedTasks.filter(t => t.pilar === 'E').length} / {tasks.filter(t => t.pilar === 'E').length} Done</span>
                    </div>
                  </div>

                  {/* Pillar S Card */}
                  <div className="p-4 bg-indigo-50/35 rounded-2xl border border-indigo-100 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-indigo-900 uppercase">Social (S)</span>
                      <span className="text-lg font-black text-indigo-800">{adjustedSScore}%</span>
                    </div>
                    <div className="w-full bg-indigo-200/20 rounded-full h-1.5">
                      <div className="bg-indigo-700 h-1.5 rounded-full" style={{ width: `${adjustedSScore}%` }} />
                    </div>
                    <div className="flex justify-between text-[10px] text-indigo-800 font-semibold pt-1">
                      <span>Leadership Diversity: {diversityRatio}%</span>
                      <span>Tasks: {completedTasks.filter(t => t.pilar === 'S').length} / {tasks.filter(t => t.pilar === 'S').length} Done</span>
                    </div>
                  </div>

                  {/* Pillar G Card */}
                  <div className="p-4 bg-amber-50/40 rounded-2xl border border-amber-100 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-amber-900 uppercase">Governance (G)</span>
                      <span className="text-lg font-black text-amber-800">{adjustedGScore}%</span>
                    </div>
                    <div className="w-full bg-amber-200/30 rounded-full h-1.5">
                      <div className="bg-amber-600 h-1.5 rounded-full" style={{ width: `${adjustedGScore}%` }} />
                    </div>
                    <div className="flex justify-between text-[10px] text-amber-800 font-semibold pt-1">
                      <span>Board Indep: {boardIndependencePercent}%</span>
                      <span>Tasks: {completedTasks.filter(t => t.pilar === 'G').length} / {tasks.filter(t => t.pilar === 'G').length} Done</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Compliance Gap & Regulatory Vulnerability Alarm */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Vulnerability Warnings & Regulatory risks */}
                <div className="lg:col-span-2 bg-white border border-gray-150 rounded-2xl p-6 shadow-xs space-y-4">
                  <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                    <div>
                      <h3 className="font-bold text-gray-800 text-sm">Regulatory Compliance Risk Log</h3>
                      <span className="text-[10px] text-gray-400 block">Identified gaps under CSRD, SEC, and GRI standards</span>
                    </div>
                  </div>

                  <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 text-xs text-amber-900/90 leading-relaxed font-semibold">
                    {diagResult.complianceGap}
                  </div>

                  {/* Organizational Gaps / Weaknesses List */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Core Gaps Detected</span>
                    {diagResult.gaps.map((gap, idx) => (
                      <div key={idx} className="flex gap-2 items-start text-xs text-gray-600 font-semibold bg-rose-50/50 p-2.5 rounded-lg border border-rose-100/50">
                        <span className="w-1.5 h-1.5 bg-rose-500 rounded-full mt-1.5 shrink-0" />
                        <span>{gap}</span>
                      </div>
                    ))}
                  </div>

                  {/* Commendable Strengths */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Identified Organizational Achievements</span>
                    {diagResult.strengths.map((str, idx) => (
                      <div key={idx} className="flex gap-2 items-start text-xs text-gray-600 font-semibold bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-100/50">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 shrink-0" />
                        <span>{str}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dashboard Side Widget: High Priority outstanding checklist */}
                <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-xs space-y-4 h-fit">
                  <div className="border-b border-gray-100 pb-3">
                    <h3 className="font-bold text-gray-800 text-sm">Ongoing Priority Actions</h3>
                    <span className="text-[10px] text-gray-400 block">Immediate strategic milestones needed</span>
                  </div>

                  {tasks.filter(t => t.status !== "Completed").slice(0, 3).length === 0 ? (
                    <div className="text-center p-6 text-gray-300">
                      <ShieldCheck className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                      <span className="text-xs font-bold text-emerald-800 block">All actions completed!</span>
                      <p className="text-[10px] text-gray-400">Run a new self-audit or add custom items to track progression.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {tasks.filter(t => t.status !== "Completed").slice(0, 3).map((task) => (
                        <div key={task.id} className="p-3.5 bg-gray-50 border border-gray-150 rounded-lg space-y-1">
                          <div className="flex justify-between items-center">
                            <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded ${
                              task.pilar === 'E' ? 'bg-emerald-50 text-emerald-800' :
                              task.pilar === 'S' ? 'bg-indigo-50 text-indigo-800' : 'bg-amber-50 text-amber-800'
                            }`}>
                              Pilar {task.pilar}
                            </span>
                            <span className="text-[9px] font-extrabold text-rose-600 uppercase">{task.priority} Priority</span>
                          </div>
                          <span className="block font-semibold text-gray-800 text-xs leading-normal">{task.title}</span>
                          <button
                            onClick={() => setActiveTab("roadmap")}
                            className="text-[10px] text-emerald-800 font-bold hover:underline block pt-1"
                          >
                            Execute Strategic Step →
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <button
                    onClick={() => setActiveTab("roadmap")}
                    className="w-full text-center text-xs py-2.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 font-bold block"
                  >
                    View All Active Actions ({tasks.filter(t => t.status !== 'Completed').length})
                  </button>
                </div>
                      {/* SCREEN 8: CONTINUOUS USE CENTER & MILESTONES */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
                
                {/* Monthly Check-in & Historical Score Comparison (2/3 width) */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* Performance comparison & progression graph */}
                  <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-xs space-y-5">
                    <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-gray-800 text-sm flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-emerald-800" /> Continuous Audit Progression & Historical Scores
                        </h3>
                        <span className="text-[10px] text-gray-400 block">Compare initial diagnostic baselines with active roadmap updates</span>
                      </div>
                      <span className="text-[10px] bg-emerald-50 text-emerald-800 px-3 py-1 rounded border border-emerald-100 font-extrabold uppercase tracking-widest">
                        2026 CYCLE STATUS
                      </span>
                    </div>

                    {/* Historical score timeline & comparison info cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      {/* Initial vs Current Benchmarks */}
                      <div className="p-4 bg-emerald-50/20 border border-emerald-100 rounded-xl space-y-3">
                        <span className="text-[9px] font-bold text-emerald-800 uppercase tracking-widest block">Audit Maturity Shift</span>
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <span className="text-2xl font-black text-gray-400 block">48%</span>
                            <span className="text-[9px] text-gray-500 block font-bold leading-none">Baseline Index</span>
                          </div>
                          <div className="text-xl font-bold text-emerald-800">→</div>
                          <div className="text-center">
                            <span className="text-3xl font-black text-emerald-850 block">{adjustedOverallScore}%</span>
                            <span className="text-[9px] text-emerald-800 block font-bold leading-none">Active Index</span>
                          </div>
                          <div className="ml-auto bg-emerald-800 text-white p-2 rounded-xl text-center">
                            <span className="text-[10px] font-extrabold block leading-normal">
                              +{Math.max(0, adjustedOverallScore - 48)}%
                            </span>
                            <span className="text-[8px] block uppercase tracking-tight">Growth</span>
                          </div>
                        </div>
                        <p className="text-[10px] text-gray-500 leading-normal">
                          Baseline represents standard sample credentials before active action items were achieved.
                        </p>
                      </div>

                      {/* Timeline bar graph representation */}
                      <div className="p-4 bg-gray-50/50 border border-gray-150 rounded-xl space-y-3 flex flex-col justify-between">
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">Audit Index Progression Timeline</span>
                        
                        <div className="relative h-16 flex items-end justify-between px-2 pb-1 bg-white border border-gray-100 rounded-lg overflow-hidden">
                          <div className="absolute top-1 left-2 text-[8px] font-bold text-gray-400 uppercase">Maturity %</div>
                          
                          <div className="flex flex-col items-center gap-0.5">
                            <div className="w-7 bg-slate-200 text-[8px] text-slate-700 font-bold text-center rounded-t-sm" style={{ height: "24px" }} />
                            <span className="text-[8px] font-bold text-gray-500">Jan</span>
                          </div>
                          
                          <div className="flex flex-col items-center gap-0.5">
                            <div className="w-7 bg-slate-200 text-[8px] text-slate-700 font-bold text-center rounded-t-sm" style={{ height: "26px" }} />
                            <span className="text-[8px] font-bold text-gray-500">Feb</span>
                          </div>

                          <div className="flex flex-col items-center gap-0.5">
                            <div className="w-7 bg-emerald-700/40 text-[8px] text-emerald-900 font-bold text-center rounded-t-sm" style={{ height: "30px" }} />
                            <span className="text-[8px] font-bold text-gray-500">Mar</span>
                          </div>

                          <div className="flex flex-col items-center gap-0.5">
                            <div className="w-7 bg-emerald-800 text-[8px] text-white font-bold text-center rounded-t-sm" style={{ height: `${adjustedOverallScore * 0.5}px`, minHeight: "20px" }} />
                            <span className="text-[8px] font-bold text-emerald-850">Current {adjustedOverallScore}%</span>
                          </div>
                        </div>

                        <p className="text-[9px] text-gray-400 italic">Timeline index syncs dynamically to completed tasks.</p>
                      </div>

                    </div>
                  </div>

                  {/* Interactive Monthly check-in form module */}
                  <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-xs space-y-4">
                    <div className="border-b border-gray-100 pb-3">
                      <h4 className="font-semibold text-gray-800 text-sm flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-emerald-800" /> Active Monthly ESG Check-in Engine
                      </h4>
                      <span className="text-[10px] text-gray-400 block">Record updates on newly achieved targets to recalculate scores</span>
                    </div>

                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        const month = formData.get("month") as string;
                        const pillar = formData.get("pillar") as string;
                        const notes = formData.get("notes") as string;
                        
                        if (!notes || notes.trim().length === 0) return;

                        // Mock update in activity list
                        handleActivityAdded({
                          id: `monthly-check-${Date.now()}`,
                          timestamp: month,
                          taskTitle: `Monthly check-in: Pillar ${pillar}`,
                          actionTaken: notes,
                          impactEstimated: "Check-in logged into permanent auditable registry to support compliance review cycles."
                        });

                        // Empty inputs or generate success indication
                        e.currentTarget.reset();
                        alert(`✓ ESG Check-in successfully recorded! Activity timeline updated for ${month}.`);
                      }}
                      className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    >
                      <div className="space-y-1">
                        <label className="block text-[10px] font-semibold text-gray-500 uppercase">Assessment Month</label>
                        <select 
                          name="month" 
                          className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-lg font-bold"
                          defaultValue="April 2026"
                        >
                          <option value="April 2026">April 2026</option>
                          <option value="May 2026">May 2026</option>
                          <option value="June 2026">June 2026</option>
                          <option value="July 2026">July 2026</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10px] font-semibold text-gray-500 uppercase">Pillar Category</label>
                        <select 
                          name="pillar" 
                          className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-lg font-bold"
                        >
                          <option value="E">Environmental (Pillar E)</option>
                          <option value="S">Social (Pillar S)</option>
                          <option value="G">Governance (Pillar G)</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10px] font-semibold text-gray-500 uppercase">Progress Verification Evidence</label>
                        <input 
                          type="text" 
                          name="notes"
                          placeholder="e.g., Secured 50% clean fuel invoice, updated policy"
                          className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-lg font-semibold"
                          required
                        />
                      </div>

                      <div className="md:col-span-3 flex justify-end">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          Submit Monthly Check-in to History
                        </button>
                      </div>
                    </form>
                  </div>

                </div>

                {/* Reminders, counts & Persona Guide (1/3 width) */}
                <div className="space-y-6">
                  
                  {/* Notifications and reminder centers */}
                  <div className="bg-emerald-950 border border-emerald-900 text-white rounded-2xl p-6 shadow-xs space-y-4">
                    <div className="border-b border-white/10 pb-3">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-400">2026 Renewal Countdown</h4>
                      <span className="text-[10px] text-emerald-100/60 block font-semibold">Continuous reminders for ESG renewals</span>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-white text-[11px]">Carbon Sourcing baseline audit</span>
                          <span className="text-[9px] bg-amber-500 text-emerald-950 px-2 py-0.5 rounded font-extrabold">22 DAYS</span>
                        </div>
                        <p className="text-[9px] text-emerald-100/70 leading-normal">Required for Scope 1 quarterly reconciliation reports.</p>
                      </div>

                      <div className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-white text-[11px]">SA8000 Vendor compliance checks</span>
                          <span className="text-[9px] bg-red-400 text-emerald-900 px-2 py-0.5 rounded font-extrabold">OVERDUE</span>
                        </div>
                        <p className="text-[9px] text-emerald-100/70 leading-normal">Requires scanning supplier questionnaire pacts.</p>
                      </div>

                      <div className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-white text-[11px]">Privacy CCPA regulatory filing</span>
                          <span className="text-[9px] bg-slate-400 text-white px-2 py-0.5 rounded font-extrabold">Q4 CYCLE</span>
                        </div>
                        <p className="text-[9px] text-emerald-100/70 leading-normal">Audit cyber logs and data whistleblower hotlines.</p>
                      </div>
                    </div>
                  </div>

                  {/* Why keep using this app? Persona-tailored advice */}
                  <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-xs space-y-3">
                    <span className="text-[10px] uppercase tracking-widest text-emerald-800 font-extrabold block">Why Maintain Continuous Use?</span>
                    <h5 className="text-[11px] font-extrabold text-gray-950">Active Persona Context Advantage</h5>
                    
                    <div className="space-y-2.5 text-[11px] leading-relaxed text-gray-600">
                      {userRole === "Corporate ESG Manager" && (
                        <p>✓ Track CSRD double materiality, prepare board minutes effortlessly, and aggregate evidence for external audits.</p>
                      )}
                      {userRole === "SME Owner/Operator" && (
                        <p>✓ Sustain supply-chain certifications to bypass procurement hurdles from prime enterprise clients.</p>
                      )}
                      {userRole === "Investor/Financial Analyst" && (
                        <p>✓ Update ESG maturities periodically to mitigate credit risk before refinancing tranches.</p>
                      )}
                      {userRole === "Procurement/Supply Chain Manager" && (
                        <p>✓ Continue updating supplier hazard registers to safeguard logistics operations against labor standard surprises.</p>
                      )}
                      {userRole === "Consultant/ESG Advisor" && (
                        <p>✓ Quickly evaluate client progress, refresh bilingual executive snapshots, and generate updated decks.</p>
                      )}
                      {userRole === "University/School Administrator" && (
                        <p>✓ Coordinate annual transparency audits, tracking campus waste offsets and gender splitting indicators.</p>
                      )}
                      {userRole === "NGO/Community Representative" && (
                        <p>✓ Document grassroots welfare audits, ensuring local community support indices are preserved.</p>
                      )}
                      <p className="text-[10px] text-gray-400 pt-1">
                        Your diagnostic engine adapts automatically to optimize the 30-60-90 day implementation roadmaps.
                      </p>
                    </div>

                    <div className="pt-2 border-t border-gray-100">
                      <button
                        onClick={() => setActiveTab("audit")}
                        className="px-4 py-2 border border-emerald-800 text-emerald-850 hover:bg-emerald-50 rounded-lg font-bold text-[11px] block w-full text-center transition-colors"
                      >
                        Start Next Diagnostics Scan
                      </button>
                    </div>
                  </div>

                </div>
              </div>              </div>
            </div>
          )}

          {activeTab === "audit" && (
            <DiagnosticWizard
              userRole={userRole}
              setUserRole={setUserRole}
              sector={sector}
              setSector={setSector}
              onDiagnosticComplete={handleDiagnosticComplete}
            />
          )}

          {activeTab === "roadmap" && (
            <ActionRoadmap
              tasks={tasks}
              onTasksUpdate={setTasks}
              activityHistory={activityHistory}
              onActivityAdded={handleActivityAdded}
              onActivityCleared={handleActivityCleared}
              overallScore={adjustedOverallScore}
            />
          )}

          {activeTab === "carbon" && (
            <ScopeCarbonTracker
              onMetricsUpdate={handleMetricsCalculated}
              initialCarbon={carbonFootprintTon}
              initialDiversity={diversityRatio}
              initialBoard={boardIndependencePercent}
            />
          )}

          {activeTab === "suppliers" && (
            <SupplierScreening />
          )}

          {activeTab === "risks" && (
            <RiskRegister
              diagResult={diagResult}
              tasks={tasks}
              onUpdateTask={handleUpdateTask}
            />
          )}

          {activeTab === "reports" && (
            <ReportGenerator
              diagResult={diagResult}
              tasks={tasks}
              organizationName={localStorage.getItem("esg_org_name") || "Global Logistics Inc."}
              sector={sector}
              userRole={userRole}
            />
          )}

          {activeTab === "chat" && (
            <EsgChatAdvisor
              userRole={userRole}
              sector={sector}
            />
          )}
        </section>
        </div>
        )}
      </main>

      {/* Sustainable footer design markup */}
      <footer className="bg-white border-t border-gray-150 px-4 py-6 mt-12 shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-gray-450 gap-3">
          <p className="font-semibold text-gray-500">
            © 2026 ESG Advisor Agent. Auditable sustainability management systems.
          </p>
          <div className="flex gap-4">
            <span className="text-gray-400">ISO 14001 / GRI / SASB Framework Standards Mapping</span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-400">Scope 1, 2, 3 Certified Logic</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
