import React from "react";
import { Leaf, Award, Shield, FileText, ArrowRight, Layers } from "lucide-react";

interface LandingPageProps {
  onStartAdvisory: () => void;
  onViewDomainMap: () => void;
  organizationName: string;
  setOrganizationName: (name: string) => void;
  industrySector: string;
  setIndustrySector: (sector: string) => void;
}

export default function LandingPage({
  onStartAdvisory,
  onViewDomainMap,
  organizationName,
  setOrganizationName,
  industrySector,
  setIndustrySector
}: LandingPageProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 space-y-16 animate-fade-in" id="landing-page-container">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-50 rounded-full text-xs font-semibold text-emerald-800 border border-emerald-200">
          <Leaf className="w-4 h-4 text-emerald-600 animate-pulse" />
          <span>Professional ESG Advisory Agent</span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-emerald-950 font-display tracking-tight leading-none" id="landing-title">
          ESG AI Advisor
        </h1>
        <p className="text-lg md:text-xl text-gray-600 font-sans leading-relaxed" id="landing-subtitle">
          An AI-powered assistant for ESG analysis, advisory, and sustainable management.
        </p>
        <div className="p-4 bg-emerald-50/40 rounded-xl border border-emerald-150 inline-block font-medium text-sm text-emerald-900 max-w-2xl">
          “Analyze ESG information, identify risks, generate recommendations, and support sustainable decision-making.”
        </div>

        {/* Demo Organization Settings Form embedded in Landing Page */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm text-left max-w-xl mx-auto space-y-4">
          <h3 className="font-bold text-emerald-950 text-sm">Target Analysis Context</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-gray-500 uppercase">Organization Name</label>
              <input
                type="text"
                id="org-name-input"
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
                className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-lg font-semibold focus:bg-white focus:outline-emerald-800"
                placeholder="e.g. Green Logistics Corp"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-gray-500 uppercase">Industry Sector</label>
              <input
                type="text"
                id="sector-input"
                value={industrySector}
                onChange={(e) => setIndustrySector(e.target.value)}
                className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-lg font-semibold focus:bg-white focus:outline-emerald-800"
                placeholder="e.g. Logistics & Manufacturing"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            id="start-advisory-btn"
            onClick={onStartAdvisory}
            className="w-full sm:w-auto px-8 py-3.5 bg-emerald-900 hover:bg-emerald-950 text-white rounded-xl font-bold cursor-pointer transition-all shadow-md inline-flex items-center justify-center gap-2 text-sm"
          >
            Start ESG Advisory
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            id="view-domain-map-btn"
            onClick={onViewDomainMap}
            className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 rounded-xl font-semibold cursor-pointer transition-all shadow-sm inline-flex items-center justify-center gap-2 text-sm"
          >
            <Layers className="w-4 h-4 text-emerald-800" />
            View ESG Domain Map
          </button>
        </div>
      </div>

      {/* Feature Highlight Brief Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-205 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-150 flex items-center justify-center text-emerald-900 font-bold shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-emerald-950 font-display">Structured Understanding</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Transition from unstructured, fragmented ESG operational records and utility bills to structured frameworks aligned with SASB, GRI, and CSRD reporting guidelines.
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-205 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-150 flex items-center justify-center text-emerald-900 font-bold shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-emerald-950 font-display">Targeted Risk Isolation</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Audit supply chain questionnaires, identify governance weaknesses, track safety credentials, and point out data validation gaps continuously.
          </p>
        </div>

          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-205 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-150 flex items-center justify-center text-emerald-900 font-bold shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-emerald-950 font-display">Immediate Action Roadmaps</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Formulate actionable ESG remediation steps, draft integrated summaries, and assign 30-day priorities to achieve robust compliance certifications.
          </p>
        </div>
      </div>

      {/* Brief Explanation Text */}
      <div className="bg-gray-50 p-8 rounded-3xl border border-gray-200 text-center space-y-3">
        <h3 className="font-bold text-emerald-950 text-sm">Strategic Governance Methodology</h3>
        <p className="text-sm text-gray-600 leading-relaxed max-w-4xl mx-auto">
          ESG AI Advisor helps organizations understand ESG work by analyzing environmental, social, governance, supplier, reporting, and sustainability action tasks through AI-supported reasoning. It helps prioritize what is feasible, screen third-party vendors, draft compliance disclosures, and track monthly milestone progress.
        </p>
      </div>
    </div>
  );
}
