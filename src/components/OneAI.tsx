import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppData } from "@/contexts/AppDataContext";
import { 
  Bot, 
  Send, 
  Sparkles,
  Play,
  Activity,
  Package,
  TrendingUp
} from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  actions?: Array<{
    label: string;
    type: 'deploy' | 'build' | 'rollback' | 'scale';
  }>;
}

const OneAI = () => {
  const { projects, addActivity } = useAppData();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "👋 Hi! I'm your AI DevOps assistant. I can help you deploy, monitor, and manage your applications.\n\nTry asking me:\n• \"Deploy Frontend App\"\n• \"Show build status\"\n• \"Check system health\"\n• \"Scale my services\"",
      timestamp: new Date(),
    }
  ]);
  
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const simulateAction = (action: string) => {
    if (action.includes('deploy') || action.includes('build')) {
      addActivity({
        type: 'deployment',
        status: 'success',
        title: 'AI-triggered deployment completed',
        project: projects[0]?.name || 'Project',
        time: 'Just now',
        details: 'Successfully deployed via OneAI assistant',
        icon: 'Rocket'
      });
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isProcessing) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsProcessing(true);

    // Simulate realistic AI processing
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: getAIResponse(currentInput),
        timestamp: new Date(),
        actions: getActionSuggestions(currentInput)
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsProcessing(false);
      
      // Trigger simulations based on user input
      simulateAction(currentInput);
    }, 1500);
  };

  const getAIResponse = (userInput: string): string => {
    const lowInput = userInput.toLowerCase();
    const projectName = projects[0]?.name || 'Frontend App';
    
    if (lowInput.includes('deploy') || lowInput.includes('deployment')) {
      return `🚀 **Deploying ${projectName}**\n\nI'm initiating deployment to your Kubernetes cluster:\n\n✅ Validating build artifacts\n✅ Checking cluster health\n🔄 Rolling out new version\n⏳ Updating load balancer\n\nDeployment is in progress. I'll monitor the process and update you on completion!`;
    }
    
    if (lowInput.includes('build') || lowInput.includes('docker')) {
      return `🐳 **Build Status**\n\n${projectName}:\n• ✅ Build #127 completed successfully\n• 🔍 All 23 tests passed\n• 📦 Docker image pushed to registry\n• ⚡ Build time: 3m 42s\n\nReady to deploy! Would you like me to start deployment?`;
    }
    
    if (lowInput.includes('health') || lowInput.includes('status') || lowInput.includes('monitor')) {
      return `📊 **System Health Check**\n\n🟢 **All Systems Operational**\n\n**Active Services:** 3 running\n**CPU Usage:** 42% average\n**Memory:** 1.8GB / 4GB used\n**Response Time:** 120ms avg\n**Uptime:** 99.98% this month\n\n**Recent Activity:**\n• ✅ ${projectName} - Healthy\n• ✅ API Service - Responding\n• ⚠️  Worker Service - High CPU (investigating)`;
    }
    
    if (lowInput.includes('scale') || lowInput.includes('scaling')) {
      return `⚡ **Auto-Scaling Available**\n\nCurrent configuration:\n• Min replicas: 2\n• Max replicas: 10\n• CPU trigger: 70%\n• Memory trigger: 80%\n\nI can help you:\n• Scale specific services\n• Adjust scaling policies\n• Monitor scaling events\n\nWhich service would you like to scale?`;
    }
    
    if (lowInput.includes('error') || lowInput.includes('failed') || lowInput.includes('issue')) {
      return `🔧 **Issue Investigation**\n\nI found these recent issues:\n\n❌ **Worker Service** - Pod restart loop\n⚠️  **High latency** - API response times elevated\n\n**Suggested Actions:**\n• Check container logs\n• Review resource limits\n• Validate health checks\n\nI can automatically attempt fixes or provide detailed diagnostics. What would you prefer?`;
    }
    
    if (lowInput.includes('cost') || lowInput.includes('usage') || lowInput.includes('billing')) {
      return `💰 **Resource Usage & Costs**\n\n**This Month:**\n• Compute: $284.50\n• Storage: $45.20\n• Network: $12.80\n• Total: $342.50\n\n**Optimization Suggestions:**\n• 💡 Scale down dev environments: Save ~$50/month\n• 💡 Use spot instances: Save ~$85/month\n• 💡 Enable auto-shutdown: Save ~$30/month\n\nWould you like me to implement these optimizations?`;
    }

    return `I can help you manage your DevOps pipeline! Try asking me:\n\n🚀 "Deploy my app"\n📊 "Check system health"\n🐳 "Show build status"\n⚡ "Scale my services"\n💰 "Show costs and usage"\n🔧 "Fix issues"`;
  };

  const getActionSuggestions = (userInput: string): Array<{label: string, type: 'deploy' | 'build' | 'rollback' | 'scale'}> => {
    const lowInput = userInput.toLowerCase();
    
    if (lowInput.includes('deploy')) {
      return [
        { label: '🚀 Deploy Now', type: 'deploy' },
        { label: '↩️ Rollback', type: 'rollback' }
      ];
    }
    
    if (lowInput.includes('build')) {
      return [
        { label: '🔨 Trigger Build', type: 'build' },
        { label: '🚀 Deploy Build', type: 'deploy' }
      ];
    }
    
    if (lowInput.includes('scale')) {
      return [
        { label: '📈 Scale Up', type: 'scale' },
        { label: '📉 Scale Down', type: 'scale' }
      ];
    }
    
    return [];
  };

  const quickActions = [
    { 
      label: 'Deploy Latest Build', 
      icon: Play, 
      variant: 'default' as const, 
      action: () => simulateAction('deploy'),
      description: 'Deploy the latest successful build'
    },
    { 
      label: 'Check System Health', 
      icon: Activity, 
      variant: 'outline' as const, 
      action: () => handleQuickMessage('Check system health'),
      description: 'Get real-time system status'
    },
    { 
      label: 'View Build Logs', 
      icon: Package, 
      variant: 'outline' as const, 
      action: () => handleQuickMessage('Show latest build logs'),
      description: 'Check recent build activity'
    },
    { 
      label: 'Scale Services', 
      icon: TrendingUp, 
      variant: 'outline' as const, 
      action: () => handleQuickMessage('Help me scale my services'),
      description: 'Adjust service capacity'
    }
  ];

  const handleQuickMessage = (message: string) => {
    setInput(message);
    setTimeout(() => handleSendMessage(), 100);
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header - Fixed */}
      <div className="flex-shrink-0 flex flex-col lg:flex-row lg:items-center justify-between p-4 border-b border-border bg-background gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl lg:text-2xl font-bold">OneAI Assistant</h1>
            <p className="text-sm text-muted-foreground">Your AI-powered DevOps companion</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Button
                  key={index}
                  variant={action.variant}
                  size="sm"
                  className="text-xs h-8 flex-1 sm:flex-none min-w-0"
                  onClick={action.action}
                  title={action.description}
                >
                  <Icon className="w-3 h-3 mr-1 sm:mr-2 flex-shrink-0" />
                  <span className="truncate">{action.label}</span>
                </Button>
              );
            })}
          </div>
          <Badge variant="secondary" className="px-3 py-1 flex-shrink-0">
            <Sparkles className="w-3 h-3 mr-1" />
            Online
          </Badge>
        </div>
      </div>

      {/* Chat Interface - Scrollable */}
      <div className="flex-1 flex flex-col min-h-0 p-4">
        <Card className="flex-1 flex flex-col overflow-hidden">
          {/* Chat Messages - This is the only scrollable area */}
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-2 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.type === 'ai' && (
                      <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-3 h-3 text-primary-foreground" />
                      </div>
                    )}
                    
                    <div className={`max-w-full sm:max-w-[75%] ${message.type === 'user' ? 'order-2' : ''}`}>
                      <div
                        className={`px-3 py-2 rounded-lg text-sm ${
                          message.type === 'user'
                            ? 'bg-primary text-primary-foreground ml-auto'
                            : 'bg-muted'
                        }`}
                      >
                        <p className="whitespace-pre-line">{message.content}</p>
                      </div>
                      
                      {message.actions && message.actions.length > 0 && (
                        <div className="flex gap-1 mt-2">
                          {message.actions.map((action, index) => (
                            <Button 
                              key={index} 
                              variant="outline" 
                              size="sm" 
                              className="text-xs h-7"
                              onClick={() => simulateAction(action.type)}
                            >
                              {action.label}
                            </Button>
                          ))}
                        </div>
                      )}
                      
                      <p className="text-xs text-muted-foreground mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>

                    {message.type === 'user' && (
                      <div className="w-7 h-7 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 order-3">
                        <span className="text-xs font-medium">U</span>
                      </div>
                    )}
                  </div>
                ))}
                
                {isProcessing && (
                  <div className="flex gap-2 justify-start">
                    <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center">
                      <Bot className="w-3 h-3 text-primary-foreground" />
                    </div>
                    <div className="bg-muted px-3 py-2 rounded-lg">
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 bg-current rounded-full animate-pulse" />
                        <div className="w-1.5 h-1.5 bg-current rounded-full animate-pulse delay-100" />
                        <div className="w-1.5 h-1.5 bg-current rounded-full animate-pulse delay-200" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Input Area - Fixed at bottom */}
          <div className="flex-shrink-0 border-t p-3">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about your DevOps workflow..."
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!input.trim() || isProcessing}
                size="sm"
                className="px-4"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OneAI;