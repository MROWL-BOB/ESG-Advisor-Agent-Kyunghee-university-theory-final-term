import React, { useState } from "react";
import { 
  Building, 
  Leaf, 
  Users, 
  ShieldCheck, 
  Truck, 
  FileText, 
  TrendingUp, 
  ArrowRight, 
  Cpu, 
  ClipboardCheck 
} from "lucide-react";

interface DomainNode {
  id: string;
  name: string;
  icon: any;
  color: string;
  bgLight: string;
  borderClass: string;
  tasks: string[];
  aiCapabilities: string[];
  outputs: string[];
}

export default function EsgDomainMap() {
  const [activeNode, setActiveNode] = useState<string>("environmental");

  const nodes: DomainNode[] = [
    {
      id: "environmental",
      name: "Environmental Management",
      icon: Leaf,
      color: "text-emerald-800",
      bgLight: "bg-emerald-50/60",
      borderClass: "border-emerald-250",
      tasks: [
        "Collect energy data",
        "Track carbon emissions",
        "Monitor waste and resource use"
      ],
      aiCapabilities: [
        "Data extraction",
        "Trend analysis",
        "Risk detection"
      ],
      outputs: [
        "Environmental insight summary",
        "Carbon tracking notes",
        "Resource efficiency recommendations"
      ]
    },
    {
      id: "social",
      name: "Social Responsibility Management",
      icon: Users,
      color: "text-blue-800",
      bgLight: "bg-blue-50/60",
      borderClass: "border-blue-200",
      tasks: [
        "Review employee welfare",
        "Track safety records",
        "Monitor diversity and inclusion indicators"
      ],
      aiCapabilities: [
        "Document summarization",
        "Data classification",
        "Risk detection"
      ],
      outputs: [
        "Social responsibility insight",
        "Safety issue summary",
        "Workforce responsibility recommendations"
      ]
    },
    {
      id: "governance",
      name: "Governance and Compliance Management",
      icon: ShieldCheck,
      color: "text-indigo-800",
      bgLight: "bg-indigo-50/60",
      borderClass: "border-indigo-200",
      tasks: [
        "Review governance policies",
        "Check anti-corruption documents",
        "Identify missing compliance evidence"
      ],
      aiCapabilities: [
        "Policy summarization",
        "Evidence gap identification",
        "Governance risk analysis"
      ],
      outputs: [
        "Governance insight summary",
        "Missing evidence checklist",
        "Compliance improvement suggestions"
      ]
    },
    {
      id: "supplier",
      name: "Supplier ESG Management",
      icon: Truck,
      color: "text-amber-805",
      bgLight: "bg-amber-50/60",
      borderClass: "border-amber-205",
      tasks: [
        "Review supplier questionnaires",
        "Compare supplier ESG performance",
        "Identify high-risk suppliers"
      ],
      aiCapabilities: [
        "Supplier screening",
        "Risk classification",
        "Comparative analysis"
      ],
      outputs: [
        "Supplier ESG risk table",
        "Supplier comparison summary",
        "Supplier improvement recommendations"
      ]
    },
    {
      id: "reporting",
      name: "ESG Reporting and Communication",
      icon: FileText,
      color: "text-violet-800",
      bgLight: "bg-violet-50/60",
      borderClass: "border-violet-200",
      tasks: [
        "Organize ESG information",
        "Draft ESG summaries",
        "Prepare stakeholder communication"
      ],
      aiCapabilities: [
        "Report generation",
        "Natural language summarization",
        "Presentation summary generation"
      ],
      outputs: [
        "ESG report draft",
        "Executive summary",
        "Stakeholder communication material"
      ]
    },
    {
      id: "sustainability",
      name: "Sustainability Action Management",
      icon: TrendingUp,
      color: "text-teal-800",
      bgLight: "bg-teal-50/60",
      borderClass: "border-teal-200",
      tasks: [
        "Set ESG goals",
        "Assign ESG tasks",
        "Track improvement progress",
        "Update action plans"
      ],
      aiCapabilities: [
        "Task recommendation",
        "Progress monitoring",
        "Priority ranking"
      ],
      outputs: [
        "30/60/90-day action plan",
        "Sustainability progress dashboard",
        "Monthly review summary"
      ]
    }
  ];

  const currentActiveNode = nodes.find(n => n.id === activeNode) || nodes[0];

  return (
    <div className="space-y-8 bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-xs" id="domain-map-section">
      <div className="border-b border-gray-200 pb-4">
        <h3 className="text-lg font-bold text-emerald-950 font-display uppercase tracking-wide">
          ESG Organization Domain Map
        </h3>
        <p className="text-xs text-gray-500">
          Visual mapping matching enterprise work centers with modern LLM capabilities. Select a node to audit repeating workflows.
        </p>
      </div>

      {/* Visual Abstract Map Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center" id="node-diagram-container">
        {/* Dynamic Nodes Node Graph Diagram (lg:col-span-7) */}
        <div className="lg:col-span-7 bg-gray-50 p-6 rounded-2xl border border-gray-200 relative min-h-[380px] flex items-center justify-center">
          {/* Central Core */}
          <div className="absolute z-10 p-5 bg-emerald-950 text-white rounded-2xl border-2 border-emerald-900 shadow-md text-center max-w-[170px]">
            <Cpu className="w-5 h-5 mx-auto text-emerald-400 mb-1.5 animate-spin" />
            <h5 className="font-extrabold text-xs tracking-tight uppercase leading-none font-display">ESG AI ADVISOR</h5>
            <span className="text-[9px] font-mono opacity-80 mt-1 block">Central Hub Node</span>
          </div>

          {/* SVG Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block" style={{ zIndex: 1 }}>
            <line x1="20%" y1="20%" x2="50%" y2="50%" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" className="animate-pulse" />
            <line x1="80%" y1="20%" x2="50%" y2="50%" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
            <line x1="12%" y1="50%" x2="50%" y2="50%" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
            <line x1="88%" y1="50%" x2="50%" y2="50%" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
            <line x1="20%" y1="80%" x2="50%" y2="50%" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
            <line x1="80%" y1="80%" x2="50%" y2="50%" stroke="#14b8a6" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
          </svg>

          {/* Satellite Buttons Absolute grid positioning */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-24 gap-x-12 w-full max-w-lg z-10">
            {nodes.slice(0, 3).map((node) => {
              const NodeIcon = node.icon;
              const isActive = activeNode === node.id;
              return (
                <button
                  key={node.id}
                  id={`node-${node.id}`}
                  onClick={() => setActiveNode(node.id)}
                  className={`p-3.5 rounded-xl border flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:scale-105 ${
                    isActive 
                      ? `${node.bgLight} ${node.borderClass} ${node.color} ring-2 ring-emerald-900 shadow-md` 
                      : "bg-white border-gray-202 text-gray-500 shadow-xs"
                  }`}
                >
                  <NodeIcon className="w-5 h-5 mb-1.5" />
                  <span className="text-[10px] font-extrabold uppercase tracking-tight leading-tight max-w-[120px]">{node.name.replace(" Management", "").replace(" Responsibility", "")}</span>
                </button>
              );
            })}

            {/* Placeholder spacer in core when in md views (center cell skipped) */}
            <div className="hidden md:block"></div>

            {nodes.slice(3).map((node) => {
              const NodeIcon = node.icon;
              const isActive = activeNode === node.id;
              return (
                <button
                  key={node.id}
                  id={`node-${node.id}`}
                  onClick={() => setActiveNode(node.id)}
                  className={`p-3.5 rounded-xl border flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:scale-105 ${
                    isActive 
                      ? `${node.bgLight} ${node.borderClass} ${node.color} ring-2 ring-emerald-900 shadow-md` 
                      : "bg-white border-gray-202 text-gray-500 shadow-xs"
                  }`}
                >
                  <NodeIcon className="w-5 h-5 mb-1.5" />
                  <span className="text-[10px] font-extrabold uppercase tracking-tight leading-tight max-w-[120px]">{node.name.replace(" Management", "").replace(" and Compliance", "").replace(" and Communication", "")}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Node details display block (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-5">
          <div className={`p-6 border rounded-2xl ${currentActiveNode.bgLight} ${currentActiveNode.borderClass} space-y-4`}>
            <div className="flex items-center gap-3 border-b pb-3 border-gray-200">
              <div className="p-2 bg-white rounded-xl shadow-xs text-emerald-900">
                {React.createElement(currentActiveNode.icon, { className: "w-5 h-5" })}
              </div>
              <div>
                <h4 className="font-bold text-sm text-emerald-950 uppercase tracking-wide leading-tight">{currentActiveNode.name}</h4>
                <span className="text-[10px] text-gray-500">Connected Analytical Node</span>
              </div>
            </div>

            {/* Node Lists */}
            <div className="space-y-4 text-xs">
              <div>
                <span className="text-[9px] font-bold text-emerald-900 uppercase tracking-widest font-mono block mb-1.5">REPEATING TASKS</span>
                <ul className="space-y-1.5 pl-1.5">
                  {currentActiveNode.tasks.map((task, k) => (
                    <li key={k} className="flex gap-2 items-start text-gray-750 font-medium">
                      <span className="text-emerald-700 font-bold mt-0.5">•</span>
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="text-[9px] font-bold text-emerald-905 uppercase tracking-widest font-mono block mb-1.5">MATCHED AI CAPABILITIES</span>
                <div className="flex flex-wrap gap-1.5">
                  {currentActiveNode.aiCapabilities.map((cap, k) => (
                    <span key={k} className="px-2 py-0.5 bg-white border border-gray-200 rounded text-[10px] font-mono font-bold text-gray-700">
                      {cap}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-gray-200">
                <span className="text-[9px] font-bold text-teal-800 uppercase tracking-widest font-mono block mb-1.5">EXPECTED ADVISORY OUTPUTS</span>
                <ul className="space-y-1.5 pl-1.5">
                  {currentActiveNode.outputs.map((out, k) => (
                    <li key={k} className="flex gap-2 items-start text-emerald-950 font-bold">
                      <span className="text-emerald-700 font-bold mt-0.5">✓</span>
                      <span>{out}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
