import { createContext, useContext, useState, ReactNode } from "react";

export interface UsageMetric {
  name: string;
  value: number;
  max: number;
  unit: string;
  status: string;
  cost: string;
  trend: string;
}

export interface ProjectUsage {
  id: string;
  name: string;
  target: string;
  branch: string;
  status: string;
  cpu: number;
  memory: number;
  storage: number;
  cost: string;
  requests: number;
  uptime: number;
}

interface UsageData {
  resourceMetrics: UsageMetric[];
  projectUsage: ProjectUsage[];
  totalCost: number;
  projectedCost: number;
  potentialSavings: number;
  lastUpdated: string;
}

interface UsageDataContextType {
  usageData: UsageData;
  updateUsageData: (data: Partial<UsageData>) => void;
}

const defaultUsageData: UsageData = {
  resourceMetrics: [
    { 
      name: 'CPU Usage', 
      value: 68, 
      max: 100, 
      unit: '%', 
      status: 'warning',
      cost: '$142.50',
      trend: '+12%'
    },
    { 
      name: 'Memory', 
      value: 5.2, 
      max: 8, 
      unit: 'GB', 
      status: 'good',
      cost: '$89.20',
      trend: '-5%'
    },
    { 
      name: 'Storage', 
      value: 245, 
      max: 500, 
      unit: 'GB', 
      status: 'good',
      cost: '$45.60',
      trend: '+8%'
    },
    { 
      name: 'Network', 
      value: 1.8, 
      max: 10, 
      unit: 'TB', 
      status: 'good',
      cost: '$23.40',
      trend: '+15%'
    }
  ],
  projectUsage: [],
  totalCost: 300.70,
  projectedCost: 425.80,
  potentialSavings: 89.20,
  lastUpdated: new Date().toISOString()
};

const UsageDataContext = createContext<UsageDataContextType | undefined>(undefined);

export const UsageDataProvider = ({ children }: { children: ReactNode }) => {
  const [usageData, setUsageData] = useState<UsageData>(defaultUsageData);

  const updateUsageData = (data: Partial<UsageData>) => {
    setUsageData(prev => ({
      ...prev,
      ...data,
      lastUpdated: new Date().toISOString()
    }));
  };

  return (
    <UsageDataContext.Provider value={{ usageData, updateUsageData }}>
      {children}
    </UsageDataContext.Provider>
  );
};

export const useUsageData = () => {
  const context = useContext(UsageDataContext);
  if (context === undefined) {
    throw new Error('useUsageData must be used within a UsageDataProvider');
  }
  return context;
};