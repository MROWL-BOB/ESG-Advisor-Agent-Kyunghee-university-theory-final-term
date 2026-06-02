import React, { useState, useEffect, useRef } from "react";
import { ChatMessage } from "../types";
import { MessageSquare, Send, Sparkles, RefreshCw, X, HelpCircle, GraduationCap } from "lucide-react";

interface AdvisorChatProps {
  organizationName: string;
  industrySector: string;
  audienceType: string;
  currentStep: number;
}

export default function AdvisorChat({
  organizationName,
  industrySector,
  audienceType,
  currentStep
}: AdvisorChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  
  const bottomRef = useRef<HTMLDivElement>(null);

  // Initialize with academic/professional custom greeting matching the user audience!
  useEffect(() => {
    let greeting = "";
    if (audienceType === "Student") {
      greeting = `### ESG AI Design Labs: Academic Mentor
Hello! I am your **ESG AI Agent Design Mentor**. 

I am here to help you study the **four-step framework** for aligning corporate workflows with AI. Since you are in the academic track, we can discuss:
1. How to unpack general ESG claims into discrete variables.
2. Formulating clean functional specs for AI models.
3. How to write standard prompts for Document Summarizers, Gap Validators etc.

Ask me anything about designing agents for **${organizationName || "your study domain"}**!`;
    } else if (audienceType === "Manager") {
      greeting = `### ESG AI Design Labs: Corporate Advisor
Welcome, Manager. I am your specialized **ESG AI Product Consultant**.

My role is to help you streamline compliance pipelines, lower audit preparation overhead, and configure robust AI-driven data oversight for **${organizationName || "your enterprise"}** in the **${industrySector}** sector.

How can I help you refine your AI capabilities or justify the ROI of building specialized agents for Environmental, Social, or Governance workflows?`;
    } else {
      greeting = `### ESG AI Design Labs: System Architect
Hello! I am your **ESG AI Agent Design Mentor/Consultant**.

I specialize in matching domain tasks with language models, optimizing parsing pipelines, and setting up secure agents that prevent metrics hallucinations. Let's design a secure blueprint for **${organizationName || "your organization"}**.

What technical constraints, prompt parameters, or priority mapping questions are you trying to resolve right now?`;
    }

    setMessages([
      {
        id: "greet",
        sender: "advisor",
        text: greeting,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [audienceType, organizationName, industrySector]);

  // Scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      sender: "user",
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText("");
    setIsLoading(true);

    try {
      // Direct call to /api/esg/chat with tailored system prompt matching the ESG AI Agent Design Workshop!
      const response = await fetch("/api/esg/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            ...messages.map(m => ({ sender: m.sender === "user" ? "user" : "model", text: m.text })),
            { sender: "user", text: inputText }
          ],
          userContext: {
            userRole: `ESG Agent Workshop participant (${audienceType})`,
            sector: industrySector,
            orgName: organizationName,
            customTopic: "ESG AI Agent Design & Priority Matrix Guidelines"
          }
        })
      });

      const data = await response.json();
      
      let replyText = data?.text || "";

      // Fallback response inline if server hasn't been configured with custom model endpoints
      if (!replyText || replyText.includes("demo mode")) {
        replyText = getSimulatedAdvisorResponse(inputText, audienceType, currentStep, organizationName);
      }

      setMessages(prev => [...prev, {
        id: `reply_${Date.now()}`,
        sender: "advisor",
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch (err) {
      console.error("Advisor chat dispatch error:", err);
      setMessages(prev => [...prev, {
        id: `reply_${Date.now()}`,
        sender: "advisor",
        text: getSimulatedAdvisorResponse(inputText, audienceType, currentStep, organizationName),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 flex flex-col ${
      isMinimized ? "w-14 h-14" : "w-100 h-[500px] max-w-[calc(100vw-2rem)] select-none"
    }`} id="advisor-chat-container">
      {isMinimized ? (
        <button
          id="advisor-chat-trigger"
          onClick={() => setIsMinimized(false)}
          className="w-14 h-14 bg-emerald-900 hover:bg-emerald-950 border border-emerald-850 text-white rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:scale-105 active:scale-95 transition-all text-center animate-bounce animate-duration-1000"
          title="Consult Workshop Advisor"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      ) : (
        <div className="w-full h-full bg-gray-900 text-gray-100 rounded-2xl shadow-xl border border-gray-950 flex flex-col overflow-hidden">
          {/* Chat Header */}
          <div className="bg-emerald-900 p-4 border-b border-emerald-950 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <div>
                <h4 className="font-bold text-white text-xs leading-none">AI Agent Design Mentor</h4>
                <span className="text-[10px] text-emerald-300 font-mono mt-1 block uppercase">Active Workshop Guide</span>
              </div>
            </div>
            
            <button
              onClick={() => setIsMinimized(true)}
              className="text-emerald-100 hover:text-white p-1 hover:bg-emerald-950 rounded-lg transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(m => (
              <div
                key={m.id}
                className={`flex flex-col max-w-[85%] ${
                  m.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
                }`}
              >
                <div className={`p-3 rounded-2xl text-[11.5px] leading-relaxed ${
                  m.sender === "user"
                    ? "bg-emerald-900 text-white rounded-tr-none font-semibold"
                    : "bg-gray-800 text-gray-200 border border-gray-750 rounded-tl-none font-normal"
                } markdown-body`}>
                  {m.text.split("\n\n").map((para, i) => {
                    if (para.startsWith("###")) {
                      return <h5 key={i} className="font-bold text-emerald-400 text-xs mb-1 uppercase tracking-wide">{para.replace("###", "").trim()}</h5>;
                    }
                    if (para.startsWith("•") || para.startsWith("-")) {
                      return (
                        <ul key={i} className="list-disc pl-4 space-y-1 mb-2">
                          {para.split("\n").map((line, li) => (
                            <li key={li}>{line.replace(/^[-•]\s*/, "").trim()}</li>
                          ))}
                        </ul>
                      );
                    }
                    if (para.match(/^\d+\./)) {
                      return (
                        <ol key={i} className="list-decimal pl-4 space-y-1 mb-2">
                          {para.split("\n").map((line, li) => (
                            <li key={li}>{line.replace(/^\d+\.\s*/, "").trim()}</li>
                          ))}
                        </ol>
                      );
                    }
                    return <p key={i} className="mb-2">{para}</p>;
                  })}
                </div>
                <span className="text-[9px] text-gray-500 font-mono mt-1">{m.timestamp}</span>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-gray-400 font-mono text-[10px] animate-pulse">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                <span>Mentor analyzing alignment requirements...</span>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick Guidance Prompts helper */}
          <div className="bg-gray-950 p-2 border-t border-gray-850 flex gap-2 overflow-x-auto">
            <button
              onClick={() => setInputText("How do we measure Feasibility for a Document Summary Agent?")}
              className="px-2 py-1 bg-gray-800 hover:bg-gray-750 text-gray-350 rounded-md text-[10px] font-semibold whitespace-nowrap cursor-pointer"
            >
              ? What is feasibility metrics
            </button>
            <button
              onClick={() => setInputText("Suggest some Social Responsibility repeating tasks of Acme")}
              className="px-2 py-1 bg-gray-800 hover:bg-gray-750 text-gray-350 rounded-md text-[10px] font-semibold whitespace-nowrap cursor-pointer"
            >
              ? Social tasks suggestion
            </button>
            <button
              onClick={() => setInputText("Explain 'Evidence Gap Identification' vs CSRD requirements")}
              className="px-2 py-1 bg-gray-800 hover:bg-gray-750 text-gray-350 rounded-md text-[10px] font-semibold whitespace-nowrap cursor-pointer"
            >
              ? Document Gap-analysis ROI
            </button>
          </div>

          {/* Input Box Form */}
          <form onSubmit={handleSend} className="p-3 bg-gray-950 border-t border-gray-850 flex gap-2">
            <input
              type="text"
              id="advisor-chat-input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about ESG agent design specs..."
              className="flex-1 bg-gray-800 border border-gray-750 text-white px-3 py-2 text-xs rounded-xl focus:outline-hidden focus:border-emerald-600 font-mono"
            />
            <button
              type="submit"
              id="advisor-chat-send"
              className="p-2.5 bg-emerald-900 hover:bg-emerald-950 border border-emerald-900 text-white rounded-xl shadow cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

// Sophisticated context-aware local response emulator for high-fidelity offline/private sandbox reliability
function getSimulatedAdvisorResponse(input: string, track: string, step: number, org: string): string {
  const query = input.toLowerCase();

  if (query.includes("feasibility") || query.includes("feas")) {
    return `### Feasibility Criteria Guidelines
In ESG Agent design, **Implementation Feasibility** depends on three variables:
1. **Data Accessibility:** Are you querying raw bills, tidy CSV logs, or unstructured PDFs? Unstructured documents (e.g., invoices) are easy for LLMs but require configuring OCR pipelines.
2. **Cognitive Complexity:** Simple classification or standard search Q&A remains highly feasible (Score 8 to 10). Continuous pattern forecasting or auto-matching against multiple regulatory frameworks requires custom agents and prompt chaining (Score 6 to 7).
3. **Audit Readiness:** AI outputs must include source document citations (Grounding) to withstand legal compliance audits.

To maximize implementation speed, focus first on **Document Summarizers** and **Data Extractors** before aiming for fully automated regulatory planning agents.`;
  }

  if (query.includes("social") || query.includes(" welfare") || query.includes("diversity")) {
    return `### Social Responsibility Automation Ideas
For **Social Management** in **${org || "your organization"}**, common repeated tasks suited for AI Agents include:
- **Employee Safety Compliance Reviews:** Summarizing health records from diverse worksites to catch safety incidents or protocol violations.
- **Fair Compensation Benchmarking:** Extracting wage parameters across branches to analyze adjusting pay disparities.
- **Labor Contract Verification:** Inspecting supplier labor charters against safety codes or anti-forced-labor standards.

These tasks require **Document Summarization** and **Risk Detection** capabilities to generate structured risk dashboards.`;
  }

  if (query.includes("gap") || query.includes("csrd") || query.includes("framework")) {
    return `### Aligning with Global Frameworks (GRI, CSRD)
Global sustainability disclosures are highly structured:
- **GRI Standards (Global Reporting Initiative):** Require strict quantitative measurements across carbon, waste, water, and labor indices.
- **CSRD (EU Corporate Sustainability Reporting Directive):** Demands **Double Materiality**, proving how sustainability impacts corporate finances AND how corporate operations impact the ecology.

An **Evidence Gap Identification Agent** matches local business diaries against disclosure standards to discover missing proofs. This reduces third-party audit preparation timelines by up to 60%.`;
  }

  // General responsive template
  return `### ESG Agent Design Advisory Notes
Thank you for your inquiry regarding **${org || "the organization"}**'s ESG AI strategy. 

Since you are currently exploring **Step ${step}** in the workshop, consider these recommendations:
- Look at the **Pain Points** listed in Step 2. Focus on tasks where managers spend excessive hours copy-pasting numbers.
- In Step 3, match those tasks to simple LLM primitives like **Document Summarization** or **Data Extraction** because they are highly feasible.
- Look at the resulting **Priority Quadrants** in Step 4. Ensure your first pilot project stays in the **Build First** quadrant.

Would you like to analyze a specific audit task or discuss standard prompt constraints for security?`;
}
