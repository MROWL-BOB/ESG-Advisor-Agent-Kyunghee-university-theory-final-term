import React from "react";
import { Table, CheckCircle2 } from "lucide-react";

interface MatchingRow {
  domain: string;
  task: string;
  painPoint: string;
  aiFunction: string;
  output: string;
}

export default function AiMatchingTable() {
  const rows: MatchingRow[] = [
    {
      domain: "Environmental Management",
      task: "Track carbon emissions",
      painPoint: "Carbon data is fragmented across multiple sites",
      aiFunction: "Trend analysis and dashboard generation",
      output: "Carbon tracking insight notes"
    },
    {
      domain: "Governance and Compliance",
      task: "Identify missing evidence",
      painPoint: "ESG claims may lack verifiable audit proof",
      aiFunction: "Evidence gap identification",
      output: "Missing evidence checklist catalog"
    },
    {
      domain: "Supplier ESG Management",
      task: "Review supplier questionnaires",
      painPoint: "Manual survey scanning is highly time-consuming",
      aiFunction: "Supplier screening and risk classification",
      output: "Supplier ESG risk score summary"
    },
    {
      domain: "ESG Reporting",
      task: "Draft ESG summaries",
      painPoint: "Annual report compliance writing is highly repetitive",
      aiFunction: "Standardized report draft generation",
      output: "ESG executive summary draft"
    },
    {
      domain: "Sustainability Action Management",
      task: "Update action plans",
      painPoint: "ESG improvement goals are difficult to track & execute",
      aiFunction: "Task recommendation and priority ranking",
      output: "30/60/90-day physical action plan"
    }
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-6 shadow-xs" id="ai-matching-table-container">
      <div className="border-b border-gray-150 pb-3">
        <h3 className="text-base font-bold text-emerald-950 font-display uppercase tracking-wide">
          AI Function Matching Table
        </h3>
        <p className="text-xs text-gray-400">
          Direct structural mapping showing how corporate friction points utilize specific language model capabilities to yield verified advisory files.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-gray-500 border-collapse">
          <thead className="bg-emerald-950 text-white font-mono uppercase text-[10px] tracking-wider rounded-t-xl">
            <tr>
              <th className="p-3.5 rounded-l-lg">ESG Domain</th>
              <th className="p-3.5">Repeating Task</th>
              <th className="p-3.5">Organizational Pain Point</th>
              <th className="p-3.5">AI Function</th>
              <th className="p-3.5 rounded-r-lg">Advisor Output</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {rows.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50/75 transition-colors">
                <td className="p-3.5 font-bold text-emerald-900 border-b border-gray-100">{row.domain}</td>
                <td className="p-3.5 font-medium text-gray-900 border-b border-gray-100">{row.task}</td>
                <td className="p-3.5 text-gray-600 italic border-b border-gray-100">{row.painPoint}</td>
                <td className="p-3.5 border-b border-gray-100">
                  <span className="px-2 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded font-bold font-mono text-[10px]">
                    {row.aiFunction}
                  </span>
                </td>
                <td className="p-3.5 font-mono font-bold text-emerald-950 border-b border-gray-100 flex items-center gap-1.5 mt-1.5 sm:mt-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-800" />
                  {row.output}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
