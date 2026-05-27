import React, { useState } from "react";
import { UserRole, IndustrySector, QuestionnaireAnswer, DiagnosticResult } from "../types";
import { 
  ShieldCheck, 
  HelpCircle, 
  AlertTriangle, 
  Cpu, 
  Loader2, 
  Sparkles, 
  CheckCircle, 
  FileText, 
  Upload, 
  Trash2, 
  Settings, 
  Clock, 
  Building2, 
  Globe2, 
  ShieldAlert,
  ArrowRight,
  ArrowLeft,
  Briefcase,
  Store,
  TrendingUp,
  GraduationCap,
  Users,
  Heart,
  Percent,
  Info
} from "lucide-react";

interface DiagnosticWizardProps {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  sector: IndustrySector;
  setSector: (sector: IndustrySector) => void;
  onDiagnosticComplete: (result: DiagnosticResult) => void;
}

const DEFAULT_QUESTIONS = [
  {
    id: "e-carbon",
    category: "E" as const,
    label: "Carbon & Emissions Tracking",
    text: "Does your organization calculate direct (Scope 1) and purchased energy (Scope 2) greenhouse gas emissions?",
    options: ["Yes, fully audited", "In progress / Estimating", "No tracking yet"],
  },
  {
    id: "e-waste",
    category: "E" as const,
    label: "Circular Economy & Waste",
    text: "Do you have established circular material practices, active plastics/electronic waste recycling, or strict waste reduction metrics?",
    options: ["Yes, structured policies", "Informal recycling is active", "No systematic program"],
  },
  {
    id: "e-energy",
    category: "E" as const,
    label: "Renewable Energy Mix",
    text: "Is there any portion of clean or renewable energy (e.g. solar offsets, certified green electricity tariffs) reinforcing your energy portfolio?",
    options: ["High percentage (>50%)", "Partial offsets / Low percentage", "None / Fully fossil fuels"],
  },
  {
    id: "s-equity",
    category: "S" as const,
    label: "Inclusion & Social Diversity",
    text: "Does your workplace have written equal-opportunity charters, transparent gender/minority leadership indices, or pay equity audits?",
    options: ["Yes, fully institutionalized", "Informal commitments only", "No reporting or policies"],
  },
  {
    id: "s-labor",
    category: "S" as const,
    label: "Employee Wellbeing & Labor Rights",
    text: "Are there robust whistleblower procedures, dynamic safety reviews, flexible/hybrid working protocols, or wellness training programs?",
    options: ["Excellent comprehensive support", "Standard mandatory protections only", "Underinvested / Minimal"],
  },
  {
    id: "s-community",
    category: "S" as const,
    label: "Local Stakeholder Engagement",
    text: "Does the organization contribute to local community programs, NGOs, school sponsorships, or charity partnerships annually?",
    options: ["Regular structured initiatives", "Occasional/Ad-hoc donations", "No community integrations"],
  },
  {
    id: "g-ethics",
    category: "G" as const,
    label: "Corporate Integrity & Anti-Corruption",
    text: "Do you maintain a rigorous, binding Code of Conduct alongside anonymous channels to flag corruption, bribery, or ethics violations?",
    options: ["Yes, complete and monitored", "Standard code exist but lacks auditing", "No code of conduct drafted"],
  },
  {
    id: "g-board",
    category: "G" as const,
    label: "Governing Board & Leadership Autonomy",
    text: "Is representation on the senior advisory staff or board sufficiently diverse, independent of majority owners, and free of transaction conflict?",
    options: ["Highly independent and diverse", "Slightly independent / Concentrated", "No independent oversight"],
  },
  {
    id: "g-disclosure",
    category: "G" as const,
    label: "Reporting & Public Transparency",
    text: "Do you actively release financial audits, sustainability disclosures, or organizational regulatory reports to public stakeholders?",
    options: ["Yes, annual public reporting", "Shared privately upon request", "Strictly internal records only"],
  }
];

export default function DiagnosticWizard({ 
  userRole, 
  setUserRole, 
  sector, 
  setSector, 
  onDiagnosticComplete 
}: DiagnosticWizardProps) {
  // Wizard flow steps
  const [step, setStep] = useState<"RoleSelection" | "Profile" | "Operations" | "Questionnaire" | "Submit">("RoleSelection");
  const [focusedField, setFocusedField] = useState<string>("energy");
  
  // 1. User Input Module states
  const [organizationName, setOrganizationName] = useState("");
  const [organizationSize, setOrganizationSize] = useState("Medium (50-250 employees)");
  const [countryRegion, setCountryRegion] = useState("United States");
  const [reportingPurpose, setReportingPurpose] = useState("Corporate CSRD Alignment");
  
  // Documents / Pasting list
  const [pastedReportText, setPastedReportText] = useState("");
  const [mockFiles, setMockFiles] = useState<string[]>([]);
  const [uploadValue, setUploadValue] = useState("");

  // 2. Continuous qualitative indicators
  const [energyUse, setEnergyUse] = useState("");
  const [wasteManagement, setWasteManagement] = useState("");
  const [carbonEmissions, setCarbonEmissions] = useState("");
  const [employeeWelfare, setEmployeeWelfare] = useState("");
  const [diversityInclusion, setDiversityInclusion] = useState("");
  const [healthSafety, setHealthSafety] = useState("");
  const [supplierManagement, setSupplierManagement] = useState("");
  const [antiCorruption, setAntiCorruption] = useState("");
  const [boardGovernance, setBoardGovernance] = useState("");
  const [dataPrivacy, setDataPrivacy] = useState("");

  // 3. Checklist Answers
  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    DEFAULT_QUESTIONS.forEach((q) => {
      initial[q.id] = q.options[1]; // default to "InProgress" equivalents
    });
    return initial;
  });
  const [comments, setComments] = useState<Record<string, string>>({});
  const [customContext, setCustomContext] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Drag and drop mock file additions
  const handleFileUploadMock = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileName = e.target.files[0].name;
      setMockFiles((prev) => [...prev, fileName]);
      setUploadValue("");
    }
  };

  const removeMockFile = (name: string) => {
    setMockFiles((prev) => prev.filter((f) => f !== name));
  };

  const handleOptionSelect = (qId: string, val: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: val }));
  };

  const handleCommentChange = (qId: string, text: string) => {
    setComments((prev) => ({ ...prev, [qId]: text }));
  };

  const startAnalysis = async () => {
    setLoading(true);
    setErrorMsg(null);

    // Format answers so server can parse easily
    const formattedAnswers = DEFAULT_QUESTIONS.map((q) => ({
      questionId: q.id,
      category: q.category,
      questionText: q.text,
      answerValue: answers[q.id],
      comment: comments[q.id] || "",
    }));

    // Combine manual pasted text + file names into an auditable document string representation
    const docSummaryRepresentation = `Pasted Report Text: ${pastedReportText || 'None'}\nUploaded Evidence Files: ${mockFiles.join(", ") || 'No files attached'}`;

    try {
      const res = await fetch("/api/esg/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userRole,
          sector,
          answers: formattedAnswers,
          customContext,
          
          organizationName,
          organizationSize,
          countryRegion,
          reportingPurpose,
          existingDocsList: docSummaryRepresentation,
          energyUse,
          wasteManagement,
          carbonEmissions,
          employeeWelfare,
          diversityInclusion,
          healthSafety,
          supplierManagement,
          antiCorruption,
          boardGovernance,
          dataPrivacy
        }),
      });

      if (!res.ok) {
        throw new Error("Diagnosis service failed to compute data points.");
      }

      const result: DiagnosticResult = await res.json();
      localStorage.setItem("esg_org_name", organizationName || "Global Logistics Inc.");
      onDiagnosticComplete(result);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "An unexpected error occurred during ESG report generation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-150 shadow-sm overflow-hidden" id="esg-diagnostic-wizard">
      {/* Header Panel */}
      <div className="bg-emerald-950 p-6 md:p-8 text-white relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800/10 rounded-full blur-2xl pointer-events-none" />
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-800/60 text-emerald-200 border border-emerald-700/50 mb-3">
          <Cpu className="w-3.5 h-3.5" /> ESG Diagnostic AI Agent
        </span>
        <h2 className="text-xl md:text-2xl font-black tracking-tight text-white leading-tight">AI-Powered Strategic ESG Audit</h2>
        <p className="text-emerald-100/80 text-xs md:text-sm mt-1 max-w-2xl">
          Complete the organizational mapping profile or paste reports to trigger your risk diagnostic scorecard under GRI, SASB, and CSRD compliance criteria.
        </p>

        {/* Wizard Progression Tab Indicators */}
        <div className="grid grid-cols-5 gap-1 md:gap-2 mt-6 border-t border-emerald-900/50 pt-5">
          <button
            onClick={() => !loading && setStep("RoleSelection")}
            type="button"
            className={`text-left pb-1 border-b-2 text-[9px] md:text-xs font-bold transition-all ${
              step === "RoleSelection" ? "border-emerald-400 text-emerald-300" : "border-emerald-900/50 text-emerald-200/50 hover:text-emerald-200"
            }`}
          >
            01. Persona Selection
          </button>
          <button
            onClick={() => !loading && setStep("Profile")}
            type="button"
            className={`text-left pb-1 border-b-2 text-[9px] md:text-xs font-bold transition-all ${
              step === "Profile" ? "border-emerald-400 text-emerald-300" : "border-emerald-900/50 text-emerald-200/50 hover:text-emerald-200"
            }`}
          >
            02. Profile & Docs
          </button>
          <button
            onClick={() => !loading && setStep("Operations")}
            type="button"
            className={`text-left pb-1 border-b-2 text-[9px] md:text-xs font-bold transition-all ${
              step === "Operations" ? "border-emerald-400 text-emerald-300" : "border-emerald-900/50 text-emerald-200/50 hover:text-emerald-200"
            }`}
          >
            03. Core Practices
          </button>
          <button
            onClick={() => !loading && setStep("Questionnaire")}
            type="button"
            className={`text-left pb-1 border-b-2 text-[9px] md:text-xs font-bold transition-all ${
              step === "Questionnaire" ? "border-emerald-400 text-emerald-300" : "border-emerald-900/50 text-emerald-200/50 hover:text-emerald-200"
            }`}
          >
            04. Pillar Checks
          </button>
          <button
            onClick={() => !loading && setStep("Submit")}
            type="button"
            className={`text-left pb-1 border-b-2 text-[9px] md:text-xs font-bold transition-all ${
              step === "Submit" ? "border-emerald-400 text-emerald-300" : "border-emerald-900/50 text-emerald-200/50 hover:text-emerald-200"
            }`}
          >
            05. Audit Launch
          </button>
        </div>
      </div>

      {loading ? (
        <div className="p-12 md:p-16 flex flex-col items-center justify-center text-center">
          <Loader2 className="w-12 h-12 text-emerald-800 animate-spin mb-4" />
          <h3 className="text-lg font-bold text-gray-950">AI Diagnostic Agent Conducting Evaluation...</h3>
          <p className="text-gray-500 text-xs md:text-sm max-w-lg mt-1 leading-relaxed">
            Running multi-factor risk estimation, auditing anti-corruption codes, calculating carbon maturity stages, and optimizing your 90-day execution roadmap.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 justify-center max-w-md">
            <span className="text-[10px] uppercase font-bold bg-gray-50 border border-gray-200 text-gray-500 px-3 py-1 rounded-full">CSRD compliance checks</span>
            <span className="text-[10px] uppercase font-bold bg-gray-50 border border-gray-200 text-gray-500 px-3 py-1 rounded-full">GHG scopebaselines</span>
            <span className="text-[10px] uppercase font-bold bg-gray-50 border border-gray-200 text-gray-500 px-3 py-1 rounded-full">Inclusion indices</span>
          </div>
        </div>
      ) : (
        <div className="p-6 md:p-8">
          {errorMsg && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex gap-2 items-center">
              <AlertTriangle className="w-4.5 h-4.5 text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* STEP 1: CHOOSE OPERATIONAL PERSONA & SECTOR */}
          {step === "RoleSelection" && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                <Users className="w-5 h-5 text-emerald-800" />
                <div>
                  <h3 className="font-bold text-gray-800 text-sm">Select Your Operational ESG Persona Role & Sector</h3>
                  <span className="text-[10px] text-gray-400 font-semibold block">Tailor diagnostic thresholds and compliance filters to your organization archetype</span>
                </div>
              </div>

              {/* Persona Grid */}
              <div>
                <span className="block text-xs font-bold text-gray-500 mb-2">1. Select Your Professional Role Persona *</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {[
                    {
                      id: "Corporate ESG Manager" as UserRole,
                      title: "Corporate ESG Manager",
                      desc: "Oversee complete corporate transparency, alignment with global CSRD/GRI directives, and board-level risk controls.",
                      focus: "Standard disclosures, board transparency checklists, Scope 1/2 tracking",
                      icon: Briefcase,
                      color: "emerald"
                    },
                    {
                      id: "SME Owner/Operator" as UserRole,
                      title: "SME Owner / Operator",
                      desc: "Demonstrate quick compliance to large corporate clients, address supply chain requests, and draft initial rules.",
                      focus: "Supplier codes, material waste, work hygiene, streamlined carbon invoices",
                      icon: Store,
                      color: "blue"
                    },
                    {
                      id: "Investor/Financial Analyst" as UserRole,
                      title: "Investor / Bank Analyst",
                      desc: "Assess potential capital targets, run carbon baselines, analyze credit risk profiles, and evaluate portfolio ESG alignment.",
                      focus: "Financial risk factors, ESG compliance scores, regulatory risk heatmaps",
                      icon: TrendingUp,
                      color: "amber"
                    },
                    {
                      id: "Procurement/Supply Chain Manager" as UserRole,
                      title: "Procurement / Supply Manager",
                      desc: "Screen active vendors, run environmental risk analysis, draft request letters, and compare supply-chain profiles.",
                      focus: "Supplier codes of conduct, labor safety audits, scope 3 transportation",
                      icon: Users,
                      color: "indigo"
                    },
                    {
                      id: "Consultant/ESG Advisor" as UserRole,
                      title: "ESG Consultant / Advisor",
                      desc: "Conduct diagnostic audits for multiple clients, draft improvement roadmaps, and download board-ready reports.",
                      focus: "Detailed checklists, bilingual executive summaries, tactical roadmaps",
                      icon: GraduationCap,
                      color: "purple"
                    },
                    {
                      id: "University/School Administrator" as UserRole,
                      title: "University & Public Institution",
                      desc: "Ensure campus resource efficiency, track student welfare diversity, and coordinate civic transparency reports.",
                      focus: "Inclusion ratios, campus waste systems, public sector code of conduct",
                      icon: GraduationCap,
                      color: "sky"
                    },
                    {
                      id: "NGO/Community Representative" as UserRole,
                      title: "NGO & Community Advocate",
                      desc: "Audit community environmental impacts, advocate human welfare, check supplier equity, and generate local actions.",
                      focus: "Human rights, circular recycle streams, local community support index",
                      icon: Heart,
                      color: "rose"
                    }
                  ].map((p) => {
                    const isSelected = userRole === p.id;
                    const IconComp = p.icon;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => {
                          setUserRole(p.id);
                          localStorage.setItem("esg_user_role", p.id);
                        }}
                        className={`text-left p-4 rounded-xl border transition-all flex flex-col justify-between h-full group ${
                          isSelected 
                            ? "border-emerald-800 bg-emerald-50/50 shadow-xs" 
                            : "border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300"
                        }`}
                      >
                        <div className="space-y-2">
                          <div className={`p-2 rounded-lg w-fit ${
                            isSelected ? "bg-emerald-800 text-white" : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                          }`}>
                            <IconComp className="w-4 h-4" />
                          </div>
                          <h4 className="text-xs font-bold text-gray-950">{p.title}</h4>
                          <p className="text-[10px] text-gray-500 leading-normal">{p.desc}</p>
                        </div>
                        <div className="mt-3 border-t border-dashed border-gray-100 pt-2 w-full">
                          <span className="text-[9px] font-semibold text-emerald-850 block">Pillar Priority:</span>
                          <span className="text-[9px] text-gray-450 block italic">{p.focus}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sector Grid */}
              <div className="border-t border-gray-100 pt-4">
                <label className="block text-xs font-bold text-gray-500 mb-2">2. Define Your Industry Sector *</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    "Technology & Software",
                    "Manufacturing & Logistics",
                    "Financial & Banking Services",
                    "Retail & Consumer Goods",
                    "Education & Public Affairs",
                    "Healthcare & Pharma",
                    "Energy & Mining Utilities",
                    "Non-Profit & Humanitarian Services"
                  ].map((sec) => {
                    const isSelected = sector === sec;
                    return (
                      <button
                        key={sec}
                        type="button"
                        onClick={() => {
                          setSector(sec as IndustrySector);
                          localStorage.setItem("esg_sector", sec);
                        }}
                        className={`px-3 py-2 border rounded-lg text-left text-[11px] font-bold block transition-all ${
                          isSelected 
                            ? "bg-emerald-800 text-white border-emerald-950 md:scale-[1.02]" 
                            : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        {sec}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Continue Button */}
              <div className="flex justify-end pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setStep("Profile")}
                  className="px-5 py-2.5 rounded-lg text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 inline-flex items-center gap-1"
                >
                  Proceed to Profile Context <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: ORGANIZATION PROFILE & REPORTS */}
          {step === "Profile" && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                <Building2 className="w-5 h-5 text-emerald-800" />
                <div>
                  <h3 className="font-bold text-gray-800 text-sm">Organization Identity & Sourcing Documents</h3>
                  <span className="text-[10px] text-gray-400 font-semibold block">Define context and upload existing sustainability records</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="org-name" className="block text-xs font-bold text-gray-500 mb-1">Organization Name *</label>
                  <input
                    id="org-name"
                    type="text"
                    required
                    className="w-full text-xs px-3.5 py-2.5 bg-gray-50 border border-gray-250 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-emerald-800"
                    placeholder="e.g., Global logistics Inc."
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="org-region" className="block text-xs font-bold text-gray-500 mb-1">Country or Region *</label>
                  <input
                    id="org-region"
                    type="text"
                    className="w-full text-xs px-3.5 py-2.5 bg-gray-50 border border-gray-250 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-emerald-800"
                    placeholder="e.g., California, United States"
                    value={countryRegion}
                    onChange={(e) => setCountryRegion(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="org-size" className="block text-xs font-bold text-gray-500 mb-1">Organization Scale / Size</label>
                  <select
                    id="org-size"
                    className="w-full text-xs px-3.5 py-2.5 bg-gray-50 border border-gray-250 rounded-xl text-gray-800 focus:outline-emerald-800 font-semibold"
                    value={organizationSize}
                    onChange={(e) => setOrganizationSize(e.target.value)}
                  >
                    <option value="SME / Small (<50 employees)">SME / Small (&lt;50 employees)</option>
                    <option value="Medium (50-250 employees)">Medium (50-250 employees)</option>
                    <option value="Large Enterprise (250-1000 employees)">Large Enterprise (250-1000 employees)</option>
                    <option value="Multinational Conglomerate (1000+ employees)">Multinational Conglomerate (1000+ employees)</option>
                    <option value="Public School / University">Public School / University</option>
                    <option value="Non-Governmental NGO">Non-Governmental NGO</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="org-purpose" className="block text-xs font-bold text-gray-500 mb-1">Primary ESG Reporting Purpose</label>
                  <select
                    id="org-purpose"
                    className="w-full text-xs px-3.5 py-2.5 bg-gray-50 border border-gray-250 rounded-xl text-gray-800 focus:outline-emerald-800 font-semibold"
                    value={reportingPurpose}
                    onChange={(e) => setReportingPurpose(e.target.value)}
                  >
                    <option value="Corporate CSRD Alignment">Corporate CSRD Alignment</option>
                    <option value="Supply Chain Sourcing Demands">Supply Chain Sourcing Demands</option>
                    <option value="Green Finance & Banking Investment Lines">Green Finance & Banking Investment Lines</option>
                    <option value="Public Stakeholder Disclosures">Public Stakeholder Disclosures</option>
                    <option value="Internal Sustainability Gap Assessment">Internal Sustainability Gap Assessment</option>
                  </select>
                </div>
              </div>

              {/* Paste or upload sustainability reports section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-3">
                
                {/* Text paste area */}
                <div className="space-y-1">
                  <label htmlFor="raw-text-paste" className="block text-xs font-bold text-gray-500 flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-emerald-800" /> Paste Sustainability Reports or Policy Manuals
                  </label>
                  <p className="text-[10px] text-gray-400">Paste raw company rules, employee charters, supply requirements, or questionnaire texts directly below.</p>
                  <textarea
                    id="raw-text-paste"
                    className="w-full min-h-[150px] font-mono text-[11px] p-3 border border-gray-250 rounded-xl bg-gray-50 focus:outline-emerald-800 leading-relaxed text-gray-700"
                    placeholder="Paste corporate code of ethics, carbon calculations, waste reports, chemical safety logs, board election bylaws..."
                    value={pastedReportText}
                    onChange={(e) => setPastedReportText(e.target.value)}
                  />
                </div>

                {/* File drop zone simulator */}
                <div className="space-y-1">
                  <span className="block text-xs font-bold text-gray-500 flex items-center gap-1">
                    <Upload className="w-3.5 h-3.5 text-emerald-800" /> Upload Existing ESG Documents List
                  </span>
                  <p className="text-[10px] text-gray-400">Simulate document repository attachment to verify and audit missing evidence.</p>
                  
                  <div className="border border-dashed border-gray-250 rounded-xl p-4 transition-colors hover:bg-gray-50 flex flex-col items-center justify-center text-center min-h-[100px] cursor-pointer relative">
                    <Upload className="w-6 h-6 text-gray-400 mb-1" />
                    <span className="text-[11px] text-gray-600 font-bold block">Drag & Drop or click to add files</span>
                    <span className="text-[9px] text-gray-400 block mt-0.5">PDF, DOCX, TXT, CSV up to 10MB</span>
                    <input
                      type="file"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      value={uploadValue}
                      onChange={handleFileUploadMock}
                    />
                  </div>

                  {/* Attached mock file badges */}
                  {mockFiles.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {mockFiles.map((f, idx) => (
                        <span key={idx} className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-semibold bg-emerald-50 text-emerald-900 border border-emerald-100 rounded-lg">
                          <FileText className="w-3 h-3 text-emerald-700" /> {f}
                          <button type="button" onClick={() => removeMockFile(f)} className="text-emerald-900/60 hover:text-rose-600 font-bold ml-1">×</button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setStep("RoleSelection")}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 inline-flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep("Operations")}
                  className="px-5 py-2.5 rounded-lg text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 inline-flex items-center gap-1 cursor-pointer"
                >
                  Configure Core Practices <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: OPERATIONAL SUSTAINABILITY PRACTICES */}
          {step === "Operations" && (() => {
            const FIELD_TIPS: Record<string, { title: string; text: string; standard: string }> = {
              energy: {
                title: "Clean Energy & Grid Resource Decarbonization",
                text: "Gather direct grid invoices. Specifying partial solar integrations, LED retrofits, or green power agreements improves Environmental scores under GRI 302.",
                standard: "GRI 302 Standard Energy Guidelines"
              },
              waste: {
                title: "Circularity & Landfill Abatement Strategies",
                text: "List electronic equipment policies, general cardboard composting, or hazardous waste scrap partners. High-quality descriptions prevent litigation flags.",
                standard: "GRI 306 Circularity Standard"
              },
              carbon: {
                title: "Scope 1 (Direct) & Scope 2 (Indirect) Baselines",
                text: "Identify direct diesel vehicle fuel or grid electricity consumption logs. Entering initial numerical Baselines (even as estimates) lifts AI evaluation accuracy.",
                standard: "Greenhouse Gas Protocol (Scope 1/2)"
              },
              employee: {
                title: "Staff Welfare, Fair Wages & Hybrid charters",
                text: "Describe legal worker contracts, annual training hours, and hybrid framework flexibility. Essential for showing employee attraction and social sustainability.",
                standard: "GRI 401 employment baseline"
              },
              diversity: {
                title: "Diversity Metrics & Leadership pay Balance",
                text: "State gender splits in management. Boards or management committees maintaining >30% female delegates receive the highest corporate integrity scores.",
                standard: "GRI 405 Diversity metrics"
              },
              health: {
                title: "Workplace Hygiene & Preventative Incident Tracking",
                text: "Specify lost-time accident trends, psychological health check avenues, and regular fire safety certifications. Essential under GRI 403 standard protocols.",
                standard: "GRI 403: Occupational Health & Safety"
              },
              supplier: {
                title: "Supply Chain Auditing & Vendor ESG Sourcing",
                text: "Outline supplier compliance checks. Large enterprise clients seek suppliers with verified human rights ethics under SA8000 or ISO standards.",
                standard: "GRI 308 Supplier Environmental Assessment"
              },
              corruption: {
                title: "Corporate Ethics Codes & Whistleblower Portals",
                text: "Document published codes of conduct, anti-corruption training rates, and secure channels to report bribery. Critical for financial risk reviews.",
                standard: "GRI 205 Anti-Corruption guidelines"
              },
              board: {
                title: "Governing Council Autonomy & Independence",
                text: "Determine percentage of independent seats on advisor groups. Increasing external oversight past 50% protects from transaction and voting conflicts.",
                standard: "GRI 2: General Governance Autonomy"
              },
              privacy: {
                title: "Cyber Security Policies & Data Privacy Auditing",
                text: "Check compliance with California CCPA, European GDPR, or active ISO 27001 models. Highly material for IT, tech, and retail firms.",
                standard: "SASB Cybersecurity & Data Protection"
              }
            };

            const filledCount = [
              energyUse, wasteManagement, carbonEmissions, employeeWelfare,
              diversityInclusion, healthSafety, supplierManagement, antiCorruption,
              boardGovernance, dataPrivacy
            ].filter(val => val && val.trim().length > 3).length;
            const completenessPercent = filledCount * 10;
            const activeTip = FIELD_TIPS[focusedField] || FIELD_TIPS["energy"];

            return (
              <div className="space-y-6">
                <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                  <Settings className="w-5 h-5 text-emerald-800" />
                  <div>
                    <h3 className="font-bold text-gray-800 text-sm">Core Qualitative Practices Guidance</h3>
                    <span className="text-[10px] text-gray-400 font-semibold block">Describe your sustainability structures, baseline offsets, and social codes</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Form Column */}
                  <div className="lg:col-span-2 space-y-5 text-xs text-slate-700">
                    
                    {/* Environmental */}
                    <div className="p-5 border border-emerald-100 rounded-2xl bg-emerald-50/20 space-y-4">
                      <span className="text-[9px] font-extrabold uppercase text-emerald-800 tracking-wider block bg-emerald-50 px-2.5 py-1 rounded w-fit">
                        Environmental Pillar (E)
                      </span>
                      
                      <div>
                        <label htmlFor="p-energy" className="block font-bold text-gray-700 mb-1">Energy Use & Resources (e.g. usage, renewable rates)</label>
                        <textarea
                          id="p-energy"
                          className="w-full text-xs p-2.5 bg-white border border-gray-250 rounded-xl focus:ring-1 focus:ring-emerald-800 focus:outline-emerald-800"
                          rows={2}
                          placeholder="e.g., We use standard grid electricity (8,500 kWh/yr) and maintain 10% renewable solar certificates."
                          value={energyUse}
                          onChange={(e) => setEnergyUse(e.target.value)}
                          onFocus={() => setFocusedField("energy")}
                        />
                      </div>

                      <div>
                        <label htmlFor="p-waste" className="block font-bold text-gray-700 mb-1">Waste Management & Recycling Protocols</label>
                        <textarea
                          id="p-waste"
                          className="w-full text-xs p-2.5 bg-white border border-gray-250 rounded-xl focus:ring-1 focus:ring-emerald-800 focus:outline-emerald-800"
                          rows={2}
                          placeholder="e.g., We recycle plastic and e-waste, generating around 600 kg of solid waste annually."
                          value={wasteManagement}
                          onChange={(e) => setWasteManagement(e.target.value)}
                          onFocus={() => setFocusedField("waste")}
                        />
                      </div>

                      <div>
                        <label htmlFor="p-carbon" className="block font-bold text-gray-700 mb-1">Carbon Emissions Data (computed metrics or baselines)</label>
                        <textarea
                          id="p-carbon"
                          className="w-full text-xs p-2.5 bg-white border border-gray-250 rounded-xl focus:ring-1 focus:ring-emerald-800 focus:outline-emerald-800"
                          rows={2}
                          placeholder="e.g., Scope 1 is centered on diesel transport. Estimated total carbon baseline is 15.4 tCO2e."
                          value={carbonEmissions}
                          onChange={(e) => setCarbonEmissions(e.target.value)}
                          onFocus={() => setFocusedField("carbon")}
                        />
                      </div>
                    </div>

                    {/* Social */}
                    <div className="p-5 border border-indigo-100 rounded-2xl bg-indigo-50/20 space-y-4">
                      <span className="text-[9px] font-extrabold uppercase text-indigo-800 tracking-wider block bg-indigo-50 px-2.5 py-1 rounded w-fit">
                        Social Pillar (S)
                      </span>

                      <div>
                        <label htmlFor="p-welfare" className="block font-bold text-gray-700 mb-1">Employee Welfare Practices (benefits, hybrid flexible models)</label>
                        <textarea
                          id="p-welfare"
                          className="w-full text-xs p-2.5 bg-white border border-gray-250 rounded-xl focus:ring-1 focus:ring-emerald-800 focus:outline-emerald-800"
                          rows={2}
                          placeholder="e.g., We maintain comprehensive mental wellness support, whistleblower protections, and hybrid working protocols."
                          value={employeeWelfare}
                          onChange={(e) => setEmployeeWelfare(e.target.value)}
                          onFocus={() => setFocusedField("employee")}
                        />
                      </div>

                      <div>
                        <label htmlFor="p-diversity" className="block font-bold text-gray-700 mb-1">Diversity & Inclusion Practices (gender splits, audits)</label>
                        <textarea
                          id="p-diversity"
                          className="w-full text-xs p-2.5 bg-white border border-gray-250 rounded-xl focus:ring-1 focus:ring-emerald-800 focus:outline-emerald-800"
                          rows={2}
                          placeholder="e.g., Management staff reflects 37% female representation. Adjusted gender pay gap target is below 12%."
                          value={diversityInclusion}
                          onChange={(e) => setDiversityInclusion(e.target.value)}
                          onFocus={() => setFocusedField("diversity")}
                        />
                      </div>

                      <div>
                        <label htmlFor="p-health" className="block font-bold text-gray-700 mb-1">Workplace Health & Safety Standards</label>
                        <textarea
                          id="p-health"
                          className="w-full text-xs p-2.5 bg-white border border-gray-250 rounded-xl focus:ring-1 focus:ring-emerald-800 focus:outline-emerald-800"
                          rows={2}
                          placeholder="e.g., Certified reviews are audited twice a year. Annual accident days restricted below 2 days."
                          value={healthSafety}
                          onChange={(e) => setHealthSafety(e.target.value)}
                          onFocus={() => setFocusedField("health")}
                        />
                      </div>
                    </div>

                    {/* Governance */}
                    <div className="p-5 border border-amber-100 rounded-2xl bg-amber-50/20 space-y-4">
                      <span className="text-[9px] font-extrabold uppercase text-amber-850 tracking-wider block bg-amber-50 px-2.5 py-1 rounded w-fit">
                        Governance & Supply (G)
                      </span>

                      <div>
                        <label htmlFor="p-supplier" className="block font-bold text-gray-700 mb-1">Supplier Sourcing Standards (SA8000 screening, ethics codes)</label>
                        <textarea
                          id="p-supplier"
                          className="w-full text-xs p-2.5 bg-white border border-gray-250 rounded-xl focus:ring-1 focus:ring-emerald-800 focus:outline-emerald-800"
                          rows={2}
                          placeholder="e.g., Active Screening checks require major logistics and hardware suppliers to sign human-rights ethics pacts."
                          value={supplierManagement}
                          onChange={(e) => setSupplierManagement(e.target.value)}
                          onFocus={() => setFocusedField("supplier")}
                        />
                      </div>

                      <div>
                        <label htmlFor="p-corruption" className="block font-bold text-gray-700 mb-1">Anti-Corruption Rules & Whistleblower hotlines</label>
                        <textarea
                          id="p-corruption"
                          className="w-full text-xs p-2.5 bg-white border border-gray-250 rounded-xl focus:ring-1 focus:ring-emerald-800 focus:outline-emerald-800"
                          rows={2}
                          placeholder="e.g., Our strict Code of Conduct incorporates mandatory anti-bribery training with anonymous channels."
                          value={antiCorruption}
                          onChange={(e) => setAntiCorruption(e.target.value)}
                          onFocus={() => setFocusedField("corruption")}
                        />
                      </div>

                      <div>
                        <label htmlFor="p-board" className="block font-bold text-gray-700 mb-1">Board Composition & Independence ratio</label>
                        <textarea
                          id="p-board"
                          className="w-full text-xs p-2.5 bg-white border border-gray-250 rounded-xl focus:ring-1 focus:ring-emerald-800 focus:outline-emerald-800"
                          rows={2}
                          placeholder="e.g., Board consists of 5 members with 2 certified independent advisors (40% autonomy)."
                          value={boardGovernance}
                          onChange={(e) => setBoardGovernance(e.target.value)}
                          onFocus={() => setFocusedField("board")}
                        />
                      </div>

                      <div>
                        <label htmlFor="p-privacy" className="block font-bold text-gray-700 mb-1">Data Privacy & Cyber Compliance (GDPR, CCPA, ISO27001)</label>
                        <textarea
                          id="p-privacy"
                          className="w-full text-xs p-2.5 bg-white border border-gray-250 rounded-xl focus:ring-1 focus:ring-emerald-800 focus:outline-emerald-800"
                          rows={2}
                          placeholder="e.g., Full GDPR compliance standards followed. Cyber logs are secured with periodic standard pen-tests."
                          value={dataPrivacy}
                          onChange={(e) => setDataPrivacy(e.target.value)}
                          onFocus={() => setFocusedField("privacy")}
                        />
                      </div>
                    </div>

                  </div>

                  {/* Right Sticky Column Pane: Indicators + Tips */}
                  <div className="lg:col-span-1 space-y-6">
                    <div className="sticky top-6 space-y-5">
                      
                      {/* Completeness Gauge */}
                      <div className="bg-white border border-gray-150 p-5 rounded-2xl shadow-xs space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-extrabold text-xs text-gray-800 uppercase tracking-widest">Data Completeness</h4>
                          <span className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-100 font-bold px-2 py-0.5 rounded-md">
                            {completenessPercent}%
                          </span>
                        </div>

                        {/* Real-time Indicator Gauge */}
                        <div className="space-y-1.5">
                          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                            <div 
                              className="bg-emerald-800 h-full transition-all duration-500 rounded-full" 
                              style={{ width: `${completenessPercent}%` }} 
                            />
                          </div>
                          <div className="flex justify-between text-[10px] text-gray-400 font-bold">
                            <span>{filledCount} of 10 fields Filled</span>
                            <span>{10 - filledCount} remaining</span>
                          </div>
                        </div>

                        <div className="p-3 bg-emerald-50/40 rounded-xl border border-emerald-100/50 text-[10px] text-emerald-900 leading-normal font-medium">
                          {completenessPercent === 100 ? (
                            <p className="font-bold">✓ Complete ESG coverage mapped! Recommended diagnostics will be highly customized and compliant.</p>
                          ) : completenessPercent >= 65 ? (
                            <p className="font-bold">⚡ Good coverage. Filling out more fields minimizes generic default predictions.</p>
                          ) : (
                            <p className="text-gray-500">Provide statements for at least 4-5 items to establish baseline accuracy in scores and compliance gap checks.</p>
                          )}
                        </div>
                      </div>

                      {/* Sticky AI Expert Tips Panel */}
                      <div className="bg-emerald-950 border border-emerald-900 text-white p-5 rounded-2xl shadow-xs space-y-3 relative overflow-hidden">
                        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-800/10 rounded-full blur-2xl pointer-events-none" />
                        <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                          <Sparkles className="w-4 h-4 text-emerald-400 font-bold" />
                          <h4 className="font-bold text-xs">AI ESG Sourcing Consultant Advice</h4>
                        </div>
                        
                        <div className="space-y-2">
                          <span className="text-[9px] uppercase tracking-wider block bg-emerald-900/85 px-2 py-0.5 rounded border border-emerald-800 w-fit text-emerald-350 font-bold max-w-full truncate">
                            {activeTip.standard}
                          </span>
                          <h5 className="text-[11px] font-extrabold text-emerald-250 leading-tight">{activeTip.title}</h5>
                          <p className="text-[10px] text-emerald-100/80 leading-normal">{activeTip.text}</p>
                        </div>

                        <div className="pt-1.5 border-t border-white/5 flex items-center gap-1 text-[9px] text-emerald-300/80 font-bold">
                          <Info className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Tip is automatically synchronized to active field</span>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

                {/* Transitions Panel */}
                <div className="flex justify-between pt-5 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setStep("Profile")}
                    className="px-4 py-2 rounded-lg text-xs font-semibold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 inline-flex items-center gap-1 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep("Questionnaire")}
                    className="px-5 py-2.5 rounded-lg text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 inline-flex items-center gap-1 cursor-pointer"
                  >
                    Verify Pillar Answers <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })()}

          {/* STEP 3: INTERACTIVE CHECKLIST QUESTIONS */}
          {step === "Questionnaire" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-800" />
                  <div>
                    <h3 className="font-bold text-gray-800 text-sm">Target validation checklist</h3>
                    <span className="text-[10px] text-gray-400 font-semibold block">Interact with individual parameters to gauge scores</span>
                  </div>
                </div>

                <span className="text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-100 px-2.5 py-1 rounded">
                  9 REQUIRED PILAR CRITERIA
                </span>
              </div>

              <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2 leading-relaxed">
                {DEFAULT_QUESTIONS.map((q) => (
                  <div key={q.id} className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-gray-50/80 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="space-y-1">
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md border ${
                          q.category === 'E' ? 'bg-emerald-50 text-emerald-800 border-emerald-100' :
                          q.category === 'S' ? 'bg-indigo-50 text-indigo-800 border-indigo-100' : 'bg-amber-50 text-amber-850 border-amber-100'
                        }`}>
                          {q.label}
                        </span>
                        <h4 className="text-xs md:text-sm font-semibold text-gray-800 pt-1 leading-normal">{q.text}</h4>
                      </div>

                      <div className="flex gap-1.5 shrink-0">
                        {q.options.map((opt) => {
                          const isSelected = answers[q.id] === opt;
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => handleOptionSelect(q.id, opt)}
                              className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold border transition-all ${
                                isSelected
                                  ? "bg-emerald-800 text-white border-emerald-950 shadow-xs"
                                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Optional details placeholder */}
                    <div className="mt-3">
                      <input
                        type="text"
                        className="w-full text-[10px] px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-gray-700 placeholder-gray-450 focus:outline-emerald-800"
                        placeholder="Attach specific comment or audit notes (e.g. CSRD cert link, energy audit provider)"
                        value={comments[q.id] || ""}
                        onChange={(e) => handleCommentChange(q.id, e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between pt-5 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setStep("Operations")}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 inline-flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep("Submit")}
                  className="px-5 py-2.5 rounded-lg text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 inline-flex items-center gap-1"
                >
                  Continue to Launchpad <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: SUBMIT & LAUNCHPAD ADVISORY NOTES */}
          {step === "Submit" && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                <Sparkles className="w-5 h-5 text-emerald-800" />
                <div>
                  <h3 className="font-bold text-gray-800 text-sm">Strategic Audit Launchpad</h3>
                  <span className="text-[10px] text-gray-400 font-semibold block">Add custom directives and send parameters to the ESG diagnostic model</span>
                </div>
              </div>

              <div className="p-5 rounded-xl border border-emerald-100 bg-emerald-50/20">
                <h3 className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-700" /> Explicit Directives for the AI Auditor
                </h3>
                <p className="text-[10px] text-gray-500 mt-1">
                  Instruct the AI ESG Agent to prioritize specific goals (e.g. 'We need to report Scope 3 to Walmart by July', 'Summarize anti-corruption gaps first').
                </p>

                <textarea
                  className="w-full min-h-[100px] text-xs p-3 border border-gray-200 rounded-xl mt-3 bg-white text-gray-800 placeholder-gray-400 focus:outline-emerald-800 leading-relaxed"
                  placeholder="e.g., We are focused on regulatory compliance for regional banks. Include anti-corruption checks and detail our carbon maturity stage exactly."
                  value={customContext}
                  onChange={(e) => setCustomContext(e.target.value)}
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-2 text-xs leading-relaxed text-gray-500">
                <span className="font-bold text-gray-700 block">The Strategic Scoring Engine will compute:</span>
                <p>✓ <strong>Overall ESG Readiness Ratio</strong> (including specific E/S/G sub-index marks).</p>
                <p>✓ <strong>Qualitative Carbon Maturity Level</strong> (Beginner, Intermediate, Advanced, Optimized).</p>
                <p>✓ <strong>Data Completeness Percentage</strong> based on how heavily your operational grids were filled.</p>
                <p>✓ <strong>90-Day Priority Action Checklist</strong> loaded into your active Roadmap SMS controller.</p>
              </div>

              <div className="flex justify-between pt-5 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setStep("Questionnaire")}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 inline-flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
                <button
                  type="button"
                  onClick={startAnalysis}
                  className="px-6 py-3 rounded-lg text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 shadow-md inline-flex items-center gap-2 transform transition-transform duration-150 hover:scale-[1.01]"
                >
                  <Cpu className="w-4 h-4 animate-pulse" /> Finalize Audit & Generate Assessment
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
