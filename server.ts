import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Initialize the server-side Gemini Client lazy-loaded when needed
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("GEMINI_API_KEY is not defined. AI functionality will run in fallback mock mode.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key || "PLACEHOLDER",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

const app = express();
app.use(express.json({ limit: '10mb' }));

// Utility to clean Markdown block quotes if model sends them in text
function parseJSONResponse(text: string | undefined): any {
  if (!text) return null;
  try {
    let clean = text.trim();
    if (clean.startsWith("```json")) {
      clean = clean.substring(7);
    } else if (clean.startsWith("```")) {
      clean = clean.substring(3);
    }
    if (clean.endsWith("```")) {
      clean = clean.substring(0, clean.length - 3);
    }
    return JSON.parse(clean.trim());
  } catch (err) {
    console.error("Failed to parse Gemini JSON output:", text, err);
    return null;
  }
}

// 1. API: ESG Diagnostic Evaluator
app.post("/api/esg/diagnose", async (req, res) => {
  const { 
    userRole, 
    answers, 
    sector, 
    customContext,
    
    organizationName,
    organizationSize,
    countryRegion,
    reportingPurpose,
    existingDocsList,
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
  } = req.body;

  const prompt = `You are a professional ESG Advisor and certified Sustainability Auditor.
Conduct a thorough, intelligent ESG diagnostic audit and gap analysis based on the following detailed input:

--- ORGANIZATION IDENTITY ---
Organization Name: ${organizationName || 'Not specified'}
User Role/Organization Type: ${userRole || 'Not specified'}
Industry Sector: ${sector || 'Not specified'}
Organization Size: ${organizationSize || 'Not specified'}
Country/Region: ${countryRegion || 'Not specified'}
ESG Reporting Purpose: ${reportingPurpose || 'Not specified'}
Existing ESG Documents List: ${existingDocsList || 'None specified'}

--- CORE SUSTAINABILITY INPUTS ---
- Energy Use & Resources: ${energyUse || 'Not specified'}
- Waste Management: ${wasteManagement || 'Not specified'}
- Carbon Emissions Data: ${carbonEmissions || 'Not specified'}
- Employee Welfare Practices: ${employeeWelfare || 'Not specified'}
- Diversity & Inclusion Practices: ${diversityInclusion || 'Not specified'}
- Health & Safety Practices: ${healthSafety || 'Not specified'}
- Supplier Management Practices: ${supplierManagement || 'Not specified'}
- Anti-Corruption Policy: ${antiCorruption || 'Not specified'}
- Board Governance Information: ${boardGovernance || 'Not specified'}
- Data Privacy & Compliance Practices: ${dataPrivacy || 'Not specified'}

--- TARGET SELF-ASSESSMENT ANSWERS ---
Answers to ESG Diagnostic Questionnaire:
${JSON.stringify(answers, null, 2)}

--- ADDITIONAL CONTEXT ---
${customContext || 'None'}

Please evaluate their ESG profile. Provide the output in valid, clean JSON matching this exact structure:
{
  "scores": {
    "environmental": 0, // Score from 0 to 100 based on entries
    "social": 0,        // Score from 0 to 100 based on entries
    "governance": 0,    // Score from 0 to 100 based on entries
    "overall": 0        // Overall ESG score from 0 to 100
  },
  "complianceGap": "Detailed compliance gap analysis of regulatory frameworks they might be risking non-compliance with (e.g. CSRD, SFDR, SEC regulations, GRI standards, local environmental laws) relevant to their role and region.",
  "strengths": [
    "Highlight specific commendable initiatives from their answers and inputs"
  ],
  "gaps": [
    "Identify major gaps or vulnerabilities where they fall short"
  ],
  "recommendations": [
    {
      "id": "rec-1",
      "pilar": "E", // must be "E" or "S" or "G"
      "title": "Short title of target action",
      "action": "Practical step-by-step description of how to complete this action",
      "priority": "High", // must be "High" or "Medium" or "Low"
      "difficulty": "Easy", // must be "Easy" or "Moderate" or "Hard"
      "impact": "Description of why this helps and how it changes their score"
    }
  ],
  "plainLanguageExplanation": "Provide a plain-language user explanation of their current ESG standing, strengths, weaknesses, and potential risk factors in plain conversational yet professional English.",
  "professionalSummary": "A highly high-level professional summary of the audit suitable for an executive board meeting or management deck.",
  "complianceReadinessScore": 0, // Compliance readiness percentage (0 to 100)
  "supplierEsgRiskLevel": "Low", // "Low", "Medium" or "High" supplier risk level
  "carbonManagementMaturity": "Beginner", // "Beginner", "Intermediate", "Advanced" or "Optimized" carbon maturity level
  "dataCompletenessLevel": 0 // ESG data completeness rating (0 to 100) based on how many profile fields they answered
}

Ensure the response contains ONLY the valid JSON matching that exact schema. Keep all assessments highly relevant to the User Role (${userRole || 'Manager'}) and Industry (${sector || 'General'}). Do not include any trailing markdown text outside of the JSON block.`;

  try {
    const keyExists = !!process.env.GEMINI_API_KEY;
    if (!keyExists) {
      // Fallback response for missing API Key to prevent app crash
      return res.json(getFallbackDiagnosis(userRole, sector, organizationName));
    }

    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const parsed = parseJSONResponse(response.text);
    if (parsed) {
      res.json(parsed);
    } else {
      res.status(500).json({ error: "Invalid layout received from AI agent. Please try again." });
    }
  } catch (err: any) {
    console.error("ESG diagnostic API Error:", err);
    res.status(500).json({ error: err.message || "AI ESG Diagnosis encountered an error." });
  }
});

// 2. API: Supplier Screening & Comparison
app.post("/api/esg/supplier-screen", async (req, res) => {
  const { suppliers } = req.body; // Array of suppliers with metrics

  const prompt = `You are a Sustainable Supply Chain Analyst.
Evaluate and compare the ESG credentials of the following prospective/current suppliers:

${JSON.stringify(suppliers, null, 2)}

Provide a comparative report in JSON format with:
{
  "comparisons": [
    {
      "name": "Supplier name",
      "riskLevel": "Low" | "Medium" | "Risk Flag",
      "carbonEfficiency": "Good" | "Average" | "Poor",
      "socialScore": "Score description",
      "governanceScore": "Governance status",
      "analysis": "Brief analysis of their sustainability practices and concerns."
    }
  ],
  "recommendation": "Overall purchase/contracting guidance. Which supplier has the best ESG profile? How to advise the underperforming ones?",
  "draftRequestLetter": "Professional email/letter template that procurement managers can copy and send to suppliers demanding higher transparency or ESG compliance improvements."
}

Ensure the output is strictly valid clean JSON.`;

  try {
    const keyExists = !!process.env.GEMINI_API_KEY;
    if (!keyExists) {
      return res.json(getFallbackSupplierScreen(suppliers));
    }

    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const parsed = parseJSONResponse(response.text);
    if (parsed) {
      res.json(parsed);
    } else {
      res.status(500).json({ error: "Failed to parse supplier screen comparison format." });
    }
  } catch (err: any) {
    console.error("Supplier screen API Error:", err);
    res.status(500).json({ error: err.message || "AI Supplier Screening encountered an error." });
  }
});

// 3. API: Continuous Advisor Chat / Expert Inquiry
app.post("/api/esg/chat", async (req, res) => {
  const { messages, userContext } = req.body;

  const historyPrompt = messages.map((m: any) => `${m.sender === 'user' ? 'User' : 'ESG AI Advisor'}: ${m.text}`).join("\n");

  const systemInstruction = `You are the core ESG & Sustainability Advisor Agent, an expert in environmental science, labor rights, inclusion, and corporate governance.
The user is querying you from a context with role: "${userContext?.userRole || 'Sustainability advocate'}" and industry sector: "${userContext?.sector || 'General'}".
Answer all human compliance, regulation, Scope greenhouse gas tracking, ESG reporting, social policy, or framework questions professionally and constructively.
Keep responses actionable, structured, formatted in beautiful Markdown (using headings, lists, bold concepts, etc.), and maintain standard corporate sustainability auditing wisdom.
Do not invoke unproven figures. Ground suggestions in general standards like GRI, SASB, TCFD, and GHG Protocol.`;

  try {
    const keyExists = !!process.env.GEMINI_API_KEY;
    if (!keyExists) {
      return res.json({
        text: "### ESG AI Advisor (demo mode)\n\nTo activate complete AI guidance, please ensure a valid `GEMINI_API_KEY` is registered in **Settings > Secrets**.\n\nHere is a general recommendation: focus on calculating **Scope 1** (direct) and **Scope 2** (indirect purchased energy) carbon emissions first, as these are the most standard requirements for stakeholders and international reporting standards."
      });
    }

    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `${historyPrompt}\n\nUser: Please reply to my latest question or scenario. Keep it aligned with my context and provide comprehensive, expert, human-readable answers.`,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    res.json({ text: response.text });
  } catch (err: any) {
    console.error("Chat API error:", err);
    res.status(500).json({ error: err.message || "Failed to contact Gemini ESG Advisor API." });
  }
});

// 4. API: Monthly Progress & Goal Sync Generator
app.post("/api/esg/monthly-summary", async (req, res) => {
  const { historyLog, recommendations, overallScore } = req.body;

  const prompt = `You are a sustainability advisor overseeing an organization's continuous ESG progression.
Evaluate their continuous management path given these current parameters:
- Core Active Recommendations: ${JSON.stringify(recommendations)}
- Completed Actions Log: ${JSON.stringify(historyLog)}
- Current Overall ESG Score: ${overallScore}%

Please deliver a concise corporate-style "Monthly Summary Notification & Next-Month Strategy Roadmap" in nice JSON:
{
  "summary": "High value progress analysis celebrating completed milestones or pointing out stagnation.",
  "unsolvedRiskWarning": "Critical notice alerting them about high-priority tasks that are still pending or lagging.",
  "nextMonthActionHighlights": [
    "Focus task 1 details",
    "Focus task 2 details"
  ],
  "motivationalInsights": "Encouragement regarding the long-term governance, financial, or ecological benefits of these tasks."
}

Ensure the output is strictly valid clean JSON.`;

  try {
    const keyExists = !!process.env.GEMINI_API_KEY;
    if (!keyExists) {
      return res.json(getFallbackMonthlySummary(recommendations, historyLog, overallScore));
    }

    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const parsed = parseJSONResponse(response.text);
    if (parsed) {
      res.json(parsed);
    } else {
      res.status(500).json({ error: "Failed to compile monthly progression summary." });
    }
  } catch (err: any) {
    console.error("Monthly Summary API error:", err);
    res.status(500).json({ error: err.message || "Failed to compile monthly summary suggestions." });
  }
});

// Fallback logic for when GEMINI_API_KEY is not defined (prevents app from breaking)
function getFallbackDiagnosis(role: string, sector: string, organizationName?: string) {
  const org = organizationName || "Organization";
  return {
    scores: {
      environmental: 55,
      social: 62,
      governance: 68,
      overall: 61
    },
    complianceGap: "[DEMO MODE: Registered with fallback analyzer] For " + org + " to achieve alignment with the EU Corporate Sustainability Reporting Directive (CSRD) and GHG Protocol Scope 3 requirements, standard emissions disclosures are required.",
    strengths: [
      "Initial operational ESG structure is active",
      "Dynamic commitment to labor wellness safeguards and diversity policies"
    ],
    gaps: [
      "Lack of verified Scope 1 (Direct) & Scope 2 (Indirect grid electricity) greenhouse gas records",
      "Underrepresented independent board seats ratio (<50%)"
    ],
    recommendations: [
      {
        id: "demo-rec-1",
        pilar: "E",
        title: "Track Scope 1 & 2 Emissions",
        action: "Gather direct utility invoices (electricity, natural gas) and calculate initial CO2 equivalents using standard DEFRA or EPA conversion factors.",
        priority: "High",
        difficulty: "Moderate",
        impact: "Establishes a solid emissions baseline for stakeholder inquiries."
      },
      {
        id: "demo-rec-2",
        pilar: "S",
        title: "Establish a Supplier Code of Ethics",
        action: "Draft a formal supplier compliance mandate focusing on labor standards, safe working environments, and fair compensation checks.",
        priority: "Medium",
        difficulty: "Easy",
        impact: "Mitigates external supply chain reputation and legal liabilities."
      },
      {
        id: "demo-rec-3",
        pilar: "G",
        title: "Conduct Transparency Governance Review",
        action: "Publish the board composition, voting procedures, and major shareholder conflicts safeguards on the public corporate portal.",
        priority: "High",
        difficulty: "Moderate",
        impact: "Improves overall corporate integrity and trust index."
      }
    ],
    plainLanguageExplanation: "The organization is currently in the 'Developing' phase for its ESG practices. Key areas like employee health, safety measures, and preliminary corporate governance procedures are robust, but a lack of calculated Scope 1/2 emissions tracking represents a significant environmental vulnerability.",
    professionalSummary: "An introductory ESG audit for " + org + " indicates that setting direct carbon tracking procedures and adding independent board advisor slots will generate the highest immediate rating returns, ensuring alignment with GRI and global banking sustainability parameters.",
    complianceReadinessScore: 50,
    supplierEsgRiskLevel: "Medium",
    carbonManagementMaturity: "Beginner",
    dataCompletenessLevel: 65
  };
}

function getFallbackSupplierScreen(suppliers: any[]) {
  return {
    comparisons: (suppliers || []).map(s => ({
      name: s.name || "Unknown Supplier",
      riskLevel: "Medium",
      carbonEfficiency: "Average",
      socialScore: "50/100",
      governanceScore: "Adequate",
      analysis: `Demo analysis: '${s.name || 'Supplier'}' shows standard operational policies but requires closer check on waste management and human rights policies. Add a valid Gemini API key to run an in-depth audit.`
    })),
    recommendation: "Prefer suppliers with existing circular product certificates or detailed Scope 1/2 calculations.",
    draftRequestLetter: "Subject: Request for Sustainability & ESG Disclosure Information\n\nDear Partner,\n\nAs part of our commitment to transparency and compliance with ESG standards, we are requesting updated reports regarding your greenhouse gas emissions, waste management, and labor policies...\n\nBest regards,\nProcurement Team"
  };
}

function getFallbackMonthlySummary(recs: any[], history: any[], overall: number) {
  return {
    summary: `Continuity metrics reflect a steady baseline overall score of ${overall}%. Standard demo assessment is operational.`,
    unsolvedRiskWarning: "High priority compliance items like 'Scope 1 & 2 emissions' still require direct carbon invoice entries.",
    nextMonthActionHighlights: [
      "Consolidate energy logs for real auditing",
      "Implement feedback system for employee labor protections"
    ],
    motivationalInsights: "Every incremental task solved actively prevents regulatory penalties while attracting sustainability-conscious investors."
  };
}

// Setup Vite & Static Fallback Routing
async function startServer() {
  const PORT = 3000;

  if (process.env.NODE_ENV !== "production") {
    console.log("Serving page with live Vite process middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Production static files serving selected.");
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`ESG Advisor Agent operational on port ${PORT}`);
  });
}

startServer();
