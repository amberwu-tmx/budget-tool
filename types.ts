
export interface BudgetInputs {
  keywordTotalBudget: number;
  displayTotalBudget: number;
  totalDays: number;
  warmupDays: number;
  peakDays: number;
  afterDays: number;
  baseShare: number; // 平日常態占比 (0-100)
  boostShare: number; // 檔期加碼占比 (0-100)
  warmupBoostShare: number; // 預熱占比 (0-100)
  peakBoostShare: number; // 主檔占比 (0-100)
  afterBoostShare: number; // 返場占比 (0-100)
  displayActiveDays: number[]; // 選中的展示型投放天 (1-based index)
}

export interface CalculationResults {
  baseDailyKeyword: number;
  warmupDailyKeyword: number;
  peakDailyKeyword: number;
  afterDailyKeyword: number;
  displayDaily: number;
  dailyData: DayBudget[];
  summary: {
    keywordActual: number;
    displayActual: number;
    totalActual: number;
  };
}

export interface DayBudget {
  day: number;
  type: 'normal' | 'warmup' | 'peak' | 'after';
  keywordBase: number;
  keywordBoost: number;
  display: number;
  total: number;
}
