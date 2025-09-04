import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Save, RotateCcw } from "lucide-react";
import { Project } from "@/contexts/AppDataContext";
import { useToast } from "@/hooks/use-toast";

interface ProjectConfigDialogProps {
  project: Project;
  children: React.ReactNode;
}

const ProjectConfigDialog = ({ project, children }: ProjectConfigDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const [autoScale, setAutoScale] = useState(true);
  const [minInstances, setMinInstances] = useState([1]);
  const [maxInstances, setMaxInstances] = useState([10]);
  const [desiredInstances, setDesiredInstances] = useState([2]);
  const [cpuTarget, setCpuTarget] = useState([70]);
  const [memoryTarget, setMemoryTarget] = useState([80]);

  const handleSave = () => {
    // Handle save logic here
    console.log("Saving configuration:", {
      projectId: project.id,
      autoScale,
      minInstances: minInstances[0],
      maxInstances: maxInstances[0],
      desiredInstances: desiredInstances[0],
      cpuTarget: cpuTarget[0],
      memoryTarget: memoryTarget[0]
    });
    
    toast({
      title: "Configuration Saved",
      description: `Settings for ${project.name} have been updated successfully.`,
    });
    
    setIsOpen(false);
  };

  const handleReset = () => {
    setAutoScale(true);
    setMinInstances([1]);
    setMaxInstances([10]);
    setDesiredInstances([2]);
    setCpuTarget([70]);
    setMemoryTarget([80]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-auto z-50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Configure {project.name}
          </DialogTitle>
          <DialogDescription>
            Manage scaling and auto-scaling settings for your project deployment.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Auto-scaling Toggle */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Auto-scaling</CardTitle>
              <CardDescription>
                Enable automatic scaling based on resource usage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-scale" className="text-sm font-medium">
                  Enable Auto-scaling
                </Label>
                <Switch
                  id="auto-scale"
                  checked={autoScale}
                  onCheckedChange={setAutoScale}
                />
              </div>
            </CardContent>
          </Card>

          {/* Scaling Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Scaling Configuration</CardTitle>
              <CardDescription>
                Set minimum, maximum, and desired instance counts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Manual Desired Instances */}
              {!autoScale && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Desired Instances: {desiredInstances[0]}
                  </Label>
                  <Slider
                    value={desiredInstances}
                    onValueChange={setDesiredInstances}
                    max={20}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1</span>
                    <span>20</span>
                  </div>
                </div>
              )}

              {/* Min Instances */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Minimum Instances: {minInstances[0]}
                </Label>
                <Slider
                  value={minInstances}
                  onValueChange={setMinInstances}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1</span>
                  <span>10</span>
                </div>
              </div>

              {/* Max Instances */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Maximum Instances: {maxInstances[0]}
                </Label>
                <Slider
                  value={maxInstances}
                  onValueChange={setMaxInstances}
                  max={50}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1</span>
                  <span>50</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Auto-scaling Triggers */}
          {autoScale && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Auto-scaling Triggers</CardTitle>
                <CardDescription>
                  Configure thresholds for automatic scaling
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* CPU Target */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    CPU Target Utilization: {cpuTarget[0]}%
                  </Label>
                  <Slider
                    value={cpuTarget}
                    onValueChange={setCpuTarget}
                    max={100}
                    min={10}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>10%</span>
                    <span>100%</span>
                  </div>
                </div>

                {/* Memory Target */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Memory Target Utilization: {memoryTarget[0]}%
                  </Label>
                  <Slider
                    value={memoryTarget}
                    onValueChange={setMemoryTarget}
                    max={100}
                    min={10}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>10%</span>
                    <span>100%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset to Defaults
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save Configuration
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectConfigDialog;