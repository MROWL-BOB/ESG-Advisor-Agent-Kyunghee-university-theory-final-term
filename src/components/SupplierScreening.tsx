import React, { useState } from "react";
import { SupplierItem, SupplierScreeningReport } from "../types";
import { Truck, Copy, Check, FileText, Cpu, Plus, Trash2, Loader2, Sparkles, AlertCircle } from "lucide-react";

const INITIAL_SUPPLIERS: SupplierItem[] = [
  {
    id: "sup-1",
    name: "Apex Logistics Ltd",
    country: "Germany",
    sector: "Logistics",
    carbonIntensity: "High",
    laborStandardCertified: true,
    corporateEthicsCode: true,
    notes: "High diesel consumption but has electric delivery cargo plans."
  },
  {
    id: "sup-2",
    name: "Pacific Tech Hardware",
    country: "Taiwan",
    sector: "Semiconductor Assembly",
    carbonIntensity: "Medium",
    laborStandardCertified: false,
    corporateEthicsCode: true,
    notes: "Good corporate transparency but lacks formal fair-labor certification."
  }
];

export default function SupplierScreening() {
  const [suppliers, setSuppliers] = useState<SupplierItem[]>(INITIAL_SUPPLIERS);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [report, setReport] = useState<SupplierScreeningReport | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  // Form states for adding new supplier
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [sector, setSector] = useState("Logistics");
  const [carbonIntensity, setCarbonIntensity] = useState("Medium");
  const [laborCertified, setLaborCertified] = useState(false);
  const [ethicsCode, setEthicsCode] = useState(false);
  const [notes, setNotes] = useState("");

  const addSupplier = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newItem: SupplierItem = {
      id: `sup-${Date.now()}`,
      name,
      country,
      sector,
      carbonIntensity,
      laborStandardCertified: laborCertified,
      corporateEthicsCode: ethicsCode,
      notes
    };

    setSuppliers((prev) => [...prev, newItem]);
    setName("");
    setCountry("");
    setNotes("");
    setLaborCertified(false);
    setEthicsCode(false);
  };

  const removeSupplier = (id: string) => {
    setSuppliers((prev) => prev.filter((s) => s.id !== id));
  };

  const runScreening = async () => {
    if (suppliers.length === 0) {
      setErrorMsg("Please add at least one supplier to perform a screening evaluation.");
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    setReport(null);

    try {
      const res = await fetch("/api/esg/supplier-screen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ suppliers })
      });

      if (!res.ok) {
        throw new Error("Failed to evaluate suppliers dynamically. Please review connection.");
      }

      const data: SupplierScreeningReport = await res.json();
      setReport(data);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Supplier screening calculation error.");
    } finally {
      setLoading(false);
    }
  };

  const copyLetter = () => {
    if (!report?.draftRequestLetter) return;
    navigator.clipboard.writeText(report.draftRequestLetter);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="space-y-6" id="esg-supplier-screening">
      
      {/* Overview Intro */}
      <div className="bg-gradient-to-r from-emerald-950 to-slate-900 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden border border-emerald-900">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-800/60 text-emerald-200 border border-emerald-700/50">
            <Truck className="w-3.5 h-3.5 text-emerald-400" /> Procurement Integration
          </span>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight">Scope 3 Supplier Screening</h2>
          <p className="text-emerald-100/80 text-sm">
            Continuous supplier ESG audits are paramount to tracking Scope 3 carbon emission dependencies and safeguarding global labor practices. Add contractors, evaluate risk metrics, and generate instant correspondence requesting standard compliance disclosure.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Input Form Panel */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs space-y-6 lg:col-span-1 h-fit">
          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide flex items-center gap-2">
            <Plus className="w-4 h-4 text-emerald-700" /> New Supplier Metrics
          </h3>

          <form onSubmit={addSupplier} className="space-y-4">
            <div>
              <label htmlFor="sup-name" className="block text-xs font-medium text-gray-400 mb-1">Supplier Company Name *</label>
              <input
                id="sup-name"
                type="text"
                required
                className="w-full text-xs px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-emerald-800"
                placeholder="e.g., Shanghai Sourcing Corp"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="sup-country" className="block text-xs font-medium text-gray-400 mb-1">Country</label>
                <input
                  id="sup-country"
                  type="text"
                  className="w-full text-xs px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:outline-emerald-800"
                  placeholder="e.g., China"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="sup-sector" className="block text-xs font-medium text-gray-400 mb-1">Sector</label>
                <select
                  id="sup-sector"
                  className="w-full text-xs px-2.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:outline-emerald-800"
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                >
                  <option value="Electronics Assembly">Electronics Assembly</option>
                  <option value="Logistics & Transport">Logistics & Transport</option>
                  <option value="Packaging & Materials">Packaging & Materials</option>
                  <option value="Agricultural Raw Materials">Agricultural Raw Materials</option>
                  <option value="Consulting & Tech Sourcing">Consulting & Tech Sourcing</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="sup-carbon" className="block text-xs font-medium text-gray-400 mb-1">Carbon Intensity Level</label>
              <div className="grid grid-cols-3 gap-2">
                {["Low", "Medium", "High"].map((intensity) => (
                  <button
                    key={intensity}
                    type="button"
                    onClick={() => setCarbonIntensity(intensity)}
                    className={`py-2 text-xs font-medium rounded-lg border transition-all ${
                      carbonIntensity === intensity
                        ? "bg-emerald-800 text-white border-emerald-950"
                        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {intensity}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-emerald-800 rounded border-gray-300 focus:ring-emerald-800"
                  checked={laborCertified}
                  onChange={(e) => setLaborCertified(e.target.checked)}
                />
                <span className="text-xs font-medium text-gray-700">Certified Labor Standards (e.g. SA8000)</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-emerald-800 rounded border-gray-300 focus:ring-emerald-800"
                  checked={ethicsCode}
                  onChange={(e) => setEthicsCode(e.target.checked)}
                />
                <span className="text-xs font-medium text-gray-700">Code of Ethics & Anti-Bribery safeguards</span>
              </label>
            </div>

            <div>
              <label htmlFor="sup-notes" className="block text-xs font-medium text-gray-400 mb-1">Notes / Discovered details</label>
              <textarea
                id="sup-notes"
                className="w-full min-h-[70px] text-xs p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-emerald-800"
                placeholder="Discovered waste leaks or positive ISO 14001 status..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 shadow-sm"
            >
              Add to Active Screening Checklist
            </button>
          </form>
        </div>

        {/* Suppliers Checklist Section */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs lg:col-span-2 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Current screening list</h3>
              <p className="text-xs text-gray-400">Review suppliers, add multiple metrics, then deploy AI analysis to screen threats.</p>
            </div>

            <button
              onClick={runScreening}
              disabled={suppliers.length === 0 || loading}
              className="px-5 py-2.5 shrink-0 rounded-lg text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-md inline-flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Analyzing Sourcing Risk...
                </>
              ) : (
                <>
                  <Cpu className="w-3.5 h-3.5 border-emerald-400" /> Screen & Core Report with AI
                </>
              )}
            </button>
          </div>

          {errorMsg && (
            <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex gap-2 items-center">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {suppliers.length === 0 ? (
            <div className="border border-dashed border-gray-200 rounded-xl p-8 text-center text-gray-400">
              <Truck className="w-10 h-10 text-gray-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-gray-600">No active suppliers added</p>
              <p className="text-xs text-gray-400 mt-1">Please insert prospect suppliers using the new supplier panel.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {suppliers.map((sup) => (
                <div key={sup.id} className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 flex flex-col md:flex-row justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-800 text-sm">{sup.name}</span>
                      <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200 font-semibold">{sup.sector}</span>
                    </div>
                    <div className="text-xs text-gray-400 space-y-1">
                      <p>Location: <span className="text-gray-700 font-medium">{sup.country || "Not specified"}</span></p>
                      <p>Carbon Intensity: <span className={`font-semibold ${sup.carbonIntensity === 'High' ? 'text-rose-600' : 'text-emerald-700'}`}>{sup.carbonIntensity}</span></p>
                      {sup.notes && <p className="italic text-gray-400 text-[11px]">&ldquo;{sup.notes}&rdquo;</p>}
                    </div>

                    {/* Badge Row */}
                    <div className="flex gap-2 pt-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${
                        sup.laborStandardCertified ? 'bg-emerald-50 text-emerald-800 border-emerald-100' : 'bg-red-50 text-red-800 border-red-100'
                      }`}>
                        SA8000 Labor Check: {sup.laborStandardCertified ? 'Certififed' : 'Missing'}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${
                        sup.corporateEthicsCode ? 'bg-emerald-50 text-emerald-800 border-emerald-100' : 'bg-amber-50 text-amber-800 border-amber-100'
                      }`}>
                        Ethics Mandate: {sup.corporateEthicsCode ? 'Signed' : 'Incomplete'}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => removeSupplier(sup.id)}
                    className="p-2 self-start rounded-lg hover:bg-rose-50 text-rose-500 hover:text-rose-600/90 hover:border-rose-200 transition-colors"
                    title="Remove from evaluation list"
                    aria-label={`Remove supplier ${sup.name}`}
                  >
                    <Trash2 className="w-4.5 h-4.5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Screening Report Results */}
          {report && (
            <div className="border-t border-gray-100 pt-6 mt-6 space-y-6">
              <div className="p-4 bg-emerald-50/20 border border-emerald-100 rounded-xl">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest block mb-2">AI Sustainability Screening Comparison</span>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {report.comparisons.map((comp, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-xl border border-gray-100 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-800 text-sm">{comp.name}</span>
                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-md ${
                          comp.riskLevel === 'Low' ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' :
                          comp.riskLevel === 'Medium' ? 'bg-amber-50 text-amber-800 border border-amber-100' : 'bg-rose-50 text-rose-800 border border-rose-100'
                        }`}>
                          Risk: {comp.riskLevel}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 space-y-1">
                        <p>Carbon efficiency emissions: <span className="font-medium text-gray-700">{comp.carbonEfficiency}</span></p>
                        <p>Social standard audit: <span className="font-medium text-gray-700">{comp.socialScore}</span></p>
                        <p>Governance structure: <span className="font-medium text-gray-700">{comp.governanceScore}</span></p>
                        <p className="text-gray-400 mt-2 italic text-[11px]">&ldquo;{comp.analysis}&rdquo;</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-4 bg-emerald-900 text-white rounded-xl text-xs">
                  <span className="font-bold text-[10px] uppercase text-emerald-300 block mb-1">Audit Recommendation</span>
                  <p>{report.recommendation}</p>
                </div>
              </div>

              {/* Action Draft Request Letter */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-gray-800 flex items-center gap-1">
                    <FileText className="w-4 h-4 text-emerald-800" /> Draft Disclosure Request Email
                  </h4>

                  <button
                    onClick={copyLetter}
                    className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 inline-flex items-center gap-1.5 font-semibold"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copy Template
                      </>
                    )}
                  </button>
                </div>

                <p className="text-xs text-gray-450">Copy this customized prompt to ask selected suppliers for formal emissions and transparency compliance filings.</p>
                
                <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl font-mono text-xs text-slate-700 whitespace-pre-line max-h-80 overflow-y-auto leading-relaxed">
                  {report.draftRequestLetter}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
