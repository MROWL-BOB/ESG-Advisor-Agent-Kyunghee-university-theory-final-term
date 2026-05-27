import React from "react";
import { 
  ShieldCheck, 
  Cpu, 
  TrendingUp, 
  FileText, 
  Settings, 
  HelpCircle, 
  Award,
  Globe2,
  ClipboardList,
  PlayCircle
} from "lucide-react";

interface LandingPageProps {
  onStartDiagnosis: () => void;
  onLaunchSimulation: () => void;
}

export default function LandingPage({ onStartDiagnosis, onLaunchSimulation }: LandingPageProps) {
  return (
    <div className="bg-slate-50 text-gray-800 font-sans" id="landing-page-container">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-900 text-white py-16 px-6 sm:px-12 rounded-3xl border border-emerald-950 shadow-xl">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center space-y-6 relative">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black bg-emerald-800/80 text-emerald-300 border border-emerald-700/50 uppercase tracking-widest mx-auto">
            <Cpu className="w-4 h-4 text-emerald-400" /> Standard CSRD & GRI Framework Mapping
          </span>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight text-white">
            ESG Advisor Agent
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-emerald-100/90 font-medium max-w-3xl mx-auto leading-relaxed">
            AI-Powered ESG Diagnostic Diagnostics & Sustainable Management System (SMS). Close compliance gaps, calculate emissions, audit supply chains, and build professional sustainability summaries instantly.
          </p>

          {/* Interactive CTA buttons */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
            <button
              onClick={onStartDiagnosis}
              id="cta-start-diagnosis"
              className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm rounded-xl shadow-lg hover:shadow-emerald-500/25 transition-all text-center flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              Start ESG Diagnosis
            </button>
            
            <button
              onClick={onLaunchSimulation}
              id="cta-run-simulation"
              className="w-full sm:w-auto px-8 py-4 bg-slate-800/90 hover:bg-slate-850 text-emerald-300 border border-emerald-800/50 hover:border-emerald-700 font-extrabold text-sm rounded-xl transition-all text-center flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <PlayCircle className="w-5 h-5" /> Run GreenTech Demo Simulation
            </button>
          </div>

          <div className="pt-4 text-xs text-gray-400 font-semibold tracking-wide">
            ✓ Simulated or Real Gemini-Powered Diagnoses &bull; ✓ Real-time calculations &bull; ✓ Export TXT, CSV & Presentation
          </div>
        </div>
      </section>

      {/* Feature Breakdown Explanation (AI Agent & SMS System Detail) */}
      <section className="py-12 max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900">How the ESG Advisor Agent Works</h2>
          <p className="text-gray-500 text-sm max-w-2xl mx-auto">
            Adopting standard, continuous corporate responsibility requires both dynamic intelligence models and organized activity mapping.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* AI ESG Diagnostic Agent Column */}
          <div className="bg-white rounded-2xl border border-gray-150 p-6 md:p-8 space-y-4 shadow-xs relative">
            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-700">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">1. AI ESG Diagnostic Agent</h3>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              Analyzes multi-pillar questionnaire inputs, uploaded evidence documents, and raw operational logs through the advanced <strong>Gemini Large Language Model</strong>.
            </p>
            <ul className="space-y-2 text-xs text-gray-550 font-medium">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                Diagnose regulatory liabilities (CSRD/GRI compliance targets)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                Analyze Scope 3 risks across listed supplier credentials
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                Generates instant tailored action priorities as digital milestones
              </li>
            </ul>
          </div>

          {/* Sustainable Management System (SMS) Column */}
          <div className="bg-white rounded-2xl border border-gray-150 p-6 md:p-8 space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700">
              <Settings className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">2. Sustainable Management System (SMS)</h3>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              Provides the structural tracking ledger to convert recommendations into verifiable compliance milestones. Coordinates quantitative emissions monitoring and delivers audit reports.
            </p>
            <ul className="space-y-2 text-xs text-gray-550 font-medium">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Interactive 90-day progress timeline & active score updates
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Dual tracking for Scope 1 & 2 carbon and supplier risk tiers
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Downloadable reports, audited summaries, list details & CSV spreadsheets
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* MVP Simulation Spotlight & Value Presentation */}
      <section className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-10 border border-emerald-900 shadow-lg max-w-6xl mx-auto relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <span className="inline-flex items-center gap-1.5 text-xs text-emerald-300 font-extrabold bg-emerald-900/60 px-3 py-1 rounded-full border border-emerald-800">
              <Award className="w-3.5 h-3.5 text-emerald-400" /> Interactive Demo Environment
            </span>
            <h3 className="text-2xl font-black text-white">Experience GreenTech Manufacturing Co.</h3>
            <p className="text-emerald-100/80 text-xs sm:text-sm leading-relaxed">
              Explore the fully designed MVP simulation workflow. Load raw test parameters for a real manufacturing plant, click to complete carbon fleet refits, appoint governance board members, observe live scores jumping, and preview audited reports instantly.
            </p>
          </div>
          <button
            onClick={onLaunchSimulation}
            className="w-full lg:w-auto px-6 py-3.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-sm rounded-xl shadow-md transition-colors text-center shrink-0"
          >
            Load Prototype Simulation
          </button>
        </div>
      </section>

    </div>
  );
}
