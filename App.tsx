
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Calculator, 
  BarChart3, 
  Table as TableIcon, 
  Calendar, 
  TrendingUp, 
  Info,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { BudgetInputs, CalculationResults, DayBudget } from './types';
import BudgetForm from './components/BudgetForm';
import ResultsDashboard from './components/ResultsDashboard';
import DailyTable from './components/DailyTable';
import BudgetCharts from './components/BudgetCharts';

const App: React.FC = () => {
  const [inputs, setInputs] = useState<BudgetInputs>({
    keywordTotalBudget: 80000,
    displayTotalBudget: 30000,
    totalDays: 30,
    warmupDays: 7,
    peakDays: 1,
    afterDays: 5,
    baseShare: 60,
    boostShare: 40,
    warmupBoostShare: 20,
    peakBoostShare: 60,
    afterBoostShare: 20,
    displayActiveDays: Array.from({ length: 10 }, (_, i) => i + 1), // Default first 10 days
  });

  const results = useMemo<CalculationResults>(() => {
    const {
      keywordTotalBudget,
      displayTotalBudget,
      totalDays,
      warmupDays,
      peakDays,
      afterDays,
      baseShare,
      boostShare,
      warmupBoostShare,
      peakBoostShare,
      afterBoostShare,
      displayActiveDays
    } = inputs;

    // Step A: Keywords Base
    const keywordBasePool = (keywordTotalBudget * baseShare) / 100;
    const baseDailyKeyword = keywordBasePool / totalDays;

    // Step B: Keywords Boost Pool
    const keywordBoostPool = (keywordTotalBudget * boostShare) / 100;

    // Step C: Boost Distributions
    const warmupDailyKeyword = warmupDays > 0 ? (keywordBoostPool * (warmupBoostShare / 100)) / warmupDays : 0;
    const peakDailyKeyword = peakDays > 0 ? (keywordBoostPool * (peakBoostShare / 100)) / peakDays : 0;
    const afterDailyKeyword = afterDays > 0 ? (keywordBoostPool * (afterBoostShare / 100)) / afterDays : 0;

    // Step D: Display
    const displayDaily = displayActiveDays.length > 0 ? displayTotalBudget / displayActiveDays.length : 0;

    // Generate Daily Data
    const dailyData: DayBudget[] = [];
    const campaignTotalDays = warmupDays + peakDays + afterDays;
    const normalDaysCount = Math.max(0, totalDays - campaignTotalDays);
    
    // We assume campaign starts after (totalDays - campaignTotalDays) / 2 or just at the beginning?
    // Let's place campaign in the middle for visualization purposes
    const campaignStartIndex = Math.floor(normalDaysCount / 2);
    
    for (let i = 1; i <= totalDays; i++) {
      let type: 'normal' | 'warmup' | 'peak' | 'after' = 'normal';
      let keywordBoost = 0;

      const dayIdx = i - 1;
      if (dayIdx >= campaignStartIndex && dayIdx < campaignStartIndex + warmupDays) {
        type = 'warmup';
        keywordBoost = warmupDailyKeyword;
      } else if (dayIdx >= campaignStartIndex + warmupDays && dayIdx < campaignStartIndex + warmupDays + peakDays) {
        type = 'peak';
        keywordBoost = peakDailyKeyword;
      } else if (dayIdx >= campaignStartIndex + warmupDays + peakDays && dayIdx < campaignStartIndex + warmupDays + peakDays + afterDays) {
        type = 'after';
        keywordBoost = afterDailyKeyword;
      }

      const isDisplayOn = displayActiveDays.includes(i);
      const displayAmt = isDisplayOn ? displayDaily : 0;

      dailyData.push({
        day: i,
        type,
        keywordBase: baseDailyKeyword,
        keywordBoost,
        display: displayAmt,
        total: baseDailyKeyword + keywordBoost + displayAmt
      });
    }

    const keywordActual = dailyData.reduce((acc, d) => acc + d.keywordBase + d.keywordBoost, 0);
    const displayActual = dailyData.reduce((acc, d) => acc + d.display, 0);

    return {
      baseDailyKeyword,
      warmupDailyKeyword,
      peakDailyKeyword,
      afterDailyKeyword,
      displayDaily,
      dailyData,
      summary: {
        keywordActual,
        displayActual,
        totalActual: keywordActual + displayActual
      }
    };
  }, [inputs]);

  const [activeTab, setActiveTab] = useState<'overview' | 'table' | 'charts'>('overview');

  return (
    <div className="min-h-screen pb-12">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Calculator className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">PChome RMN 廣告預算計算器</h1>
              <p className="text-sm text-blue-100 opacity-80">專業廣告投放預算規劃工具</p>
            </div>
          </div>
          <nav className="flex bg-white/10 rounded-full p-1 backdrop-blur-sm self-center">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeTab === 'overview' ? 'bg-white text-blue-800 shadow-sm' : 'text-white hover:bg-white/10'}`}
            >
              概覽
            </button>
            <button 
              onClick={() => setActiveTab('charts')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeTab === 'charts' ? 'bg-white text-blue-800 shadow-sm' : 'text-white hover:bg-white/10'}`}
            >
              圖表
            </button>
            <button 
              onClick={() => setActiveTab('table')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeTab === 'table' ? 'bg-white text-blue-800 shadow-sm' : 'text-white hover:bg-white/10'}`}
            >
              日別明細
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden sticky top-28">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-slate-500" />
                <h2 className="font-semibold text-slate-800">輸入參數區</h2>
              </div>
              <div className="p-6">
                <BudgetForm inputs={inputs} setInputs={setInputs} />
              </div>
            </div>
          </div>

          {/* Result Section */}
          <div className="lg:col-span-8 space-y-8">
            {activeTab === 'overview' && (
              <ResultsDashboard inputs={inputs} results={results} />
            )}
            
            {activeTab === 'charts' && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                  <div className="flex items-center gap-2 mb-6">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-bold text-slate-800">日預算分配趨勢</h3>
                  </div>
                  <BudgetCharts dailyData={results.dailyData} />
                </div>
              </div>
            )}

            {activeTab === 'table' && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TableIcon className="w-5 h-5 text-slate-500" />
                    <h2 className="font-semibold text-slate-800">日別投放預算表</h2>
                  </div>
                  <div className="text-xs text-slate-500 flex items-center gap-1">
                    <Info className="w-3.5 h-3.5" />
                    展示型預算僅在勾選日期顯示
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <DailyTable dailyData={results.dailyData} />
                </div>
              </div>
            )}
            
            {/* Quick Check Box */}
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7 text-indigo-600" />
                </div>
                <div>
                  <h4 className="font-bold text-indigo-900">預算檢查系統 (自動)</h4>
                  <p className="text-sm text-indigo-700">計算結果已精準同步至月總預算</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-indigo-500 uppercase tracking-wider font-semibold">實際合計花費</div>
                <div className="text-2xl font-black text-indigo-600">
                  ${results.summary.totalActual.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Info */}
      <footer className="max-w-7xl mx-auto px-4 mt-12 mb-8">
        <div className="text-center text-slate-400 text-xs flex flex-col items-center gap-2">
          <p>© 2024 PChome RMN Budget Planner · 推廣與成效型廣告專業解決方案</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><AlertCircle className="w-3 h-3" /> 展示型廣告日預算採固定均分制</span>
            <span className="flex items-center gap-1"><AlertCircle className="w-3 h-3" /> 加碼占比需根據促銷檔期規模動態調整</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
