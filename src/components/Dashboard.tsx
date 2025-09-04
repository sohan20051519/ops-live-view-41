import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useAppData } from "@/contexts/AppDataContext";
import { useUsageData } from "@/contexts/UsageDataContext";
import { 
  Activity,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  Zap,
  Server,
  Users,
  Cloud,
  Container,
  GitBranch,
  Layers
} from "lucide-react";

const Dashboard = () => {
  const { projects, activities } = useAppData();
  const { usageData } = useUsageData();

  // Calculate real stats from data
  const totalDeployments = activities.filter(a => a.type === 'deployment').length;
  const failedDeployments = activities.filter(a => a.type === 'deployment' && a.status === 'failed').length;
  const successfulDeployments = totalDeployments - failedDeployments;
  const successRate = totalDeployments > 0 ? ((successfulDeployments / totalDeployments) * 100).toFixed(1) : "100.0";
  const activeProjects = projects.filter(p => p.status === 'active').length;
  
  const stats = [
    {
      title: "Total Projects",
      value: projects.length.toString(),
      change: `${activeProjects} active`,
      trend: "up",
      icon: Server,
      color: "text-primary"
    },
    {
      title: "Failed Jobs",
      value: failedDeployments.toString(),
      change: projects.filter(p => p.status === 'failed').length > 0 ? "Review needed" : "All good",
      trend: failedDeployments > 0 ? "up" : "down",
      icon: AlertTriangle,
      color: "text-destructive"
    },
    {
      title: "Success Rate",
      value: `${successRate}%`,
      change: `${successfulDeployments}/${totalDeployments}`,
      trend: "up",
      icon: CheckCircle,
      color: "text-success"
    },
    {
      title: "Monthly Cost",
      value: usageData ? `$${usageData.totalCost?.toFixed(0) || '0'}` : "$0",
      change: usageData ? `$${usageData.potentialSavings?.toFixed(0) || '0'} savings` : "N/A",
      trend: "down",
      icon: Clock,
      color: "text-warning"
    },
    {
      title: "Deployments",
      value: totalDeployments.toString(),
      change: activities.filter(a => a.status === 'success').length + " successful",
      trend: "up",
      icon: Users,
      color: "text-primary"
    }
  ];

  const deploymentData = [
    { name: 'Mon', total: 12, success: 11 },
    { name: 'Tue', total: 16, success: 15 },
    { name: 'Wed', total: 18, success: 16 },
    { name: 'Thu', total: 22, success: 20 },
    { name: 'Fri', total: 28, success: 26 },
    { name: 'Sat', total: 24, success: 22 },
    { name: 'Sun', total: 20, success: 19 },
  ];

  const serviceHealthData = [
    { name: 'Healthy', value: 87, color: 'hsl(var(--success))' },
    { name: 'Warning', value: 8, color: 'hsl(var(--warning))' },
    { name: 'Critical', value: 3, color: 'hsl(var(--destructive))' },
    { name: 'Unknown', value: 2, color: 'hsl(var(--muted-foreground))' }
  ];

  const infrastructureStats = [
    {
      name: "AWS",
      subtitle: "Infrastructure",
      icon: Cloud,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
      metrics: [
        { label: "Instances", value: "12" },
        { label: "Cost", value: "$2,170" }
      ]
    },
    {
      name: "Docker",
      subtitle: "Containers",
      icon: Container,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      metrics: [
        { label: "Running", value: "18" },
        { label: "Images", value: "42" }
      ]
    },
    {
      name: "K8s", 
      subtitle: "Orchestration",
      icon: Layers,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      metrics: [
        { label: "Pods", value: "47" },
        { label: "Nodes", value: "6/6" }
      ]
    },
    {
      name: "GitHub",
      subtitle: "Source Control",
      icon: GitBranch,
      color: "text-gray-700",
      bgColor: "bg-gray-50",
      metrics: [
        { label: "Last Commit", value: "2h ago" },
        { label: "Status", value: "Passing", status: "success" }
      ]
    }
  ];

  // Use real deployment activities
  const recentDeployments = activities
    .filter(activity => activity.type === 'deployment')
    .slice(0, 4)
    .map(activity => ({
      id: activity.id,
      project: activity.project,
      status: activity.status === 'success' ? 'success' : 
              activity.status === 'in-progress' ? 'running' : 'failed',
      time: activity.time,
      branch: projects.find(p => p.name === activity.project)?.branch || 'main',
      commit: activity.details.includes('commit') ? 
              activity.details.split('commit ')[1]?.substring(0, 7) || 'unknown' : 'unknown'
    }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success": return "text-success bg-success/10 border-success/20";
      case "running": return "text-warning bg-warning/10 border-warning/20";
      case "failed": return "text-destructive bg-destructive/10 border-destructive/20";
      default: return "text-muted-foreground bg-muted border-border";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success": return CheckCircle;
      case "running": return Clock;
      case "failed": return AlertTriangle;
      default: return Activity;
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm md:text-base text-muted-foreground">Welcome back! Here's your DevOps overview.</p>
        </div>
        <Badge variant="outline" className="bg-gradient-primary text-primary-foreground border-0 self-start sm:self-auto">
          <Zap className="w-4 h-4 mr-1" />
          <span className="hidden sm:inline">All Systems </span>Operational
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-gradient-card border-border/50 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-xl sm:text-2xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <p className={`text-xs flex items-center ${
                  stat.trend === 'up' ? 'text-success' : 'text-primary'
                }`}>
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
        {/* Deployment Activity Chart */}
        <Card className="xl:col-span-2 overflow-hidden">
          <CardHeader>
            <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="flex items-center text-sm sm:text-base">
                <Activity className="w-4 sm:w-5 h-4 sm:h-5 mr-2 text-primary" />
                Deployment Activity
              </span>
              <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm">
                <div className="flex items-center">
                  <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-primary mr-1 sm:mr-2" />
                  Total ({totalDeployments})
                </div>
                <div className="flex items-center">
                  <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-success mr-1 sm:mr-2" />
                  Success ({successfulDeployments})
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="w-full overflow-hidden">
              <ChartContainer
                config={{
                  total: {
                    label: "Total",
                    color: "hsl(var(--primary))",
                  },
                  success: {
                    label: "Success", 
                    color: "hsl(var(--success))",
                  }
                }}
                className="h-[200px] sm:h-[250px] lg:h-[300px] w-full"
              >
                <AreaChart data={deploymentData}>
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area 
                    type="monotone" 
                    dataKey="total" 
                    stroke="hsl(var(--primary))" 
                    fillOpacity={1} 
                    fill="url(#colorTotal)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="success" 
                    stroke="hsl(var(--success))" 
                    fillOpacity={1} 
                    fill="url(#colorSuccess)" 
                  />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                </AreaChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Service Health Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-sm sm:text-base">
              <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 mr-2 text-success" />
              Service Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[160px] sm:h-[180px] lg:h-[200px] flex items-center justify-center [&_*]:outline-none [&_*]:focus:outline-none">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={serviceHealthData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {serviceHealthData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 sm:mt-4 space-y-2">
              {serviceHealthData.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center">
                    <div 
                      className="w-2 sm:w-3 h-2 sm:h-3 rounded-full mr-1 sm:mr-2" 
                      style={{ backgroundColor: item.color }}
                    />
                    {item.name}
                  </div>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Infrastructure Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
        {infrastructureStats.map((infra, index) => {
          const Icon = infra.icon;
          return (
            <Card key={index} className="bg-gradient-card border-border/50">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                  <div className={`p-1.5 sm:p-2 rounded-lg ${infra.bgColor}`}>
                    <Icon className={`w-4 sm:w-5 h-4 sm:h-5 ${infra.color}`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-sm sm:text-base text-foreground truncate">{infra.name}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">{infra.subtitle}</p>
                  </div>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  {infra.metrics.map((metric, idx) => (
                    <div key={idx} className="flex justify-between text-xs sm:text-sm">
                      <span className="text-muted-foreground">{metric.label}</span>
                      <span className={`font-medium ${
                        metric.status === 'success' ? 'text-success' : 'text-foreground'
                      }`}>
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
        {/* Recent Deployments */}
        <Card>
          <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <CardTitle className="flex items-center text-sm sm:text-base">
              <Server className="w-4 sm:w-5 h-4 sm:h-5 mr-2 text-primary" />
              Recent Deployments
            </CardTitle>
            <Badge variant="outline" className="text-primary self-start sm:self-auto">View All</Badge>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            {recentDeployments.map((deployment) => {
              const StatusIcon = getStatusIcon(deployment.status);
              return (
                <div key={deployment.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-lg border border-border bg-accent/30 gap-3 sm:gap-0">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <StatusIcon className={`w-4 sm:w-5 h-4 sm:h-5 ${getStatusColor(deployment.status).split(' ')[0]} flex-shrink-0`} />
                    <div className="min-w-0">
                      <p className="font-medium text-sm sm:text-base text-foreground truncate">{deployment.project}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {deployment.branch} • {deployment.commit}
                      </p>
                    </div>
                  </div>
                  <div className="flex sm:flex-col items-start sm:items-end sm:text-right gap-2 sm:gap-0">
                    <Badge className={`${getStatusColor(deployment.status)} text-xs`}>
                      {deployment.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground">
                      {deployment.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-sm sm:text-base">
              <Activity className="w-4 sm:w-5 h-4 sm:h-5 mr-2 text-success" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-lg bg-success/10 border border-success/20">
                <span className="font-medium text-sm sm:text-base text-foreground">API Gateway</span>
                <Badge className="bg-success text-success-foreground text-xs">OK</Badge>
              </div>
              <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-lg bg-success/10 border border-success/20">
                <span className="font-medium text-sm sm:text-base text-foreground">Database</span>
                <Badge className="bg-success text-success-foreground text-xs">OK</Badge>
              </div>
              <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-lg bg-success/10 border border-success/20">
                <span className="font-medium text-sm sm:text-base text-foreground">Load Balancer</span>
                <Badge className="bg-success text-success-foreground text-xs">OK</Badge>
              </div>
            </div>
            
            <div className="pt-3 sm:pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-medium">Overall Uptime</span>
                <Badge className="bg-success/10 text-success border-success/20 text-xs">
                  99.97%
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Last incident: 12 days ago
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;