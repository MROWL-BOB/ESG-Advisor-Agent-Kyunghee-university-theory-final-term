export type EsgSubDomainId =
  | "environmental"
  | "social"
  | "governance"
  | "supplier"
  | "reporting"
  | "sustainability";

export interface EsgSubDomain {
  id: EsgSubDomainId;
  name: string;
  explanation: string;
  icon: string;
  color: string;
}

export interface RepeatingTask {
  id: string;
  subDomainId: EsgSubDomainId;
  title: string;
  painPoint: string;
  defaultAiFunctionId: string;
  defaultOutput: string;
  custom?: boolean;
}

export interface AiFunction {
  id: string;
  name: string;
  description: string;
  defaultFeasibility: number; // 1 to 10
  defaultValue: number; // 1 to 10
}

export interface MappedTask {
  taskId: string;
  taskTitle: string;
  subDomainId: EsgSubDomainId;
  painPoint: string;
  aiFunctionId: string;
  aiOutput: string;
  priorityValue: number; // 1 to 10 (Organizational Value)
  feasibilityValue: number; // 1 to 10 (Implementation Feasibility)
  isConfigured: boolean;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "advisor";
  text: string;
  timestamp: string;
}

export interface WorkshopState {
  currentStep: number;
  selectedSubDomain: EsgSubDomainId;
  tasks: RepeatingTask[];
  mappedTasks: MappedTask[];
  customDomainName: string;
  organizationName: string;
  industrySector: string;
  audienceType: string; // "Student" | "Manager" | "Consultant" | "AI Designer"
  notes: string;
}
