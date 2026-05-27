import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, Sparkles, User, Loader2, RefreshCw, HelpCircle } from "lucide-react";
import { UserRole, IndustrySector } from "../types";

interface EsgChatAdvisorProps {
  userRole: UserRole;
  sector: IndustrySector;
}

interface MessageItem {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

const PRESET_PROMPTS = [
  "What are the core compliance differences between Scope 1, 2, and 3 emissions?",
  "How can an SME design a cost-efficient Supplier Code of Conduct?",
  "Explain the key parameters of the EU Corporate Sustainability Reporting Directive (CSRD).",
  "Suggest campus sustainability programs to reduce solid plastics waste."
];

export default function EsgChatAdvisor({ userRole, sector }: EsgChatAdvisorProps) {
  const [messages, setMessages] = useState<MessageItem[]>(() => [
    {
      id: "init",
      sender: "ai",
      text: `### Welcome to your ESG Diagnostic & Technical Advisor!\n\nI am the specialized **ESG AI Agent**, trained in sustainability policies, climate risk indices, and corporate auditing standards.\n\nSince you are acting as a **${userRole}** in the **${sector}** sector, I can help you with:\n1. **Emissions Baseline Calculations**\n2. **Compliance standards mapping** (GRI, SASB, SEC, or CSRD rules)\n3. **Supplier auditing and request letters**\n4. **University or NGO social impact frameworks**\n\nHow can I advise your sustainability strategy today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }
  ]);

  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMsg: MessageItem = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setLoading(true);

    try {
      const res = await fetch("/api/esg/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            sender: m.sender,
            text: m.text
          })),
          userContext: { userRole, sector }
        })
      });

      if (!res.ok) {
        throw new Error("Unable to reach the expert ESG service.");
      }

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          id: `reply-${Date.now()}`,
          sender: "ai",
          text: data.text || "I was unable to synthesize a compliant response. Please try again.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    } catch (err: any) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: "ai",
          text: `**Operational Alert:** ${err.message || "Failed to call AI model."} \n\nPlease make sure a valid \`GEMINI_API_KEY\` is active in **Settings > Secrets** to enable full expert consulting capabilities.`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handlePresetSelect = (promptText: string) => {
    handleSend(promptText);
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: `init-${Date.now()}`,
        sender: "ai",
        text: `Consultation session restarted. Ask me anything related to sustainable management, GRI/CSRD regulations, supply chain ethics, or greenhouse gas assessments.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      }
    ]);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-150 shadow-sm flex flex-col h-[650px] overflow-hidden" id="esg-chat-advisor">
      {/* Top Advisory bar */}
      <div className="bg-emerald-950 p-4 md:p-6 text-white flex justify-between items-center shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-800 flex items-center justify-center border border-emerald-700">
            <MessageSquare className="w-5 h-5 text-emerald-300" />
          </div>
          <div>
            <h3 className="font-bold text-sm md:text-base tracking-tight">Technical ESG Advisory Chat</h3>
            <span className="text-[10px] text-emerald-250 font-semibold block uppercase">Powered by Google Gemini 3.5</span>
          </div>
        </div>

        <button
          onClick={handleClearHistory}
          className="p-1.5 rounded-lg border border-emerald-800 text-emerald-200 hover:bg-emerald-900 transition-colors text-xs flex items-center gap-1 font-semibold"
          title="Restart session"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Reset Chat
        </button>
      </div>

      {/* Messages Thread */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-slate-50/50">
        
        {messages.map((m) => {
          const isUser = m.sender === "user";
          return (
            <div
              key={m.id}
              className={`flex gap-3 max-w-3xl ${isUser ? "ml-auto flex-row-reverse" : "mr-auto"}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                isUser ? "bg-indigo-700 text-indigo-100" : "bg-emerald-900 text-emerald-150 border border-emerald-800"
              }`}>
                {isUser ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4 text-emerald-300 animate-pulse" />}
              </div>

              <div className="space-y-1">
                <div className={`p-4 rounded-2xl text-xs md:text-sm leading-relaxed transition-all ${
                  isUser
                    ? "bg-indigo-700 text-white rounded-tr-none shadow-sm font-medium"
                    : "bg-white text-gray-800 border border-gray-150 rounded-tl-none font-normal"
                }`}>
                  {/* Basic parsing for markdown bullet points, bold headers for clean visibility */}
                  {m.text.split("\n").map((line, lineIdx) => {
                    let textLine = line.trim();
                    if (textLine.startsWith("###")) {
                      return <h4 key={lineIdx} className="font-bold text-gray-900 text-sm mt-3 mb-1 first:mt-0">{textLine.replace("###", "")}</h4>;
                    }
                    if (textLine.startsWith("**") && textLine.endsWith("**")) {
                      return <p key={lineIdx} className="font-bold text-gray-950 mt-2">{textLine.replace(/\*\*/g, "")}</p>;
                    }
                    if (textLine.startsWith("-") || textLine.startsWith("*")) {
                      return <li key={lineIdx} className="ml-4 list-disc mt-1 text-gray-700">{textLine.substring(1).trim()}</li>;
                    }
                    // Simple inline bolding replace
                    const boldRegex = /\*\*(.*?)\*\*/g;
                    if (boldRegex.test(line)) {
                      const parts = line.split(boldRegex);
                      return (
                        <p key={lineIdx} className="mt-1.5 text-gray-700">
                          {parts.map((p, pIdx) => pIdx % 2 === 1 ? <strong key={pIdx} className="font-extrabold text-gray-900">{p}</strong> : p)}
                        </p>
                      );
                    }

                    return textLine ? <p key={lineIdx} className="mt-1.5 first:mt-0 text-gray-700">{line}</p> : <div key={lineIdx} className="h-2" />;
                  })}
                </div>
                <span className={`block text-[9px] text-gray-400 ${isUser ? "text-right" : "text-left"}`}>
                  {m.timestamp}
                </span>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex gap-3 mr-auto items-center">
            <div className="w-8 h-8 rounded-full bg-emerald-950 text-white flex items-center justify-center">
              <Loader2 className="w-4 h-4 animate-spin text-emerald-300" />
            </div>
            <div className="p-3 bg-white border border-gray-100 rounded-2xl rounded-tl-none text-xs text-gray-400 font-medium">
              ESG Specialist formulation live response...
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Recommended Prompt Helpers */}
      <div className="px-4 py-2 border-t border-gray-100 bg-white flex flex-wrap gap-1.5 shrink-0">
        <span className="text-[10px] text-gray-400 font-bold block w-full mb-1 flex items-center gap-1">
          <HelpCircle className="w-3 h-3" /> CLICK TO QUICK-ASK THE AGENT:
        </span>
        {PRESET_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            onClick={() => handlePresetSelect(prompt)}
            disabled={loading}
            className="text-[10px] bg-gray-50 hover:bg-gray-100 text-gray-600 px-2.5 py-1.5 rounded-lg border border-gray-200 transition-all font-semibold max-w-sm overflow-hidden text-ellipsis whitespace-nowrap"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Custom Text Entry */}
      <div className="p-4 border-t border-gray-100 bg-white shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(inputText);
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            className="flex-1 text-xs md:text-sm px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-emerald-800 font-medium"
            placeholder="Ask about Scope 3 compliance, GRI disclosure matrices, or carbon offset steps..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={loading}
          />
          <button
            type="submit"
            disabled={!inputText.trim() || loading}
            className="px-5 py-3 bg-emerald-800 hover:bg-emerald-900 disabled:opacity-50 disabled:hover:bg-emerald-800 text-white rounded-xl shadow-sm transition-colors flex items-center justify-center"
            title="Send chat question"
            aria-label="Send your sustainability question"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
