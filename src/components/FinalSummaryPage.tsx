import React from "react";
import { BookOpen, GraduationCap, Award, CheckCircle2 } from "lucide-react";

export default function FinalSummaryPage() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 space-y-8 shadow-xs max-w-4xl mx-auto text-center animate-fade-in" id="final-summary-page">
      <div className="mx-auto w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-900 border border-emerald-250 mb-2.5">
        <GraduationCap className="w-6 h-6" />
      </div>

      <div className="space-y-3 max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-extrabold font-display text-emerald-950 tracking-tight leading-none">
          From ESG Work to AI Advisory
        </h2>
        <p className="text-sm font-bold text-emerald-800 font-mono tracking-wider uppercase">
          “From ESG tasks to intelligent advisory.”
        </p>
      </div>

      <div className="p-6 bg-gray-50 border border-gray-150 rounded-2xl text-left text-xs text-gray-700 leading-relaxed font-sans space-y-4 max-w-2xl mx-auto shadow-inner">
        <p className="font-medium text-gray-800">
          ESG AI Advisor transforms repeated ESG management work into AI-supported analysis, advisory output, and sustainable action. Behind the app, the four-step logic helps identify the domain, understand repeated tasks, match AI functions, and decide which features should be prioritized first.
        </p>
        <p className="border-t border-gray-200 pt-4 text-gray-550 italic leading-relaxed">
          “This prototype demonstrates how AI agent design can support ESG management through structured domain understanding, repeated task analysis, AI function matching, and priority-based MVP development.”
        </p>
      </div>

      {/* Structured takeaways grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto text-left pt-2">
        <div className="space-y-2 p-4 bg-emerald-50/30 border border-emerald-150 rounded-xl">
          <span className="text-[10px] font-mono font-extrabold text-emerald-900 block uppercase">Continuous Value</span>
          <p className="text-[10.5px] text-gray-600 leading-relaxed">
            Ensuring corporate carbon ledgers and regulatory papers remain grounded, audit-ready, and compliant with active GRI frameworks.
          </p>
        </div>

        <div className="space-y-2 p-4 bg-emerald-50/30 border border-emerald-150 rounded-xl">
          <span className="text-[10px] font-mono font-extrabold text-emerald-900 block uppercase">Rigorous Design</span>
          <p className="text-[10.5px] text-gray-600 leading-relaxed">
            Connecting operational bottlenecks directly with stable AI primitives such as parsers, summarizers, classifiers, and recommender loops.
          </p>
        </div>

        <div className="space-y-2 p-4 bg-emerald-50/30 border border-emerald-150 rounded-xl">
          <span className="text-[10px] font-mono font-extrabold text-emerald-900 block uppercase font-display">Academic Audit ready</span>
          <p className="text-[10.5px] text-gray-600 leading-relaxed">
            Designed as a high-density prototype, ideal for university theory presentations, boardroom pitches, or sustainability pilot planning.
          </p>
        </div>
      </div>
    </div>
  );
}
