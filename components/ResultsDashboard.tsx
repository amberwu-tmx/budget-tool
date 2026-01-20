
import React from 'react';
import { BudgetInputs, CalculationResults } from '../types';
// Added Info to the import list
import { ArrowDownToLine, Zap, Flame, RotateCcw, Monitor, Info } from 'lucide-react';

interface ResultsDashboardProps {
  inputs: BudgetInputs;
  results: CalculationResults;
}

const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ inputs, results }) => {
  const formatCurrency = (val: number) => {
    return val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const periodCards = [
    {
      label: '平日常態日底盤',
      amount: results.baseDailyKeyword,
      displayAmount: results.displayDaily, // Note: only if active
      icon: <ArrowDownToLine className="w-5 h-5 text-blue-500" />,
      color: 'blue',
      description: '每天穩定跑的基礎投放'
    },
    {
      label: '預熱期日預算',
      amount: results.baseDailyKeyword + results.warmupDailyKeyword,
      displayAmount: results.displayDaily,
      icon: <Zap className="w-5 h-5 text-orange-500" />,
      color: 'orange',
      description: `持續 ${inputs.warmupDays} 天的加碼拉升`
    },
    {
      label: '主檔期日預算',
      amount: results.baseDailyKeyword + results.peakDailyKeyword,
      displayAmount: results.displayDaily,
      icon: <Flame className="w-5 h-5 text-red-500" />,
      color: 'red',
      description: `當月爆發高峰 (${inputs.peakDays} 天)`
    },
    {
      label: '返場期日預算',
      amount: results.baseDailyKeyword + results.afterDailyKeyword,
      displayAmount: results.displayDaily,
      icon: <RotateCcw className="w-5 h-5 text-purple-500" />,
      color: 'purple',
      description: `剩餘熱度的導流與收尾`
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {periodCards.map((card, idx) => (
          <div key={idx} className={`bg-white p-5 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden group`}>
             {/* Decorator background */}
             <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 opacity-5 rounded-full bg-${card.color}-500 group-hover:scale-110 transition-transform`} />
             
             <div className="flex items-start gap-3 mb-4">
               <div className={`p-2 rounded-lg bg-${card.color}-50`}>
                 {card.icon}
               </div>
               <div>
                 <h4 className="font-bold text-slate-800 text-sm">{card.label}</h4>
                 <p className="text-xs text-slate-400">{card.description}</p>
               </div>
             </div>

             <div className="space-y-3">
               <div className="flex justify-between items-end">
                 <span className="text-xs text-slate-500 font-medium">關鍵字/成效</span>
                 <span className="text-xl font-black text-slate-900">${formatCurrency(card.amount)}</span>
               </div>
               <div className="flex justify-between items-end pb-1">
                 <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                   <Monitor className="w-3.5 h-3.5" />
                   展示型均分
                 </div>
                 <span className="text-md font-bold text-blue-600">${formatCurrency(card.displayAmount)}</span>
               </div>
               <div className="pt-2 border-t border-slate-100 flex justify-between items-center">
                 <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">合計(日)參考</span>
                 <span className="text-lg font-black text-slate-800">${formatCurrency(card.amount + card.displayAmount)}</span>
               </div>
             </div>
          </div>
        ))}
      </div>

      {/* Logic Summary */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
         <h4 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
           <Info className="w-4 h-4 text-blue-500" />
           預算計算邏輯摘要
         </h4>
         <div className="space-y-4 text-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
               <div className="space-y-2">
                 <p className="text-slate-500 font-medium flex justify-between">關鍵字/成效常態底盤: <span className="text-slate-900">${results.baseDailyKeyword.toFixed(0)} / 天</span></p>
                 <p className="text-slate-500 font-medium flex justify-between">檔期加碼總池: <span className="text-slate-900">${(inputs.keywordTotalBudget * inputs.boostShare / 100).toLocaleString()}</span></p>
               </div>
               <div className="space-y-2">
                 <p className="text-slate-500 font-medium flex justify-between">展示型投放天數: <span className="text-slate-900">{inputs.displayActiveDays.length} 天</span></p>
                 <p className="text-slate-500 font-medium flex justify-between">展示型每日平均: <span className="text-blue-600 font-bold">${results.displayDaily.toFixed(0)} / 天</span></p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ResultsDashboard;
