
import React from 'react';
import { BudgetInputs } from '../types';

interface BudgetFormProps {
  inputs: BudgetInputs;
  setInputs: React.Dispatch<React.SetStateAction<BudgetInputs>>;
}

const BudgetForm: React.FC<BudgetFormProps> = ({ inputs, setInputs }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = parseFloat(value) || 0;
    setInputs(prev => ({ ...prev, [name]: numValue }));
  };

  const toggleDisplayDay = (day: number) => {
    setInputs(prev => {
      const active = [...prev.displayActiveDays];
      if (active.includes(day)) {
        return { ...prev, displayActiveDays: active.filter(d => d !== day) };
      } else {
        return { ...prev, displayActiveDays: [...active, day].sort((a, b) => a - b) };
      }
    });
  };

  const selectAllDisplayDays = () => {
    setInputs(prev => ({
      ...prev,
      displayActiveDays: Array.from({ length: prev.totalDays }, (_, i) => i + 1)
    }));
  };

  const clearAllDisplayDays = () => {
    setInputs(prev => ({ ...prev, displayActiveDays: [] }));
  };

  return (
    <div className="space-y-6">
      {/* Basic Settings */}
      <section className="space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">基礎預算與走期</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">關鍵字總預算</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
              <input 
                type="number" 
                name="keywordTotalBudget" 
                value={inputs.keywordTotalBudget} 
                onChange={handleChange}
                className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">展示型總預算</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
              <input 
                type="number" 
                name="displayTotalBudget" 
                value={inputs.displayTotalBudget} 
                onChange={handleChange}
                className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700">走期長度 (天)</label>
          <input 
            type="number" 
            name="totalDays" 
            value={inputs.totalDays} 
            onChange={handleChange}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>
      </section>

      {/* Campaign Period Settings */}
      <section className="space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">檔期天數設定</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-600 text-center block">預熱期</label>
            <input 
              type="number" 
              name="warmupDays" 
              value={inputs.warmupDays} 
              onChange={handleChange}
              className="w-full px-2 py-2 bg-orange-50 border border-orange-100 rounded-lg text-sm text-center focus:ring-2 focus:ring-orange-500 outline-none"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-600 text-center block">主檔期</label>
            <input 
              type="number" 
              name="peakDays" 
              value={inputs.peakDays} 
              onChange={handleChange}
              className="w-full px-2 py-2 bg-red-50 border border-red-100 rounded-lg text-sm text-center focus:ring-2 focus:ring-red-500 outline-none"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-600 text-center block">返場期</label>
            <input 
              type="number" 
              name="afterDays" 
              value={inputs.afterDays} 
              onChange={handleChange}
              className="w-full px-2 py-2 bg-purple-50 border border-purple-100 rounded-lg text-sm text-center focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>
        </div>
      </section>

      {/* Ratios Settings */}
      <section className="space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">預算分配占比 (%)</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-4">
            <label className="text-sm font-medium text-slate-700 shrink-0">平日常態底盤</label>
            <div className="flex items-center gap-2 grow max-w-[120px]">
              <input 
                type="number" 
                name="baseShare" 
                value={inputs.baseShare} 
                onChange={handleChange}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded text-sm text-right focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <span className="text-slate-400 text-sm">%</span>
            </div>
          </div>
          <div className="flex items-center justify-between gap-4">
            <label className="text-sm font-medium text-slate-700 shrink-0">檔期加碼總池</label>
            <div className="flex items-center gap-2 grow max-w-[120px]">
              <input 
                type="number" 
                name="boostShare" 
                value={inputs.boostShare} 
                onChange={handleChange}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded text-sm text-right focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <span className="text-slate-400 text-sm">%</span>
            </div>
          </div>
          <div className="pt-2 pl-4 border-l-2 border-slate-100 space-y-3">
            <div className="flex items-center justify-between gap-4">
              <label className="text-xs font-medium text-slate-500">預熱加碼占比</label>
              <div className="flex items-center gap-2 max-w-[100px]">
                <input 
                  type="number" 
                  name="warmupBoostShare" 
                  value={inputs.warmupBoostShare} 
                  onChange={handleChange}
                  className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs text-right outline-none"
                />
                <span className="text-slate-400 text-xs">%</span>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4">
              <label className="text-xs font-medium text-slate-500">主檔加碼占比</label>
              <div className="flex items-center gap-2 max-w-[100px]">
                <input 
                  type="number" 
                  name="peakBoostShare" 
                  value={inputs.peakBoostShare} 
                  onChange={handleChange}
                  className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs text-right outline-none"
                />
                <span className="text-slate-400 text-xs">%</span>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4">
              <label className="text-xs font-medium text-slate-500">返場加碼占比</label>
              <div className="flex items-center gap-2 max-w-[100px]">
                <input 
                  type="number" 
                  name="afterBoostShare" 
                  value={inputs.afterBoostShare} 
                  onChange={handleChange}
                  className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs text-right outline-none"
                />
                <span className="text-slate-400 text-xs">%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Display Ads Day Picker */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">展示型投放日期</h3>
          <div className="flex gap-2">
            <button 
              onClick={selectAllDisplayDays}
              className="text-[10px] bg-slate-200 hover:bg-slate-300 text-slate-600 px-2 py-0.5 rounded transition-colors"
            >
              全選
            </button>
            <button 
              onClick={clearAllDisplayDays}
              className="text-[10px] bg-slate-200 hover:bg-slate-300 text-slate-600 px-2 py-0.5 rounded transition-colors"
            >
              全除
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: inputs.totalDays }, (_, i) => i + 1).map(day => (
            <button
              key={day}
              onClick={() => toggleDisplayDay(day)}
              className={`text-[10px] py-2 rounded-md transition-all font-medium ${
                inputs.displayActiveDays.includes(day) 
                ? 'bg-blue-600 text-white shadow-sm ring-1 ring-blue-700' 
                : 'bg-slate-50 text-slate-400 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BudgetForm;
