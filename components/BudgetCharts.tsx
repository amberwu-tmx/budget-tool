
import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { DayBudget } from '../types';

interface BudgetChartsProps {
  dailyData: DayBudget[];
}

const BudgetCharts: React.FC<BudgetChartsProps> = ({ dailyData }) => {
  const chartData = dailyData.map(d => ({
    name: `D${d.day}`,
    keywordBase: Math.round(d.keywordBase),
    keywordBoost: Math.round(d.keywordBoost),
    display: Math.round(d.display),
    total: Math.round(d.total)
  }));

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorBase" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorBoost" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorDisplay" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fill: '#94a3b8' }} 
            interval={Math.floor(dailyData.length / 10)}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fill: '#94a3b8' }} 
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip 
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            formatter={(value: any) => [`$${value.toLocaleString()}`, '']}
          />
          <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '12px', fontWeight: 500 }} />
          <Area 
            type="monotone" 
            dataKey="keywordBase" 
            stackId="1" 
            stroke="#3b82f6" 
            fillOpacity={1} 
            fill="url(#colorBase)" 
            name="關鍵字常態底盤" 
          />
          <Area 
            type="monotone" 
            dataKey="keywordBoost" 
            stackId="1" 
            stroke="#f97316" 
            fillOpacity={1} 
            fill="url(#colorBoost)" 
            name="關鍵字檔期加碼" 
          />
          <Area 
            type="monotone" 
            dataKey="display" 
            stackId="1" 
            stroke="#1d4ed8" 
            fillOpacity={1} 
            fill="url(#colorDisplay)" 
            name="展示型廣告" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BudgetCharts;
