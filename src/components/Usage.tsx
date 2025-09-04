import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAppData } from "@/contexts/AppDataContext";
import { useUsageData } from "@/contexts/UsageDataContext";
import { 
  Server, 
  Database, 
  Network, 
  HardDrive, 
  Cpu, 
  MemoryStick, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  Download,
  BarChart3,
  Zap,
  Clock
} from "lucide-react";

const Usage = () => {
  const { projects } = useAppData();
  const { usageData, updateUsageData } = useUsageData();

  const resourceMetrics = [
    { 
      name: 'CPU Usage', 
      value: 68, 
      max: 100, 
      unit: '%', 
      icon: Cpu, 
      status: 'warning',
      cost: '$142.50',
      trend: '+12%'
    },
    { 
      name: 'Memory', 
      value: 5.2, 
      max: 8, 
      unit: 'GB', 
      icon: MemoryStick, 
      status: 'good',
      cost: '$89.20',
      trend: '-5%'
    },
    { 
      name: 'Storage', 
      value: 245, 
      max: 500, 
      unit: 'GB', 
      icon: HardDrive, 
      status: 'good',
      cost: '$45.60',
      trend: '+8%'
    },
    { 
      name: 'Network', 
      value: 1.8, 
      max: 10, 
      unit: 'TB', 
      icon: Network, 
      status: 'good',
      cost: '$23.40',
      trend: '+15%'
    }
  ];

  const projectUsage = projects.map((project, index) => ({
    ...project,
    cpu: [42, 68, 35][index] || 45,
    memory: [2.1, 3.4, 1.8][index] || 2.0,
    storage: [45, 89, 67][index] || 50,
    cost: ['$89.20', '$156.80', '$76.40'][index] || '$50.00',
    requests: [1250, 2840, 950][index] || 1000,
    uptime: [99.98, 99.85, 97.23][index] || 99.0
  }));

  const totalCost = resourceMetrics.reduce((sum, metric) => 
    sum + parseFloat(metric.cost.replace('$', '')), 0
  );

  // Update the shared usage data whenever this component renders
  React.useEffect(() => {
    updateUsageData({
      resourceMetrics,
      projectUsage,
      totalCost,
      projectedCost: 425.80,
      potentialSavings: 89.20
    });
  }, [updateUsageData, totalCost]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-500';
      case 'warning': return 'text-yellow-500';
      case 'critical': return 'text-red-500';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBadge = (value: number, max: number) => {
    const percentage = (value / max) * 100;
    if (percentage > 80) return { variant: 'destructive' as const, text: 'High' };
    if (percentage > 60) return { variant: 'secondary' as const, text: 'Medium' };
    return { variant: 'default' as const, text: 'Low' };
  };

  return (
    <div className="h-full p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Resource Usage & Costs</h1>
          <p className="text-muted-foreground">Monitor your infrastructure usage and optimize costs</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Badge variant="outline" className="px-3 py-1">
            <Clock className="w-3 h-3 mr-1" />
            Updated 2 min ago
          </Badge>
        </div>
      </div>

      {/* Cost Overview */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-primary" />
            Monthly Cost Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">${totalCost.toFixed(2)}</div>
              <div className="text-sm text-muted-foreground">Total This Month</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-green-600">-12%</div>
              <div className="text-sm text-muted-foreground">vs Last Month</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold">$425.80</div>
              <div className="text-sm text-muted-foreground">Projected Month</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-blue-600">$89.20</div>
              <div className="text-sm text-muted-foreground">Potential Savings</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resource Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {resourceMetrics.map((metric) => {
          const Icon = metric.icon;
          const percentage = (metric.value / metric.max) * 100;
          const badge = getStatusBadge(metric.value, metric.max);
          
          return (
            <Card key={metric.name}>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    {metric.name}
                  </div>
                  <Badge variant={badge.variant} className="text-xs">
                    {badge.text}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">
                      {metric.value}{metric.unit}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      / {metric.max}{metric.unit}
                    </span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{metric.cost}/month</span>
                    <span className={`flex items-center gap-1 ${
                      metric.trend.startsWith('+') ? 'text-red-500' : 'text-green-500'
                    }`}>
                      {metric.trend.startsWith('+') ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      {metric.trend}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Project Usage Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Project Resource Usage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projectUsage.map((project) => (
              <div key={project.id} className="p-4 bg-accent/20 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <Server className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{project.name}</h3>
                      <p className="text-sm text-muted-foreground">{project.target} • {project.branch}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={project.status === 'active' ? 'default' : project.status === 'deploying' ? 'secondary' : 'destructive'}>
                      {project.status}
                    </Badge>
                    <span className="font-bold">{project.cost}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground mb-1">CPU</div>
                    <div className="font-medium">{project.cpu}%</div>
                    <Progress value={project.cpu} className="h-1" />
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">Memory</div>
                    <div className="font-medium">{project.memory}GB</div>
                    <Progress value={(project.memory / 4) * 100} className="h-1" />
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">Storage</div>
                    <div className="font-medium">{project.storage}GB</div>
                    <Progress value={(project.storage / 100) * 100} className="h-1" />
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">Requests/min</div>
                    <div className="font-medium">{project.requests}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">Uptime</div>
                    <div className={`font-medium ${project.uptime > 99 ? 'text-green-500' : project.uptime > 98 ? 'text-yellow-500' : 'text-red-500'}`}>
                      {project.uptime}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Optimization Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Cost Optimization Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <TrendingDown className="w-5 h-5 text-blue-500 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-blue-900 dark:text-blue-100">Scale down development environments</h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">Automatically shut down non-production instances during off-hours</p>
                <p className="text-sm font-medium text-blue-600 mt-1">Potential savings: $52/month</p>
              </div>
              <Button size="sm" variant="outline" className="border-blue-300">
                Apply
              </Button>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
              <Server className="w-5 h-5 text-green-500 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-green-900 dark:text-green-100">Use spot instances for batch workloads</h4>
                <p className="text-sm text-green-700 dark:text-green-300">Replace on-demand instances with spot instances for Worker Service</p>
                <p className="text-sm font-medium text-green-600 mt-1">Potential savings: $89/month</p>
              </div>
              <Button size="sm" variant="outline" className="border-green-300">
                Configure
              </Button>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-yellow-900 dark:text-yellow-100">Optimize storage usage</h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">Clean up old Docker images and logs older than 30 days</p>
                <p className="text-sm font-medium text-yellow-600 mt-1">Potential savings: $15/month</p>
              </div>
              <Button size="sm" variant="outline" className="border-yellow-300">
                Clean Up
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Usage;