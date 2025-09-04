import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useAppData } from "@/contexts/AppDataContext";
import { 
  GitBranch, 
  Server, 
  Plus, 
  Container,
  Cloud,
  RefreshCw,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

const Deployments = () => {
  const { toast } = useToast();
  const { addProject, addActivity } = useAppData();
  const [gitProvider, setGitProvider] = useState("github");
  const [repoUrl, setRepoUrl] = useState("");
  const [deploymentTarget, setDeploymentTarget] = useState("ecs");
  const [useExistingEC2, setUseExistingEC2] = useState(false);
  
  // Pipeline creation simulation state
  const [pipelineSimulation, setPipelineSimulation] = useState<{
    status: 'idle' | 'running' | 'success' | 'failed';
    progress: number;
    step: string;
  }>({ status: 'idle', progress: 0, step: '' });

  const simulatePipelineCreation = async () => {
    const steps = [
      { step: "Validating repository access...", duration: 1000 },
      { step: "Setting up CI/CD pipeline...", duration: 1500 },
      { step: "Configuring build environment...", duration: 2000 },
      { step: "Creating deployment infrastructure...", duration: 2500 },
      { step: "Setting up monitoring and logging...", duration: 1500 },
      { step: "Running initial pipeline test...", duration: 2000 },
      { step: "Pipeline creation complete!", duration: 500 }
    ];

    setPipelineSimulation({ status: 'running', progress: 0, step: 'Starting pipeline creation...' });

    // Add initial activity log
    addActivity({
      type: "deployment",
      status: "in-progress",
      title: "Pipeline creation started",
      project: "New Project",
      time: "Just now",
      details: "Starting deployment pipeline creation process...",
      icon: "Rocket"
    });

    let totalProgress = 0;
    const progressIncrement = 100 / steps.length;

    try {
      for (let i = 0; i < steps.length; i++) {
        const currentStep = steps[i];
        
        setPipelineSimulation({ 
          status: 'running', 
          progress: Math.round(totalProgress), 
          step: currentStep.step 
        });

        await new Promise(resolve => setTimeout(resolve, currentStep.duration));
        totalProgress += progressIncrement;
      }

      setPipelineSimulation({ status: 'success', progress: 100, step: 'Pipeline created successfully!' });

      // Add the new project to the projects list
      const projectName = repoUrl ? repoUrl.split('/').pop()?.replace('.git', '') || 'New Project' : 'New Project';
      addProject({
        name: projectName,
        repo: repoUrl || "github.com/user/new-project",
        target: deploymentTarget.toUpperCase(),
        status: "active",
        lastDeploy: "Just now",
        branch: "main",
        previewUrl: `https://${projectName.toLowerCase().replace(/[^a-z0-9]/g, '-')}.oneops.dev`,
        domain: null
      });

      // Add success activity log
      addActivity({
        type: "deployment",
        status: "success",
        title: "Pipeline created successfully",
        project: projectName,
        time: "Just now",
        details: `Deployment pipeline created for ${deploymentTarget.toUpperCase()} target`,
        icon: "Rocket"
      });

      toast({
        title: "Pipeline Creation Complete",
        description: "Your deployment pipeline has been successfully created and configured.",
      });

      // Reset form
      setRepoUrl("");

    } catch (error) {
      setPipelineSimulation({ status: 'failed', progress: 0, step: 'Pipeline creation failed!' });

      // Add failure activity log
      addActivity({
        type: "deployment",
        status: "failed",
        title: "Pipeline creation failed",
        project: "New Project",
        time: "Just now",
        details: "An error occurred during pipeline creation process",
        icon: "AlertTriangle"
      });

      toast({
        title: "Pipeline Creation Failed",
        description: "There was an error creating your deployment pipeline.",
        variant: "destructive",
      });
    }
  };

  const getSimulationStatusIcon = (status: 'idle' | 'running' | 'success' | 'failed') => {
    switch (status) {
      case 'running': return <RefreshCw className="w-4 h-4 animate-spin" />;
      case 'success': return <CheckCircle className="w-4 h-4 text-success" />;
      case 'failed': return <AlertTriangle className="w-4 h-4 text-destructive" />;
      default: return <Plus className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Deployments</h1>
          <p className="text-muted-foreground">Manage your application deployments and CI/CD pipelines</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Deployment
        </Button>
      </div>

      {/* New Deployment Configuration */}
      <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-primary" />
              Create New Deployment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Git Repository Configuration */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-muted-foreground" />
                <Label className="text-base font-medium">Git Repository</Label>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="git-provider">Provider</Label>
                  <Select value={gitProvider} onValueChange={setGitProvider}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="github">GitHub</SelectItem>
                      <SelectItem value="gitlab">GitLab</SelectItem>
                      <SelectItem value="bitbucket">Bitbucket</SelectItem>
                      <SelectItem value="azure">Azure DevOps</SelectItem>
                      <SelectItem value="other">Other Git</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="md:col-span-2">
                  <Label htmlFor="repo-url">Repository URL</Label>
                  <Input
                    id="repo-url"
                    placeholder="https://github.com/username/repository"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Deployment Configuration */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-muted-foreground" />
                <Label className="text-base font-medium">Deployment Target</Label>
              </div>

              <Tabs value={deploymentTarget} onValueChange={setDeploymentTarget}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="ecs" className="flex items-center gap-2">
                    <Container className="w-4 h-4" />
                    ECS (Default)
                  </TabsTrigger>
                  <TabsTrigger value="ec2" className="flex items-center gap-2">
                    <Cloud className="w-4 h-4" />
                    EC2
                  </TabsTrigger>
                </TabsList>

                {/* ECS Configuration */}
                <TabsContent value="ecs" className="space-y-4 mt-4">
                  <Card className="bg-accent/20">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">ECS Configuration</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="cluster-name">Cluster Name</Label>
                          <Input id="cluster-name" placeholder="my-ecs-cluster" />
                        </div>
                        <div>
                          <Label htmlFor="service-name">Service Name</Label>
                          <Input id="service-name" placeholder="my-service" />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="task-cpu">Task CPU</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="256" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="256">256 (.25 vCPU)</SelectItem>
                              <SelectItem value="512">512 (.5 vCPU)</SelectItem>
                              <SelectItem value="1024">1024 (1 vCPU)</SelectItem>
                              <SelectItem value="2048">2048 (2 vCPU)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label htmlFor="task-memory">Task Memory</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="512" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="512">512 MB</SelectItem>
                              <SelectItem value="1024">1024 MB</SelectItem>
                              <SelectItem value="2048">2048 MB</SelectItem>
                              <SelectItem value="4096">4096 MB</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label htmlFor="desired-count">Desired Count</Label>
                          <Input id="desired-count" type="number" placeholder="2" min="1" />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="container-port">Container Port</Label>
                        <Input id="container-port" type="number" placeholder="3000" />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* EC2 Configuration */}
                <TabsContent value="ec2" className="space-y-4 mt-4">
                  <Card className="bg-accent/20">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">EC2 Configuration</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id="use-existing"
                          checked={useExistingEC2}
                          onCheckedChange={setUseExistingEC2}
                        />
                        <Label htmlFor="use-existing">Deploy to existing EC2 instance</Label>
                      </div>

                      {useExistingEC2 ? (
                        <div>
                          <Label htmlFor="instance-id">EC2 Instance ID</Label>
                          <Input id="instance-id" placeholder="i-1234567890abcdef0" />
                        </div>
                      ) : (
                        <>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="instance-type">Instance Type</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="t3.micro" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="t3.micro">t3.micro</SelectItem>
                                  <SelectItem value="t3.small">t3.small</SelectItem>
                                  <SelectItem value="t3.medium">t3.medium</SelectItem>
                                  <SelectItem value="t3.large">t3.large</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div>
                              <Label htmlFor="key-pair">Key Pair</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select key pair" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="my-key">my-key</SelectItem>
                                  <SelectItem value="dev-key">dev-key</SelectItem>
                                  <SelectItem value="prod-key">prod-key</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          
                          <div>
                            <Label htmlFor="security-group">Security Group</Label>
                            <Input id="security-group" placeholder="sg-1234567890abcdef0" />
                          </div>
                        </>
                      )}
                      
                      <div>
                        <Label htmlFor="deployment-script">Deployment Script Path</Label>
                        <Input id="deployment-script" placeholder="/home/ec2-user/deploy.sh" />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

          {/* Deploy Button */}
          <div className="space-y-4 pt-4">
            <div className="flex justify-end">
              <Button 
                className="w-full md:w-auto flex items-center gap-2"
                onClick={simulatePipelineCreation}
                disabled={pipelineSimulation.status === 'running'}
                variant={pipelineSimulation.status === 'running' ? "secondary" : "default"}
              >
                {getSimulationStatusIcon(pipelineSimulation.status)}
                {pipelineSimulation.status === 'running' ? 'Creating Pipeline...' : 'Create Deployment Pipeline'}
              </Button>
            </div>

            {/* Pipeline Creation Progress */}
            {pipelineSimulation.status !== 'idle' && (
              <div className="space-y-2 p-4 bg-accent/20 rounded-lg border-l-4 border-l-primary">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Pipeline Creation Progress</span>
                  <span className="text-muted-foreground">{pipelineSimulation.progress}%</span>
                </div>
                <Progress value={pipelineSimulation.progress} className="h-2" />
                <p className="text-sm text-muted-foreground">{pipelineSimulation.step}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Deployments;
