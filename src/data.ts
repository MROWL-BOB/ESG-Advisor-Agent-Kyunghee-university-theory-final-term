import { EsgSubDomain, RepeatingTask, AiFunction } from "./types";

export const SUB_DOMAINS: EsgSubDomain[] = [
  {
    id: "environmental",
    name: "Environmental Management (EMS)",
    explanation: "Tracks greenhouse gas emissions, energy consumption, waste audits, water stewardship, and environmental compliance risks.",
    icon: "Leaf",
    color: "emerald"
  },
  {
    id: "social",
    name: "Social and Stakeholder Responsibility",
    explanation: "Monitors occupational health and safety (OHS), fair labor practices, diversity initiatives, employee retention, and community impact.",
    icon: "Users",
    color: "blue"
  },
  {
    id: "governance",
    name: "Corporate Governance and Integrity",
    explanation: "Oversees business ethics policies, anti-corruption safeguards, data privacy, board composition, and regulatory compliance evidence.",
    icon: "ShieldAlert",
    color: "indigo"
  },
  {
    id: "supplier",
    name: "Supply Chain and Procurement ESG",
    explanation: "Conducts vendor ESG questionnaires, monitors responsible sourcing records, assesses supplier risks, and tracks improvement plans.",
    icon: "Truck",
    color: "amber"
  },
  {
    id: "reporting",
    name: "ESG Disclosures and Communications",
    explanation: "Aggregates multi-department indicators, structures GRI/SASB reports, drafts executive briefs, and coordinates stakeholder audits.",
    icon: "FileText",
    color: "violet"
  },
  {
    id: "sustainability",
    name: "Sustainability Strategic Initiatives",
    explanation: "Formulates decarbonization roadmaps, prioritizes circular economy actions, and audits corrective sustainability measures.",
    icon: "TrendingUp",
    color: "teal"
  }
];

export const AI_FUNCTIONS: AiFunction[] = [
  {
    id: "doc_summary",
    name: "Semantic Document Summarizer",
    description: "Evaluates multi-page ESG policy papers and compliance guidelines to produce high-density, actionable summaries.",
    defaultFeasibility: 9,
    defaultValue: 8
  },
  {
    id: "data_extraction",
    name: "Multi-Format Data Parser",
    description: "Extracts unstructured data from scanned utilities invoices, PDFs, and decentralized Excel files into standard tracking schemas.",
    defaultFeasibility: 9,
    defaultValue: 9
  },
  {
    id: "esg_classification",
    name: "Framework Taxonomy Classifier",
    description: "Automatically maps disparate operational actions and qualitative narratives to global GRI, SASB, or CSRD taxonomy indicators.",
    defaultFeasibility: 8,
    defaultValue: 7
  },
  {
    id: "risk_detection",
    name: "Reputational & Legal Risk Monitor",
    description: "Scans meeting minutes, public listings, and work logs to proactively identify regulatory breaches and external reputational risks.",
    defaultFeasibility: 7,
    defaultValue: 9
  },
  {
    id: "gap_id",
    name: "Evidence Gap Audit Engine",
    description: "Highlights missing quantitative metrics, unverified files, or qualitative narratives required by targeted reporting standards.",
    defaultFeasibility: 8,
    defaultValue: 9
  },
  {
    id: "supplier_screen",
    name: "Supplier Assessment Engine",
    description: "Parses, scores, and classifies vendor questionnaire responses based on custom risk matrices and environmental weights.",
    defaultFeasibility: 8,
    defaultValue: 8
  },
  {
    id: "task_rec",
    name: "Corrective Action Advisor",
    description: "Recommends actionable ESG remediation steps and outlines industry-standard SOPs aligned with audited operational gaps.",
    defaultFeasibility: 7,
    defaultValue: 8
  },
  {
    id: "progress_monitor",
    name: "Milestone Anomaly Detector",
    description: "Tracks active mitigation timelines and automatically triggers alerts for lagging target dates or expiring compliance credentials.",
    defaultFeasibility: 7,
    defaultValue: 7
  },
  {
    id: "report_gen",
    name: "Standardized Disclosure Draftsman",
    description: "Drafts certified-level corporate disclosures, executive statements, and GRI chapter templates from authenticated database tables.",
    defaultFeasibility: 9,
    defaultValue: 8
  },
  {
    id: "translation",
    name: "Certified Domain Translator",
    description: "Translates and aligns native sustainability disclosure claims into highly standardized international ESG terminology.",
    defaultFeasibility: 10,
    defaultValue: 7
  },
  {
    id: "qa",
    name: "Regulatory Knowledge Assistant",
    description: "Conducts real-time semantic query evaluations over massive corporate guidelines, standards, and historical audits.",
    defaultFeasibility: 8,
    defaultValue: 8
  },
  {
    id: "priority_ranking",
    name: "ROI Matrix Sequencer",
    description: "Calculates cost-benefit, regulatory pressure, and carbon impact parameters to dynamically schedule optimal action steps.",
    defaultFeasibility: 7,
    defaultValue: 8
  },
  {
    id: "trend_analysis",
    name: "Predictive Path Modeler",
    description: "Evaluates historical energy and waste metrics to build emissions regressions and estimate net-zero target fulfillment dates.",
    defaultFeasibility: 6,
    defaultValue: 8
  },
  {
    id: "dashboard_gen",
    name: "KPI Interface Builder",
    description: "Synthesizes multidimensional environmental and social data streams into tailormade, clutter-free executive interfaces.",
    defaultFeasibility: 8,
    defaultValue: 7
  }
];

export const DEFAULT_TASKS: RepeatingTask[] = [
  // Environmental Management
  {
    id: "env_task_1",
    subDomainId: "environmental",
    title: "Consolidate global energy consumption records",
    painPoint: "Energy receipts and electricity invoices are scattered across facilities, leading to fragmented carbon accounts.",
    defaultAiFunctionId: "data_extraction",
    defaultOutput: "Unified digital utility energy ledger with monthly consumption indicators compiled dynamically."
  },
  {
    id: "env_task_2",
    subDomainId: "environmental",
    title: "Calculate Scope 1 and Scope 2 carbon equivalents",
    painPoint: "Translating physical fuels and electricity usage into metric tons of CO2e involves manual conversion factors subject to frequent updates.",
    defaultAiFunctionId: "esg_classification",
    defaultOutput: "Standardized GHG Protocol inventory with automated scope breakdowns and emission intensity indices."
  },
  {
    id: "env_task_3",
    subDomainId: "environmental",
    title: "Categorize waste streams and circular metrics",
    painPoint: "Local facilities classify hazardous, organic, electronic, and landfill waste with inconsistent logging methodologies.",
    defaultAiFunctionId: "esg_classification",
    defaultOutput: "Unified corporate waste register mapping recyclability percentages and disposal methods to global benchmarks."
  },
  {
    id: "env_task_4",
    subDomainId: "environmental",
    title: "Audit water consumption and discharge volumes",
    painPoint: "Identifying operational leaks or excessive site water usage depends on retroactive monthly bill reviews.",
    defaultAiFunctionId: "trend_analysis",
    defaultOutput: "Real-time municipal intake forecasting models highlighting outliers and unexpected consumption spikes."
  },
  {
    id: "env_task_5",
    subDomainId: "environmental",
    title: "Document environmental incidents and resolutions",
    painPoint: "Interpreting qualitative, free-text incident files to detect systematic compliance vulnerabilities takes valuable administrative days.",
    defaultAiFunctionId: "doc_summary",
    defaultOutput: "Structured incident reports categorizing primary failure vectors and listing prescribed preventive actions."
  },
  {
    id: "env_task_6",
    subDomainId: "environmental",
    title: "Synthesize monthly executive sustainability reviews",
    painPoint: "ESG officers manually draft heavy summary texts and build presentation slides for steering committees each month.",
    defaultAiFunctionId: "report_gen",
    defaultOutput: "Curated executive briefs outlining carbon reductions, energy trends, and ongoing initiative milestones."
  },

  // Social Responsibility Management
  {
    id: "soc_task_1",
    subDomainId: "social",
    title: "Aggregate global labor compensation records",
    painPoint: "Wage, premium health benefits, and overtime data exist in decentralized, site-specific payroll tools.",
    defaultAiFunctionId: "data_extraction",
    defaultOutput: "Consolidated, highly organized payroll summaries mapped to demography for objective fair-pay auditing."
  },
  {
    id: "soc_task_2",
    subDomainId: "social",
    title: "Audit occupational safety and health records",
    painPoint: "Incident sheets and safety hazard logs are unstructured, making it difficult to pinpoint workplace hazard centers.",
    defaultAiFunctionId: "risk_detection",
    defaultOutput: "In-depth workplace risk report flagging active incident clusters and identifying recurring root-cause patterns."
  },
  {
    id: "soc_task_3",
    subDomainId: "social",
    title: "Verify diversity and representation metrics",
    painPoint: "Calculating equitable pay metrics or leadership-tier gender distribution manually is labor-intensive and prone to calculation errors.",
    defaultAiFunctionId: "gap_id",
    defaultOutput: "Audit-ready representation charts paired with targeted evidence requirements."
  },
  {
    id: "soc_task_4",
    subDomainId: "social",
    title: "Analyze labor standards and overtime compliance",
    painPoint: "Cross-checking local working hours and mandatory rest periods to prevent regulatory overtime violations is nearly impossible manually.",
    defaultAiFunctionId: "risk_detection",
    defaultOutput: "Automated site labor threshold dashboard highlighting compliance alerts and immediate remedial checklists."
  },

  // Governance and Compliance Management
  {
    id: "gov_task_1",
    subDomainId: "governance",
    title: "Review business ethics and anti-corruption compliance",
    painPoint: "Comparing long, archaic internal codes of conduct against dynamic regional regulatory updates is slow and inefficient.",
    defaultAiFunctionId: "doc_summary",
    defaultOutput: "Clarity-focused audit brief citing specific outdated phrases and recommending localized policy amendments."
  },
  {
    id: "gov_task_2",
    subDomainId: "governance",
    title: "Verify regulatory corporate disclosures",
    painPoint: "Tracking hundreds of active operational permits, wastewater authorizations, and data safety filings across sites is highly reactive.",
    defaultAiFunctionId: "gap_id",
    defaultOutput: "Traffic-light compliance registry showing critical permit timelines, expiry alerts, and renewal assignments."
  },
  {
    id: "gov_task_3",
    subDomainId: "governance",
    title: "Audit board governance and executive records",
    painPoint: "Manually cross-referencing board minutes, general meeting disclosures, and audit structures for ESG disclosure audits is overwhelming.",
    defaultAiFunctionId: "gap_id",
    defaultOutput: "Governance checklist highlighting gaps in independent seat ratios, audit committees, and stakeholder logs."
  },

  // Supplier ESG Management
  {
    id: "sup_task_1",
    subDomainId: "supplier",
    title: "Assess supplier ESG questionnaire responses",
    painPoint: "Reviewing distinct formats of vendor compliance forms is extremely tedious and results in highly subjective grading.",
    defaultAiFunctionId: "supplier_screen",
    defaultOutput: "Standardized supplier scorecard with side-by-side risk, environmental, and labor rating indices."
  },
  {
    id: "sup_task_2",
    subDomainId: "supplier",
    title: "Evaluate high-risk deep supply chain partners",
    painPoint: "Sub-tier suppliers may hide toxic emission practices, safety issues, or unfair labor processes due to general lack of trace visibility.",
    defaultAiFunctionId: "risk_detection",
    defaultOutput: "Deep supply chain risk alert reports detailing known ecological violations or regional non-compliance histories."
  },
  {
    id: "sup_task_3",
    subDomainId: "supplier",
    title: "Generate formal vendor corrective notices",
    painPoint: "Composing custom improvement requests requires referencing strict environmental codes under tight deadlines.",
    defaultAiFunctionId: "report_gen",
    defaultOutput: "Standardized regulatory-compliant corrective notices specifying required parameters and evidence files."
  },

  // ESG Reporting and Communication
  {
    id: "rep_task_1",
    subDomainId: "reporting",
    title: "Consolidate cross-department disclosure inputs",
    painPoint: "Annual report cycles rely on inconsistent email responses, rough text snippets, and conflicting calculations.",
    defaultAiFunctionId: "data_extraction",
    defaultOutput: "Consolidated internal reporting database with validated, audit-ready data blocks matching target GRI formats."
  },
  {
    id: "rep_task_2",
    subDomainId: "reporting",
    title: "Draft integrated ESG report chapters",
    painPoint: "Framing annual disclosures within complex standard systems like GRI Index, SASB, or CSRD takes months of technical writing.",
    defaultAiFunctionId: "report_gen",
    defaultOutput: "High-quality, copyable drafts of core report chapters customized with the company's annual dataset."
  },
  {
    id: "rep_task_3",
    subDomainId: "reporting",
    title: "Translate critical ESG summaries",
    painPoint: "Standard translation tools regularly deliver literal translations of complex sustainability terminology like Scope 3 or ESG rating brackets.",
    defaultAiFunctionId: "translation",
    defaultOutput: "Accurate, internationally aligned bilingual summaries matching standard sustainability taxonomies."
  },

  // Sustainability Action Management
  {
    id: "act_task_1",
    subDomainId: "sustainability",
    title: "Formulate step-by-step sustainability milestones",
    painPoint: "Translating board-level targets (e.g., 'reach zero waste to landfill') into daily practical operational guides is extremely difficult.",
    defaultAiFunctionId: "task_rec",
    defaultOutput: "Phased 30-60-90 day goal timeline with assigned actions, metrics, and standard operating procedures."
  },
  {
    id: "act_task_2",
    subDomainId: "sustainability",
    title: "Track cross-functional initiative progress",
    painPoint: "Verifying whether specific sites have actively adapted eco-friendly vendor guidelines or worker health checks takes constant direct oversight.",
    defaultAiFunctionId: "progress_monitor",
    defaultOutput: "Interactive status dashboard highlighting delayed tasks and automatically initiating email prompts to owners."
  }
];
