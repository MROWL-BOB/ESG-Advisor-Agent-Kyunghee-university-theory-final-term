import React, { useState, useEffect } from "react";
import { Sparkles, HelpCircle, Flame, Zap, ShieldAlert, Users, Landmark, Scale, BarChart3, CloudSnow } from "lucide-react";

interface ScopeCarbonTrackerProps {
  onMetricsUpdate: (carbonTons: number, diversityPercent: number, boardIndependencePercent: number) => void;
  initialCarbon?: number;
  initialDiversity?: number;
  initialBoard?: number;
}

export default function ScopeCarbonTracker({
  onMetricsUpdate,
  initialCarbon = 15.4,
  initialDiversity = 33,
  initialBoard = 40,
}: ScopeCarbonTrackerProps) {
  // Environmental States
  const [gasolineLiters, setGasolineLiters] = useState(1200);   // Scope 1: Fleet gasoline
  const [naturalGasKwh, setNaturalGasKwh] = useState(4500);     // Scope 1: Heating natural gas
  const [electricityKwh, setElectricityKwh] = useState(8500);   // Scope 2: Standard grid electricity
  const [wasteKilos, setWasteKilos] = useState(600);            // Scope 3: Waste generated
  const [supplierMiles, setSupplierMiles] = useState(15000);    // Scope 3: Supply chain logistics transport miles
  const [energyRenewablePercent, setEnergyRenewablePercent] = useState(10); // Percentage of renewable offset grid

  // Social States
  const [femaleLeadershipCount, setFemaleLeadershipCount] = useState(3);
  const [totalLeadershipCount, setTotalLeadershipCount] = useState(8);
  const [underrepresentedStaffPercent, setUnderrepresentedStaffPercent] = useState(25);
  const [totalWorkforceHours, setTotalWorkforceHours] = useState(16000);
  const [lostTimeInjuryDays, setLostTimeInjuryDays] = useState(1);
  const [payGapRatio, setPayGapRatio] = useState(12); // e.g. 12% discrepancy

  // Governance States
  const [boardIndependentMembers, setBoardIndependentMembers] = useState(2);
  const [boardTotalMembers, setBoardTotalMembers] = useState(5);
  const [antiCorruptionTrainedPercent, setAntiCorruptionTrainedPercent] = useState(60);
  const [conflictDisclosureDone, setConflictDisclosureDone] = useState(true);

  // Carbon Emission Factors (CO2 kg equivalent standard conversions)
  // Gasoline standard: ~2.3 kg CO2e per Liter
  // Natural Gas: ~0.18 kg CO2e per kWh
  // Grid electricity standard: ~0.38 kg CO2e per kWh (subject to local grids, offset by renewable %)
  // Waste standard: ~0.50 kg CO2e per kg
  // Logistics standard transport (average freight): ~0.08 kg CO2e per Ton-Mile

  const [scope1, setScope1] = useState(0);
  const [scope2, setScope2] = useState(0);
  const [scope3, setScope3] = useState(0);
  const [totalCarbonCO2e, setTotalCarbonCO2e] = useState(0);
  const [calculatedDiversity, setCalculatedDiversity] = useState(0);
  const [calculatedBoardIndependent, setCalculatedBoardIndependent] = useState(0);

  // Compute metrics in real-time
  useEffect(() => {
    // Calcul Carbon Scopes
    const calcScope1 = ((gasolineLiters * 2.3) + (naturalGasKwh * 0.18)) / 1000; // in metric tons CO2e
    const baseElectricityCO2 = (electricityKwh * 0.38);
    const renewableOffset = baseElectricityCO2 * (energyRenewablePercent / 100);
    const calcScope2 = (baseElectricityCO2 - renewableOffset) / 1000; // in metric tons CO2e
    const calcScope3 = ((wasteKilos * 0.5) + (supplierMiles * 0.08)) / 1000; // in metric tons CO2e

    const totalCO2 = parseFloat((calcScope1 + calcScope2 + calcScope3).toFixed(2));
    
    setScope1(parseFloat(calcScope1.toFixed(2)));
    setScope2(parseFloat(calcScope2.toFixed(2)));
    setScope3(parseFloat(calcScope3.toFixed(2)));
    setTotalCarbonCO2e(totalCO2);

    // Calcul Social Metrics
    const divRatio = totalLeadershipCount > 0 
      ? Math.round((femaleLeadershipCount / totalLeadershipCount) * 100) 
      : 0;
    setCalculatedDiversity(divRatio);

    // Calcul Gov Metrics
    const govRatio = boardTotalMembers > 0
      ? Math.round((boardIndependentMembers / boardTotalMembers) * 100)
      : 0;
    setCalculatedBoardIndependent(govRatio);

    // Bubble up key KPIs for main dashboard scores or history points
    onMetricsUpdate(totalCO2, divRatio, govRatio);
  }, [
    gasolineLiters,
    naturalGasKwh,
    electricityKwh,
    wasteKilos,
    supplierMiles,
    energyRenewablePercent,
    femaleLeadershipCount,
    totalLeadershipCount,
    boardIndependentMembers,
    boardTotalMembers,
  ]);

  return (
    <div className="space-y-6" id="esg-carbon-resource-tracker">
      {/* Intro Header */}
      <div className="bg-emerald-950 text-white rounded-2xl p-6 border border-emerald-900/50">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-900/60 text-emerald-250 border border-emerald-800">
          <BarChart3 className="w-3.5 h-3.5" /> Core Quantitative Indicators
        </span>
        <h2 className="text-xl md:text-2xl font-bold tracking-tight mt-2">Emission Tracker & Continuous ESG KPIs</h2>
        <p className="text-emerald-150 text-xs md:text-sm mt-1 max-w-2xl">
          Track auditable Scope 1, 2, and 3 carbon equivalents, alongside workplace diversity indicators, and board independence, in order to continuously gauge sustainability progression.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Pilar E Calculator */}
        <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-800">
              <CloudSnow className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-sm">Environmental Footprint</h3>
              <span className="text-[10px] text-gray-400 font-bold block uppercase">Scopes 1, 2 & 3 Carbon Calculator</span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                <span className="flex items-center gap-1"><Flame className="w-3.5 h-3.5 text-orange-500" /> Scope 1: Gasoline (Liters)</span>
                <span>{gasolineLiters} L</span>
              </div>
              <input
                type="range"
                min="0"
                max="10000"
                step="100"
                className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-emerald-800"
                value={gasolineLiters}
                onChange={(e) => setGasolineLiters(parseInt(e.target.value))}
              />
              <span className="text-[10px] text-gray-400">Direct combustion by organization-owned fleets or generators.</span>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                <span className="flex items-center gap-1"><Flame className="w-3.5 h-3.5 text-orange-500" /> Scope 1: Natural Gas (kWh)</span>
                <span>{naturalGasKwh} kWh</span>
              </div>
              <input
                type="range"
                min="0"
                max="50000"
                step="500"
                className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-emerald-800"
                value={naturalGasKwh}
                onChange={(e) => setNaturalGasKwh(parseInt(e.target.value))}
              />
              <span className="text-[10px] text-gray-400">Natural gas heating energy logs.</span>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-amber-500" /> Scope 2: Grid Electricity (kWh)</span>
                <span>{electricityKwh} kWh</span>
              </div>
              <input
                type="range"
                min="0"
                max="50000"
                step="500"
                className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-emerald-800"
                value={electricityKwh}
                onChange={(e) => setElectricityKwh(parseInt(e.target.value))}
              />
              <span className="text-[10px] text-gray-400">Indirect electricity consumed from grid.</span>
            </div>

            <div className="p-3 bg-emerald-50/50 border border-emerald-100 rounded-xl space-y-1">
              <div className="flex justify-between text-[11px] font-bold text-emerald-900 mb-1">
                <span>Renewable Mix / Green Tariffs Offset</span>
                <span>{energyRenewablePercent}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                className="w-full h-1 bg-emerald-200 rounded-lg appearance-none cursor-pointer accent-emerald-950"
                value={energyRenewablePercent}
                onChange={(e) => setEnergyRenewablePercent(parseInt(e.target.value))}
              />
              <span className="text-[9px] text-emerald-800">Reduces computed Scope 2 carbon density.</span>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                <span>Scope 3: Waste Generated (kg)</span>
                <span>{wasteKilos} kg</span>
              </div>
              <input
                type="range"
                min="0"
                max="10000"
                step="100"
                className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-emerald-800"
                value={wasteKilos}
                onChange={(e) => setWasteKilos(parseInt(e.target.value))}
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                <span>Scope 3: Sourcing Logistics (Miles)</span>
                <span>{supplierMiles} mi</span>
              </div>
              <input
                type="range"
                min="0"
                max="100000"
                step="1000"
                className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-emerald-800"
                value={supplierMiles}
                onChange={(e) => setSupplierMiles(parseInt(e.target.value))}
              />
              <span className="text-[10px] text-gray-400">Transport and supplier distance factors.</span>
            </div>
          </div>
        </div>

        {/* Pilar S Calculator */}
        <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
            <div className="p-2 bg-indigo-50 rounded-lg text-indigo-800">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-sm">Workplace Social Indicators</h3>
              <span className="text-[10px] text-gray-400 font-bold block uppercase">Diversity & Work Safety metrics</span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <span className="block text-xs font-bold text-gray-700 mb-1">Leadership Gender Balance</span>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="female-leaders" className="block text-[10px] text-gray-400">Female Managers</label>
                  <input
                    id="female-leaders"
                    type="number"
                    min="0"
                    max="50"
                    className="w-full text-xs px-2 py-1.5 border border-gray-200 rounded-md bg-gray-50 text-gray-800"
                    value={femaleLeadershipCount}
                    onChange={(e) => setFemaleLeadershipCount(Math.max(0, parseInt(e.target.value) || 0))}
                  />
                </div>
                <div>
                  <label htmlFor="total-leaders" className="block text-[10px] text-gray-400">Total Advisory Staff</label>
                  <input
                    id="total-leaders"
                    type="number"
                    min="1"
                    max="100"
                    className="w-full text-xs px-2 py-1.5 border border-gray-200 rounded-md bg-gray-50 text-gray-800"
                    value={totalLeadershipCount}
                    onChange={(e) => setTotalLeadershipCount(Math.max(1, parseInt(e.target.value) || 1))}
                  />
                </div>
              </div>
              <span className="text-[10px] text-gray-400 mt-1 block">
                Calculated Leadership Diversity: <span className="font-bold text-indigo-800">{calculatedDiversity}%</span>
              </span>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                <span>Minority or Underrepresented Staff</span>
                <span>{underrepresentedStaffPercent}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-indigo-800"
                value={underrepresentedStaffPercent}
                onChange={(e) => setUnderrepresentedStaffPercent(parseInt(e.target.value))}
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                <span>Workplace Adjusted Gender Pay Gap</span>
                <span className="text-amber-700 font-bold">{payGapRatio}% gap</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                step="1"
                className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-indigo-800"
                value={payGapRatio}
                onChange={(e) => setPayGapRatio(parseInt(e.target.value))}
              />
              <span className="text-[10px] text-gray-400">Discrepancy target should be below 5% for top certifications.</span>
            </div>

            <div className="border border-indigo-100 bg-indigo-50/10 rounded-xl p-4 space-y-3">
              <span className="text-xs font-bold text-indigo-900 block border-b border-indigo-100/50 pb-1">Safety & Incidents</span>
              <div className="flex justify-between items-center text-xs">
                <label htmlFor="injury-days" className="text-gray-600 font-medium">Lost Time Due to Injury (Days)</label>
                <input
                  id="injury-days"
                  type="number"
                  min="0"
                  className="w-16 text-xs text-center border border-indigo-200 bg-white rounded"
                  value={lostTimeInjuryDays}
                  onChange={(e) => setLostTimeInjuryDays(Math.max(0, parseInt(e.target.value) || 0))}
                />
              </div>
              <span className="text-[10px] text-gray-400 block">The ultimate target remains 0 injury days.</span>
            </div>
          </div>
        </div>

        {/* Pilar G Calculator */}
        <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
            <div className="p-2 bg-amber-50 rounded-lg text-amber-800">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-sm">Governance & Compliance</h3>
              <span className="text-[10px] text-gray-400 font-bold block uppercase">Integrity Indices</span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <span className="block text-xs font-bold text-gray-700 mb-1">Independent Governing Members</span>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="independent-board" className="block text-[10px] text-gray-400">Independent Seats</label>
                  <input
                    id="independent-board"
                    type="number"
                    min="0"
                    className="w-full text-xs px-2 py-1.5 border border-gray-200 rounded-md bg-gray-50 text-gray-800"
                    value={boardIndependentMembers}
                    onChange={(e) => setBoardIndependentMembers(Math.max(0, parseInt(e.target.value) || 0))}
                  />
                </div>
                <div>
                  <label htmlFor="total-board" className="block text-[10px] text-gray-400">Total board seats</label>
                  <input
                    id="total-board"
                    type="number"
                    min="1"
                    className="w-full text-xs px-2 py-1.5 border border-gray-200 rounded-md bg-gray-50 text-gray-800"
                    value={boardTotalMembers}
                    onChange={(e) => setBoardTotalMembers(Math.max(1, parseInt(e.target.value) || 1))}
                  />
                </div>
              </div>
              <span className="text-[10px] text-gray-400 mt-1 block">
                Executive Independence ratio: <span className="font-bold text-amber-700">{calculatedBoardIndependent}%</span>
              </span>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                <span>Anti-Corruption Training Rate</span>
                <span>{antiCorruptionTrainedPercent}% of staff</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-amber-500"
                value={antiCorruptionTrainedPercent}
                onChange={(e) => setAntiCorruptionTrainedPercent(parseInt(e.target.value))}
              />
            </div>

            <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-3">
              <span className="text-xs font-bold text-gray-700 block border-b border-gray-200/50 pb-1">Integrity Auditing Flags</span>
              
              <label className="flex items-center gap-2 text-xs font-medium text-gray-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-emerald-850 rounded border-gray-300"
                  checked={conflictDisclosureDone}
                  onChange={(e) => setConflictDisclosureDone(e.target.checked)}
                />
                <span>Active Board Conflict of Interest Policy</span>
              </label>

              <div className="text-[10px] text-gray-400 leading-normal">
                Disclosing major shareholder and advisory board conflicts prevents corruption and SEC or local regulatory compliance fines.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Aggregated Quick Report Canvas */}
      <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block">Continuous Emissions Analysis</span>
            <h3 className="text-lg font-bold">Total Estimated Audited Footprint</h3>
            <p className="text-xs text-slate-400 max-w-xl">
              Calculations based on international Greenhouse Gas (GHG) Protocol guidelines under Scope 1 (Utilities & Fleets), Scope 2 (Grid Electricity), and Scope 3 (Waste & supply chain logistics).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <div className="text-center bg-slate-800/50 border border-slate-700 rounded-xl p-4 min-w-[130px]">
              <span className="block text-[9px] uppercase font-bold text-slate-400">Scope 1 (Direct)</span>
              <span className="block text-xl font-bold text-emerald-300 mt-1">{scope1} <span className="text-[10px] text-slate-400">tCO2e</span></span>
            </div>
            <div className="text-center bg-slate-800/50 border border-slate-700 rounded-xl p-4 min-w-[130px]">
              <span className="block text-[9px] uppercase font-bold text-slate-400">Scope 2 (Indirect)</span>
              <span className="block text-xl font-bold text-emerald-300 mt-1">{scope2} <span className="text-[10px] text-slate-400">tCO2e</span></span>
            </div>
            <div className="text-center bg-slate-800/50 border border-slate-700 rounded-xl p-4 min-w-[130px]">
              <span className="block text-[9px] uppercase font-bold text-slate-400">Scope 3 (Supply Chain)</span>
              <span className="block text-xl font-bold text-indigo-300 mt-1">{scope3} <span className="text-[10px] text-slate-400">tCO2e</span></span>
            </div>

            <div className="text-center bg-emerald-950 border border-emerald-800 rounded-xl p-4 min-w-[160px] shadow-emerald-950/45 shadow-lg">
              <span className="block text-[10px] uppercase font-bold text-emerald-400">Total Net Footprint</span>
              <span className="block text-2xl font-black text-emerald-300 mt-1">{totalCarbonCO2e} <span className="text-xs text-emerald-100">tCO2e / yr</span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
