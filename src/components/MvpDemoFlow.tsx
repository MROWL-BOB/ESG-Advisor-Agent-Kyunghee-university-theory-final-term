import React, { useState } from "react";
import { 
  ArrowRight, 
  ArrowLeft, 
  Upload, 
  RefreshCw, 
  CheckCircle, 
  ShieldAlert, 
  FileText, 
  TrendingUp, 
  Sparkles, 
  FileCheck2, 
  Settings, 
  ClipboardCheck,
  AlertTriangle
} from "lucide-react";

interface MvpDemoFlowProps {
  organizationName: string;
  industrySector: string;
  onAuditFinished: () => void;
}

export default function MvpDemoFlow({
  organizationName,
  industrySector,
  onAuditFinished
}: MvpDemoFlowProps) {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [inputText, setInputText] = useState(
    `Our factory consumes about 5,000 kWh of electricity per month and produces 2.5 tons of packaging waste. Receipts are scattered across email threads. For our staff, we provide general health checkups but do not have a formal workplace safety log. There are no independent seats on our board, and we don't have a formal supplier ethics code signed by our vendors.`
  );
  
  // Custom uploaded file simulated structure
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [auditResult, setAuditResult] = useState<any>(null);

  const sampleInputs = [
    {
      label: "Energy & Staff (E & S Focus)",
      text: "We record raw utilities bills in offline sheets. No scope emissions have been calculated yet. Employees undergo basic training, but we do not track systematic overtime violation flags. We have 45 active supply chain partners who haven't completed any emissions checklist."
    },
    {
      label: "Supplier & Board Integrity (S & G Focus)",
      text: "Our corporate board consists of 3 managers with no independent chairs. Conflict of interest audits are conducted informally. Supplier relations are tracked on trust rather than direct disclosures on carbon efficiency or labor code registries."
    }
  ];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFileName(e.dataTransfer.files[0].name);
      setInputText(`[Parsed File Output: ${e.dataTransfer.files[0].name}] \nWe have extracted raw compliance parameters from this file. It lists 1,440 MW of purchased grid power, a diversity index score of 35%, and zero documented supplier ethics signatures.`);
      setActiveStep(2); // Automatically transition to classification step when uploaded!
    }
  };

  const handleFileUploadClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFileName(e.target.files[0].name);
      setInputText(`[Parsed File Output: ${e.target.files[0].name}] \nWe have extracted raw compliance parameters from this file. It lists 1,440 MW of purchased grid power, a diversity index score of 35%, and zero documented supplier ethics signatures.`);
      setActiveStep(2);
    }
  };

  const handleStartAnalysis = async () => {
    setIsLoading(true);
    setActiveStep(3); // Enter analytical loading state

    try {
      // Direct call to /api/esg/diagnose server-side endpoint with our custom user inputs
      const response = await fetch("/api/esg/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          organizationName: organizationName || "Green Logistics Corp",
          sector: industrySector || "Manufacturing & Logistics",
          customContext: inputText,
          answers: {
            "environmental-data-ready": "no",
            "supplier-codes-active": "no",
            "board-governance-reviewed": "no"
          }
        })
      });

      const result = await response.json();
      setAuditResult(result);
      
      // Delay transition to simulate analytical rigor
      setTimeout(() => {
        setActiveStep(4);
        setIsLoading(false);
      }, 1500);

    } catch (err) {
      console.error("Audit API Dispatch Err:", err);
      setIsLoading(false);
      // Failover fallback (guarantees operation)
      setActiveStep(4);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 space-y-8 shadow-xs" id="mvp-demo-flow">
      {/* Mini Step Progress Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200 pb-5 gap-4">
        <div>
          <h3 className="text-base font-bold text-emerald-950 font-display uppercase tracking-wide">
            ESG AI Advisor MVP Demonstration
          </h3>
          <span className="text-xs text-gray-400">Experience our 5-step cognitive advisory engine in real-time</span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <div key={s} className="flex items-center shrink-0">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${
                activeStep === s 
                  ? "bg-emerald-900 text-white font-extrabold ring-2 ring-emerald-250"
                  : activeStep > s 
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-gray-100 text-gray-400"
              }`}>
                {s}
              </span>
              {s < 5 && <span className={`w-8 h-0.5 ${activeStep > s ? "bg-emerald-200" : "bg-gray-200"}`}></span>}
            </div>
          ))}
        </div>
      </div>

      {/* STEP 1: Enter data or upload */}
      {activeStep === 1 && (
        <div className="space-y-6 animate-scale-in">
          <div className="space-y-1">
            <h4 className="font-bold text-emerald-950 text-sm">Step 1: Input ESG-Related Information or Policy Papers</h4>
            <p className="text-xs text-gray-500">Provide direct operational journals, utility accounts details, or upload raw text files for audit evaluation.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <label className="block text-[10px] font-bold text-gray-500 uppercase">Write Core Concerns or Records</label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={6}
                className="w-full text-xs p-3 bg-gray-50 border border-gray-250 rounded-xl focus:bg-white focus:outline-emerald-800 font-mono text-gray-700 leading-relaxed"
                placeholder="Describe your organization's energy use, labor conditions, current vendor records, or governance policies..."
              />
              
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Templates:</span>
                <div className="flex flex-col gap-2">
                  {sampleInputs.map((sample, sIdx) => (
                    <button
                      key={sIdx}
                      onClick={() => setInputText(sample.text)}
                      className="text-left w-full p-2 bg-emerald-50 text-[10px] font-bold text-emerald-950 border border-emerald-150 rounded-lg hover:bg-emerald-100 transition-colors cursor-pointer"
                    >
                      {sample.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Drag & Drop Area */}
            <div 
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="border-2 border-dashed border-gray-300 rounded-xl bg-gray-50/50 p-6 flex flex-col items-center justify-center text-center space-y-3 hover:border-emerald-700 hover:bg-emerald-50/10 transition-colors"
            >
              <div className="p-3 bg-white rounded-2xl border border-gray-200 shadow-xs">
                <Upload className="w-6 h-6 text-emerald-900" />
              </div>
              <div className="space-y-1">
                <p className="font-extrabold text-xs text-emerald-950 uppercase tracking-tight">Drag and drop files here</p>
                <p className="text-[10px] text-gray-400">PDF, XLS, DOC, or TXT formats supported (Max 10MB)</p>
              </div>
              <div className="relative">
                <input
                  type="file"
                  id="file-upload-input"
                  onChange={handleFileUploadClick}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <button className="px-4 py-2 bg-emerald-900 text-white hover:bg-emerald-950 rounded-lg text-[11px] font-bold transition-all shadow-xs cursor-pointer">
                  Browse Workstation Files
                </button>
              </div>
              {uploadedFileName && (
                <div className="p-2 bg-emerald-50 border border-emerald-200 text-emerald-900 text-[11px] rounded-lg font-bold font-mono">
                  ✓ Active File: {uploadedFileName}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => setActiveStep(2)}
              className="px-6 py-2.5 bg-emerald-900 text-white text-xs font-bold rounded-xl shadow hover:bg-emerald-950 transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              Next: Classify & Parse
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Automatic Classification */}
      {activeStep === 2 && (
        <div className="space-y-6 animate-scale-in">
          <div className="space-y-1">
            <h4 className="font-bold text-emerald-950 text-sm">Step 2: AI Classification & Taxonomy Mapping</h4>
            <p className="text-xs text-gray-500">The ESG AI Advisor automatically categorizes unstructured text inputs and files into proper organizational domains.</p>
          </div>

          <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-4">
            <span className="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider block">Raw Document Fragment</span>
            <div className="p-3 bg-white rounded border border-gray-220 text-[11px] font-mono whitespace-pre-wrap text-gray-600 leading-relaxed max-h-32 overflow-y-auto">
              {inputText}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-xl space-y-1">
              <span className="text-[10px] text-emerald-900 font-bold block">Mapped: ENVIRONMENTAL</span>
              <p className="text-[11px] text-gray-700">Identified electricity metrics (kWh), waste counts (packaging, packaging waste), suggesting multi-format parser tasks.</p>
            </div>
            
            <div className="p-4 bg-blue-50/40 border border-blue-200 rounded-xl space-y-1">
              <span className="text-[10px] text-blue-900 font-bold block">Mapped: SOCIAL</span>
              <p className="text-[11px] text-gray-700">Identified occupational training indexes, highlighting unlogged accident parameters and missing OHS logs.</p>
            </div>

            <div className="p-4 bg-indigo-50/40 border border-indigo-200 rounded-xl space-y-1">
              <span className="text-[10px] text-indigo-900 font-bold block">Mapped: GOVERNANCE</span>
              <p className="text-[11px] text-gray-700">Detected missing independent boards and undocumented supply codes, flagging governance risks immediately.</p>
            </div>
          </div>

          <div className="flex justify-between pt-2">
            <button
              onClick={() => setActiveStep(1)}
              className="px-4 py-2 border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back
            </button>
            <button
              onClick={handleStartAnalysis}
              className="px-6 py-2.5 bg-emerald-900 text-white text-xs font-bold rounded-xl shadow hover:bg-emerald-950 transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              Analyze Gaps & Risks
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Risk Processing (Loading Screen) */}
      {activeStep === 3 && (
        <div className="p-12 text-center space-y-4 animate-pulse">
          <RefreshCw className="w-10 h-10 animate-spin mx-auto text-emerald-900" />
          <div className="space-y-1 max-w-md mx-auto">
            <h4 className="font-bold text-sm text-emerald-950 uppercase tracking-wider font-mono">Step 3: Compiling ESG Intelligence Modules</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Evaluating organizational metrics, cross-referencing GRI/SASB standards lists, detecting reputational vulnerabilities, and preparing your audit dashboard.
            </p>
          </div>
        </div>
      )}

      {/* STEP 4: Generated Outputs Viewer */}
      {activeStep === 4 && (
        <div className="space-y-6 animate-scale-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-3 border-gray-150 gap-4">
            <div className="space-y-1">
              <h4 className="font-bold text-emerald-950 text-sm">Step 4: AI Advisor Compliance Output Compiled</h4>
              <p className="text-xs text-gray-500">Professional, actionable outputs generated from your customized inputs.</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <span className="px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold rounded text-[10px] font-mono">
                Overall Health Rank: {auditResult?.scores?.overall || "61"}%
              </span>
              <span className="px-2.5 py-1 bg-amber-50 border border-amber-200 text-amber-900 font-bold rounded text-[10px] font-mono">
                Completeness: {auditResult?.dataCompletenessLevel || "65"}%
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Pillars Overview / Summary */}
            <div className="md:col-span-4 bg-gray-50 p-5 rounded-xl border border-gray-200 space-y-4">
              <span className="text-[9px] font-bold text-gray-400 font-mono uppercase tracking-wider block">Executive Audit Brief</span>
              <p className="text-xs text-emerald-950 font-bold leading-relaxed">
                {auditResult?.professionalSummary || `The introductory ESG audit indicates that setting direct carbon tracking procedures (Scope 1/2 calculations) and adding independent board advisor slots will generate the highest immediate compliance values.`}
              </p>
              
              <div className="space-y-2 border-t pt-3.5 text-xs">
                <span className="text-[10px] font-bold text-gray-400 uppercase font-mono block">Scored Gaps</span>
                <div className="flex justify-between items-center bg-white p-2 rounded border border-gray-100 font-mono text-[11px]">
                  <span className="text-gray-550 border-r pr-3">Environmental</span>
                  <strong className="text-emerald-800">{auditResult?.scores?.environmental || "55"}/100</strong>
                </div>
                <div className="flex justify-between items-center bg-white p-2 rounded border border-gray-100 font-mono text-[11px]">
                  <span className="text-gray-550 border-r pr-3">Social</span>
                  <strong className="text-blue-800">{auditResult?.scores?.social || "62"}/100</strong>
                </div>
                <div className="flex justify-between items-center bg-white p-2 rounded border border-gray-100 font-mono text-[11px]">
                  <span className="text-gray-550 border-r pr-3">Governance</span>
                  <strong className="text-indigo-800">{auditResult?.scores?.governance || "68"}/100</strong>
                </div>
              </div>
            </div>

            {/* Audit Logs Details */}
            <div className="md:col-span-8 space-y-4">
              {/* Risks & Gaps */}
              <div className="bg-white border rounded-xl p-4.5 space-y-3">
                <div className="inline-flex items-center gap-1.5 text-amber-900 border-b pb-1.5 w-full border-gray-100">
                  <ShieldAlert className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Identified Risk & Missing Evidence Checklist</span>
                </div>
                
                <ul className="space-y-1.5 text-xs text-gray-700 font-sans pl-1.5">
                  {(auditResult?.gaps || [
                    "Lack of verified Scope 1 (Direct fuel) & Scope 2 (Grid electricity) greenhouse gas calculation accounts.",
                    "Missing verified Supplier Ethics Signatures across down-tier partner catalogs.",
                    "Underrepresented internal independent governance chair counts (<50% ratio)."
                  ]).map((gapItem: string, idx: number) => (
                    <li key={idx} className="flex gap-2 items-start">
                      <span className="text-amber-800 font-bold">•</span>
                      <span>{gapItem}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Plan */}
              <div className="bg-white border border-gray-200 rounded-xl p-4.5 space-y-3">
                <div className="inline-flex items-center gap-1.5 text-emerald-950 border-b pb-1.5 w-full border-gray-100 font-display font-medium">
                  <FileText className="w-4 h-4 text-emerald-800" />
                  <span className="text-xs font-bold uppercase tracking-wider">Recommended Action Roadmap (MVP Targets)</span>
                </div>

                <div className="space-y-3">
                  {(auditResult?.recommendations || [
                    {
                      pilar: "E",
                      title: "Track Scope 1 & 2 Emissions",
                      action: "Centralize power and natural gas invoices. Use EPA database equations to extract CO2 equivalents.",
                      priority: "High"
                    },
                    {
                      pilar: "S",
                      title: "Standardize Supplier Ethical Codes",
                      action: "Draft a formal supplier disclosure code and email digital questionnaires.",
                      priority: "High"
                    },
                    {
                      pilar: "G",
                      title: "Formulate Board Independence Reviews",
                      action: "Audit conflict registries and plan independent advisor transitions.",
                      priority: "High"
                    }
                  ]).map((rec: any, idx: number) => (
                    <div key={idx} className="bg-gray-50/50 p-3 rounded border border-gray-150 flex items-start gap-3 text-xs justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-950 font-bold text-[9px] rounded font-mono uppercase">{rec.pilar}</span>
                          <strong className="text-gray-900 text-xs font-semibold">{rec.title}</strong>
                        </div>
                        <p className="text-gray-650 text-[11px] font-sans leading-relaxed">{rec.action}</p>
                      </div>
                      <span className="text-[10px] uppercase font-bold text-emerald-800 font-mono shrink-0">{rec.priority}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-2">
            <button
              onClick={() => setActiveStep(2)}
              className="px-4 py-2 border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back
            </button>
            <button
              onClick={() => setActiveStep(5)}
              className="px-6 py-2.5 bg-emerald-900 text-white text-xs font-bold rounded-xl shadow hover:bg-emerald-950 transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              Review Complete Dashboard
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: Final Review Summary */}
      {activeStep === 5 && (
        <div className="space-y-6 text-center max-w-2xl mx-auto py-8 animate-scale-in">
          <div className="inline-flex items-center justify-center p-3.5 bg-emerald-50 rounded-full border border-emerald-250 text-emerald-900">
            <FileCheck2 className="w-10 h-10 animate-bounce" />
          </div>
          
          <div className="space-y-2">
            <h4 className="text-xl font-bold text-emerald-950 font-display">Step 5: Review & Support Active Sustainability Actions</h4>
            <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
              Your ESG portfolio is compiled! Critical carbon targets and missing evidence registries are loaded into the interactive manager dashboard. 
            </p>
          </div>

          <div className="p-4.5 bg-emerald-50/50 border border-emerald-150 rounded-2xl max-w-md mx-auto text-xs text-emerald-950 text-left space-y-2">
            <p className="font-bold">✓ Continuous Action Items Activated:</p>
            <ul className="space-y-1 pl-1.5 font-sans">
              <li className="flex gap-2"><span>-</span> <span>Direct invoice parser is active to compile Scope 1/2 electricity volumes.</span></li>
              <li className="flex gap-2"><span>-</span> <span>Gap-check notifications ready for corporate audit validation.</span></li>
              <li className="flex gap-2"><span>-</span> <span>Vendor screening questionnaires loaded in procurement files.</span></li>
            </ul>
          </div>

          <div className="pt-4 flex justify-center gap-3">
            <button
              onClick={() => {
                setActiveStep(1);
                setAuditResult(null);
              }}
              className="px-4 py-2 border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-semibold rounded-xl cursor-pointer"
            >
              Run New Audit
            </button>
            <button
              onClick={onAuditFinished}
              className="px-6 py-2 bg-emerald-900 text-white hover:bg-emerald-950 text-xs font-bold rounded-xl shadow cursor-pointer transition-all"
            >
              Go to SaaS Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
