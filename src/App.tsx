import React, { useState } from "react";
import LandingPage from "./components/LandingPage";
import EsgDashboard from "./components/EsgDashboard";
import EsgChatPanel from "./components/EsgChatPanel";
import EsgDomainMap from "./components/EsgDomainMap";
import DesignLogicPanel from "./components/DesignLogicPanel";
import AiMatchingTable from "./components/AiMatchingTable";
import PriorityMatrix from "./components/PriorityMatrix";
import MvpDemoFlow from "./components/MvpDemoFlow";
import FinalSummaryPage from "./components/FinalSummaryPage";
import { 
  Leaf, 
  Home, 
  LayoutDashboard, 
  MessageSquare, 
  Layers, 
  TableProperties, 
  Award, 
  Cpu, 
  AlertCircle 
} from "lucide-react";

type ActiveTab = "landing" | "dashboard" | "chat" | "demo" | "mapping" | "summary";

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("landing");
  const [organizationName, setOrganizationName] = useState<string>("Green Logistics Corp");
  const [industrySector, setIndustrySector] = useState<string>("Manufacturing & Logistics");
  
  // Custom chat prefilled question state
  const [chatPrefill, setChatPrefill] = useState<string>("");

  const handleNavigateToChat = (question: string) => {
    setActiveTab("chat");
    setChatPrefill(question);
  };

  const handleNavigateToDemo = () => {
    setActiveTab("demo");
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col font-sans antialiased selection:bg-emerald-100 selection:text-emerald-950">
      
      {/* Top Academic Header */}
      <header className="bg-emerald-950 text-white border-b border-emerald-900 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-emerald-900 rounded-lg text-emerald-350 border border-emerald-805">
              <Leaf className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h1 className="font-extrabold text-[15px] font-display tracking-tight leading-none text-white uppercase">
                ESG AI Advisor
              </h1>
              <span className="text-[9.5px] font-mono tracking-wider text-emerald-305 uppercase inline-block mt-0.5">
                Strategic Sustainability AI Engine
              </span>
            </div>
          </div>

          {/* SaaS Navigation Tab Controls */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              id="tab-btn-landing"
              onClick={() => setActiveTab("landing")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-colors flex items-center gap-1.5 ${
                activeTab === "landing" ? "bg-emerald-900 text-white font-extrabold" : "text-emerald-100 hover:bg-emerald-900/40"
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              Home
            </button>
            <button
              id="tab-btn-dashboard"
              onClick={() => setActiveTab("dashboard")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-colors flex items-center gap-1.5 ${
                activeTab === "dashboard" ? "bg-emerald-900 text-white font-extrabold" : "text-emerald-100 hover:bg-emerald-900/40"
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              SaaS Dashboard
            </button>
            <button
              id="tab-btn-chat"
              onClick={() => setActiveTab("chat")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-colors flex items-center gap-1.5 ${
                activeTab === "chat" ? "bg-emerald-900 text-white font-extrabold" : "text-emerald-100 hover:bg-emerald-900/40"
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              AI Chat Advisor
            </button>
            <button
              id="tab-btn-demo"
              onClick={() => setActiveTab("demo")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-colors flex items-center gap-1.5 ${
                activeTab === "demo" ? "bg-emerald-900 text-white font-extrabold" : "text-emerald-100 hover:bg-emerald-900/40"
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              Interactive MVP Demo
            </button>
            <button
              id="tab-btn-mapping"
              onClick={() => setActiveTab("mapping")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-colors flex items-center gap-1.5 ${
                activeTab === "mapping" ? "bg-emerald-900 text-white font-extrabold" : "text-emerald-100 hover:bg-emerald-900/40"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Domain Map & Priority
            </button>
            <button
              id="tab-btn-summary"
              onClick={() => setActiveTab("summary")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-colors flex items-center gap-1.5 ${
                activeTab === "summary" ? "bg-emerald-900 text-white font-extrabold" : "text-emerald-100 hover:bg-emerald-900/40"
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              Synthesis
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Responsive Sub Header Navigation Row */}
      <div className="bg-emerald-900 text-white lg:hidden px-4 py-2 border-b border-emerald-950 flex gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab("landing")}
          className={`px-3 py-1 rounded text-xs whitespace-nowrap font-bold shrink-0 ${activeTab === "landing" ? "bg-emerald-955 text-white" : "text-emerald-150"}`}
        >
          Home
        </button>
        <button
          onClick={() => setActiveTab("dashboard")}
          className={`px-3 py-1 rounded text-xs whitespace-nowrap font-bold shrink-0 ${activeTab === "dashboard" ? "bg-emerald-955 text-white" : "text-emerald-150"}`}
        >
          SaaS Dashboard
        </button>
        <button
          onClick={() => setActiveTab("chat")}
          className={`px-3 py-1 rounded text-xs whitespace-nowrap font-bold shrink-0 ${activeTab === "chat" ? "bg-emerald-955 text-white" : "text-emerald-150"}`}
        >
          AI Chat Advisor
        </button>
        <button
          onClick={() => setActiveTab("demo")}
          className={`px-3 py-1 rounded text-xs whitespace-nowrap font-bold shrink-0 ${activeTab === "demo" ? "bg-emerald-954 text-white" : "text-emerald-150"}`}
        >
          MVP Demo
        </button>
        <button
          onClick={() => setActiveTab("mapping")}
          className={`px-3 py-1 rounded text-xs whitespace-nowrap font-bold shrink-0 ${activeTab === "mapping" ? "bg-emerald-955 text-white" : "text-emerald-150"}`}
        >
          Domain Map
        </button>
        <button
          onClick={() => setActiveTab("summary")}
          className={`px-3 py-1 rounded text-xs whitespace-nowrap font-bold shrink-0 ${activeTab === "summary" ? "bg-emerald-955 text-white" : "text-emerald-150"}`}
        >
          Synthesis
        </button>
      </div>

      {/* Main Core View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-10">
        
        {activeTab === "landing" && (
          <LandingPage
            onStartAdvisory={() => setActiveTab("dashboard")}
            onViewDomainMap={() => setActiveTab("mapping")}
            organizationName={organizationName}
            setOrganizationName={setOrganizationName}
            industrySector={industrySector}
            setIndustrySector={setIndustrySector}
          />
        )}

        {activeTab === "dashboard" && (
          <EsgDashboard
            organizationName={organizationName}
            industrySector={industrySector}
            onNavigateToChat={handleNavigateToChat}
            onNavigateToDemo={handleNavigateToDemo}
          />
        )}

        {activeTab === "chat" && (
          <div className="space-y-4 max-w-5xl mx-auto">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex gap-3 items-start text-xs text-emerald-950 font-medium">
              <AlertCircle className="w-5 h-5 text-emerald-900 shrink-0 mt-0.5" />
              <div>
                <strong>Expert ESG Advisor Mode Active:</strong> Paste any sustainability policy papers, carbon data spreadsheets, or vendor ethics challenges here. Our specialized advisor automatically guides calculations, evaluates risk vectors, and maps corrective priorities.
              </div>
            </div>
            <EsgChatPanel
              organizationName={organizationName}
              industrySector={industrySector}
            />
          </div>
        )}

        {activeTab === "demo" && (
          <div className="max-w-5xl mx-auto">
            <MvpDemoFlow
              organizationName={organizationName}
              industrySector={industrySector}
              onAuditFinished={() => setActiveTab("dashboard")}
            />
          </div>
        )}

        {activeTab === "mapping" && (
          <div className="space-y-10 max-w-5xl mx-auto">
            {/* The Organization Domain Map */}
            <EsgDomainMap />

            {/* AI Function Matching Table */}
            <AiMatchingTable />

            {/* Explanatory Priority Recommendation Grid */}
            <PriorityMatrix />

            {/* Expanded hidden design logic behind the advisor */}
            <div className="border-t border-gray-200 pt-8">
              <DesignLogicPanel />
            </div>
          </div>
        )}

        {activeTab === "summary" && (
          <div className="max-w-5xl mx-auto">
            <FinalSummaryPage />
          </div>
        )}

      </main>

      {/* Humble aesthetic footer */}
      <footer className="bg-white border-t border-gray-250 py-5 text-center mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-400 font-mono">
          <span className="uppercase font-bold tracking-wider text-emerald-900">ESG AI Advisor Applet Suite</span>
          <span>© 2026 ESG DESIGN LABS | ALL RIGOROUS STANDARDS RESERVED</span>
        </div>
      </footer>

    </div>
  );
}
