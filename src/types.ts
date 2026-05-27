export type UserRole =
  | "Corporate ESG Manager"
  | "SME Owner/Operator"
  | "Investor/Financial Analyst"
  | "Procurement/Supply Chain Manager"
  | "Consultant/ESG Advisor"
  | "University/School Administrator"
  | "NGO/Community Representative";

export type IndustrySector =
  | "Technology & Software"
  | "Manufacturing & Logistics"
  | "Financial & Banking Services"
  | "Retail & Consumer Goods"
  | "Education & Public Affairs"
  | "Healthcare & Pharma"
  | "Energy & Mining Utilities"
  | "Non-Profit & Humanitarian Services";

export interface QuestionnaireAnswer {
  questionId: string;
  category: "E" | "S" | "G";
  questionText: string;
  answerValue: string; // "Yes", "No", "In Progress", or custom value
  comment?: string;
}

export interface RecommendationTask {
  id: string;
  pilar: "E" | "S" | "G";
  title: string;
  action: string;
  priority: "High" | "Medium" | "Low";
  difficulty: "Easy" | "Moderate" | "Hard";
  impact: string;
  status: "ToDo" | "InProgress" | "Completed";
  targetDate?: string;
  assignee?: string;
  deadline?: string;
  evidenceName?: string;
  evidenceUrl?: string;
}

export interface DiagnosticResult {
  scores: {
    environmental: number;
    social: number;
    governance: number;
    overall: number;
  };
  complianceGap: string;
  strengths: string[];
  gaps: string[];
  recommendations: RecommendationTask[];
  plainLanguageExplanation?: string;
  professionalSummary?: string;
  complianceReadinessScore?: number;
  supplierEsgRiskLevel?: "Low" | "Medium" | "High";
  carbonManagementMaturity?: "Beginner" | "Intermediate" | "Advanced" | "Optimized";
  dataCompletenessLevel?: number;
}

export interface SupplierItem {
  id: string;
  name: string;
  country: string;
  sector: string;
  carbonIntensity: string; // e.g., low, medium, high
  laborStandardCertified: boolean;
  corporateEthicsCode: boolean;
  notes?: string;
}

export interface SupplierScreeningReport {
  comparisons: {
    name: string;
    riskLevel: "Low" | "Medium" | "Risk Flag";
    carbonEfficiency: "Good" | "Average" | "Poor";
    socialScore: string;
    governanceScore: string;
    analysis: string;
  }[];
  recommendation: string;
  draftRequestLetter: string;
}

export interface ContinuousActivityLog {
  id: string;
  timestamp: string;
  taskTitle: string;
  actionTaken: string;
  impactEstimated: string;
}

export interface KpiHistoryPoint {
  month: string;
  environmentalScore: number;
  socialScore: number;
  governanceScore: number;
  overallScore: number;
  carbonEmissions: number; // in metric tons CO2e
  diversityRatio: number; // percent
}

export interface MonthlyProgressSummary {
  summary: string;
  unsolvedRiskWarning: string;
  nextMonthActionHighlights: string[];
  motivationalInsights: string;
}
