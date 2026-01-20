
import React from 'react';
import { DayBudget } from '../types';

interface DailyTableProps {
  dailyData: DayBudget[];
}

const DailyTable: React.FC<DailyTableProps> = ({ dailyData }) => {
  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'warmup': return <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded text-[10px] font-bold">預熱</span>;
      case 'peak': return <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded text-[10px] font-bold">主檔</span>;
      case 'after': return <span className="bg-purple-100 text-purple-600 px-2 py-0.5 rounded text-[10px] font-bold">返場</span>;
      default: return <span className="bg-slate-100 text-slate-400 px-2 py-0.5 rounded text-[10px] font-bold">一般</span>;
    }
  };

  const format = (v: number) => v.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  return (
    <table className="min-w-full divide-y divide-slate-200">
      <thead className="bg-slate-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">天數</th>
          <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">時段</th>
          <th className="px-6 py-3 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">關鍵字常態</th>
          <th className="px-6 py-3 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">檔期加碼</th>
          <th className="px-6 py-3 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">展示型</th>
          <th className="px-6 py-3 text-right text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-100/50">當日合計</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-slate-100">
        {dailyData.map((day) => (
          <tr key={day.day} className={`hover:bg-slate-50 transition-colors ${day.type !== 'normal' ? 'bg-slate-50/30' : ''}`}>
            <td className="px-6 py-3 whitespace-nowrap text-sm text-slate-500 font-medium">Day {day.day}</td>
            <td className="px-6 py-3 whitespace-nowrap">{getTypeBadge(day.type)}</td>
            <td className="px-6 py-3 whitespace-nowrap text-right text-sm text-slate-600">${format(day.keywordBase)}</td>
            <td className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium text-orange-600">
              {day.keywordBoost > 0 ? `+$${format(day.keywordBoost)}` : '-'}
            </td>
            <td className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium text-blue-600">
              {day.display > 0 ? `$${format(day.display)}` : '-'}
            </td>
            <td className="px-6 py-3 whitespace-nowrap text-right text-sm font-black text-slate-900 bg-slate-50/20">${format(day.total)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DailyTable;
